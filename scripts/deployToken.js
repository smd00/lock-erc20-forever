const hre = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying Token contract with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const ownerAddress = deployer.address;
    const name = "Not Nulled";
    const symbol = "NULLED";
    const decimals = 18
    const initialSupply = hre.ethers.utils.parseEther("50000000");
    
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy(ownerAddress, name, symbol, decimals, initialSupply);
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
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });