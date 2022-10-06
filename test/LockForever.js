// This is an example test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage of Hardhat Network's snapshot functionality.
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

// `describe` is a Mocha function that allows you to organize your tests.
// Having your tests organized makes debugging them easier. All Mocha
// functions are available in the global scope.
//
// `describe` receives the name of a section of your test suite, and a
// callback. The callback must define the tests of that section. This callback
// can't be an async function.
describe("Token contract", function () {
  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshot in every test.
  async function deployTokenFixture() {
    // Get the ContractFactory and Signers here.
    const [owner, addr1, addr2] = await ethers.getSigners();

    // Token
    const tokenOwner = owner.address;
    const tokenName = "LEF Token";
    const tokenSymbol = "LEF";
    const tokenDecimals = 18
    const tokenInitialSupply = hre.ethers.utils.parseEther("800000000");
    
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy(tokenOwner, tokenName, tokenSymbol, tokenDecimals, tokenInitialSupply);
    await token.deployed();

    console.log(
      `============\n`,
      `Address     ${token.address}\n`,
      `Name        ${await token.name()}\n`,
      `Symbol      ${await token.symbol()}\n`,
      `Decimals    ${await token.decimals()}\n`,
      `TotalSupply ${await token.totalSupply()}\n`,
      `Owner       ${await token.owner()}\n`,
      `============\n`,
    );

    // LockForever
    const burntTokenName = "Burnt LEF";
    const burntTokenSymbol = "burntLEF";
    const burntTokenDecimals = 18

    const LockForever = await ethers.getContractFactory("LockForever");
    const lockForever = await LockForever.deploy(token.address, burntTokenName, burntTokenSymbol, burntTokenDecimals);
    await lockForever.deployed();

    console.log(
      `============\n`,
      `Address     ${lockForever.address}\n`,
      `Name        ${await lockForever.name()}\n`,
      `Symbol      ${await lockForever.symbol()}\n`,
      `Decimals    ${await lockForever.decimals()}\n`,
      `TotalSupply ${await lockForever.totalSupply()}\n`,
      `TokenToLock ${await lockForever.getTokenToLock()}\n`,
      `Owner       ${await lockForever.owner()}\n`,
      `============\n`,
    );

    // Fixtures can return anything you consider useful for your tests
    return { Token, token, LockForever, lockForever, owner, addr1, addr2 };
  }

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {

    it("Should set the right owner", async function () {
      const { token, lockForever, owner } = await loadFixture(deployTokenFixture);
      expect(await token.owner()).to.equal(owner.address);
      expect(await lockForever.owner()).to.equal(owner.address);
    });

    it("Should set the right token to lock forever", async function () {
      const { token, lockForever, owner } = await loadFixture(deployTokenFixture);
      expect(await lockForever.getTokenToLock()).to.equal(token.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const { token, lockForever, owner } = await loadFixture(deployTokenFixture);
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);

      const lockForeverOwnerBalance = await lockForever.balanceOf(owner.address);
      expect(await lockForever.totalSupply()).to.equal(lockForeverOwnerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should lock tokens in LockForever", async function () {
      const { token, lockForever, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );

      // Owner has 0 burnt tokens
      await expect(
        lockForever.transfer(addr1.address, 50)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      // Allowance is 0
      await expect(
        lockForever.lock(owner.address, 50)
        ).to.be.revertedWith("ERC20: insufficient allowance");

      // Approve spend
      await token.approve(lockForever.address, 50);

      // Lock 50 tokens
      await expect(
        lockForever.lock(owner.address, 50)
      ).to.changeTokenBalances(token, [owner, lockForever.address], [-50, 50]);

      // Owner to addr1
      await expect(
        lockForever.transfer(addr1.address, 50)
      ).to.changeTokenBalances(lockForever, [owner, addr1], [-50, 50]);

      // addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      await expect(
        lockForever.connect(addr1).transfer(addr2.address, 50)
      ).to.changeTokenBalances(lockForever, [addr1, addr2], [-50, 50]);

      // addr2 to addr1
      await expect(
        lockForever.connect(addr2).transfer(addr1.address, 50)
      ).to.changeTokenBalances(lockForever, [addr2, addr1], [-50, 50]);
    });

    it("Should transfer tokens between accounts", async function () {
      const { token, lockForever, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );

      // Transfer 50 tokens from owner to addr1
      await expect(
        token.transfer(addr1.address, 50)
      ).to.changeTokenBalances(token, [owner, addr1], [-50, 50]);

      // Transfer 50 tokens from addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      await expect(
        token.connect(addr1).transfer(addr2.address, 50)
      ).to.changeTokenBalances(token, [addr1, addr2], [-50, 50]);
    });

    it("Should emit Transfer events", async function () {
      const { token, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );

      // Transfer 50 tokens from owner to addr1
      await expect(token.transfer(addr1.address, 50))
        .to.emit(token, "Transfer")
        .withArgs(owner.address, addr1.address, 50);

      // Transfer 50 tokens from addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      await expect(token.connect(addr1).transfer(addr2.address, 50))
        .to.emit(token, "Transfer")
        .withArgs(addr1.address, addr2.address, 50);
    });

    it("Should emit TokensLocked events", async function () {
      const { token, lockForever, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );

      // Approve spend
      await token.approve(lockForever.address, 50);
      // await token.connect(addr1).approve(lockForever.address, 50);
      
      // Lock 50 tokens
      await expect(lockForever.lock(owner.address, 50))
      .to.emit(lockForever, "TokensLocked")
      .withArgs(token.address, owner.address, 50);
        
        // We use .connect(signer) to send a transaction from another account
      // await expect(lockForever.connect(addr1).lock(addr1.address, 50))
      // .to.emit(lockForever, "TokensLocked")
      // .withArgs(token, addr1.address, 50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const { token, owner, addr1 } = await loadFixture(
        deployTokenFixture
      );
      const initialOwnerBalance = await token.balanceOf(owner.address);

      // Try to send 1 token from addr1 (0 tokens) to owner (1000 tokens).
      // `require` will evaluate false and revert the transaction.
      await expect(
        token.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      // Owner balance shouldn't have changed.
      expect(await token.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
  });
});