require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config();
const { MNEMONIC, ALCHEMY_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.16",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [MNEMONIC]
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [MNEMONIC]
    },
    polygon: {
      url: `https://rpc.ankr.com/polygon`,
      // url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [MNEMONIC]
    }
  }
};
