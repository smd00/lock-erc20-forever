const LockForever = artifacts.require("LockForever");
const ERC20 = artifacts.require("ERC20");

module.exports = async function (deployer) {

    // ===================== LockForever Contract parameters START
    // Staging
    const tokenToLock = "0x7236F4A0890ba9e99d1Ac15D0f04a6A356cB1B93";
    const name = "Burnt DMHT";
    const symbol = "burntDMHT";
    const decimals = 18

    // Prod
    // const tokenToLock = "0x72b9f88e822cf08b031c2206612b025a82fb303c";
    //   const name = "Burnt DBD";
    //   const symbol = "burntDBD";
    //   const decimals = 18
    // ===================== LockForever Contract parameters END

    // ===================== Token to lock START
    const TokenToLockDeployed = await ERC20.at(tokenToLock);

    console.log(
        `==========================\n`,
        `TokenToLockDeployed\n`,
        `Address     ${TokenToLockDeployed.address}\n`,
        `Name        ${await TokenToLockDeployed.name()}\n`,
        `Symbol      ${await TokenToLockDeployed.symbol()}\n`,
        `Decimals    ${await TokenToLockDeployed.decimals()}\n`,
        `TotalSupply ${await TokenToLockDeployed.totalSupply()}\n`,
        `==========================\n`,
    );
    // ===================== Token to lock END

    // ===================== Deploy LockForever Contract START
    console.log("Start deploying LockForever");
    await deployer.deploy(LockForever, TokenToLockDeployed.address, name, symbol, decimals);
    const LockForeverDeployed = await LockForever.deployed();

    // const LockForeverDeployed = await LockForever.at(
    //     "0xE8C4e7C5012858535Cc2A4ceC0A7042396FBD428"
    // );

    console.log(
        `==========================\n`,
        `LockForeverDeployed\n`,
        `Address     ${LockForeverDeployed.address}\n`,
        `Name        ${await LockForeverDeployed.name()}\n`,
        `Symbol      ${await LockForeverDeployed.symbol()}\n`,
        `Decimals    ${await LockForeverDeployed.decimals()}\n`,
        `TotalSupply ${await LockForeverDeployed.totalSupply()}\n`,
        `TokenToLock ${await LockForeverDeployed.getTokenToLock()}\n`,
        `Owner       ${await LockForeverDeployed.owner()}\n`,
        `==========================\n`,
    );
    // ===================== Deploy LockForever Contract END

};