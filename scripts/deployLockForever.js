// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

require('dotenv').config();
const { TOKEN_TO_LOCK } = process.env;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying LockForever contract with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const tokenToLock = TOKEN_TO_LOCK; // npx hardhat run scripts/deployToken.js --network mumbai
  
  const name = "Burnt LEFT";
  const symbol = "burntLEFT";
  const decimals = 18

  const etherAmount = hre.ethers.utils.parseEther("0");
  const LockForever = await hre.ethers.getContractFactory("LockForever");
  const lockForever = await LockForever.deploy(tokenToLock, name, symbol, decimals, { value: etherAmount });

  await lockForever.deployed();

  console.log(
    `============\n`,
    `Address     ${lockForever.address}\n`,
    `Name        ${await lockForever.name()}\n`,
    `Symbol      ${await lockForever.symbol()}\n`,
    `Decimals    ${await lockForever.decimals()}\n`,
    `TotalSupply ${await lockForever.totalSupply()}\n`,
    // `TokenToLock ${await lockForever.tokenToLock()}\n`,
    `Owner       ${await lockForever.owner()}\n`,
    `============\n`,
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
