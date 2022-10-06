const LockForever = artifacts.require("LockForever");
const ERC20 = artifacts.require("ERC20");

module.exports = async function (deployer) {

    // ===================== Token to lock START
    // const TokenToLockDeployed = await ERC20.deployed();
    const tokenToLock = "0x7236F4A0890ba9e99d1Ac15D0f04a6A356cB1B93";
    const TokenToLockDeployed = await ERC20.at(tokenToLock);
    // ===================== Token to lock END


    // ===================== Deploy LockForever Contract START
    const LockForeverDeployed = await LockForever.deployed();
    // ===================== Deploy LockForever Contract END

    // ===================== Approve LockForever to spend lockForeverDeployedOwner's TokenToLock START
    const lockForeverDeployedOwner = await LockForeverDeployed.owner();
    var currentAllowance = await TokenToLockDeployed.allowance(lockForeverDeployedOwner, LockForeverDeployed.address);
    console.log(`TokenToLockDeployed: Allowance ${currentAllowance}`);

    const amountToLock = web3.utils.toWei('1', "ether") //ethers.utils.parseEther("100");

    if (amountToLock > currentAllowance) {
        const tokenToLockTotalSupply = await TokenToLockDeployed.totalSupply();
        console.log(`TokenToLockDeployed: Total supply ${tokenToLockTotalSupply}`);
        const approved = await TokenToLockDeployed.approve(LockForeverDeployed.address, tokenToLockTotalSupply);
        currentAllowance = await TokenToLockDeployed.allowance(lockForeverDeployedOwner, LockForeverDeployed.address);
        console.log(`TokenToLockDeployed: Allowance ${currentAllowance}`);
    }    
    // ===================== Approve LockForever to spend TokenToLock END

    // ===================== Send TokenToLock to LockForever START
    var tokenToLockBalance = await TokenToLockDeployed.balanceOf(lockForeverDeployedOwner);
    var burntTokenBalance = await LockForeverDeployed.balanceOf(lockForeverDeployedOwner);
    console.log(
        `Before lock()\n`,
        `tokenToLockBalance: ${tokenToLockBalance}\n`,
        `burntTokenBalance: ${burntTokenBalance}\n`,
        )
    if (tokenToLockBalance > 0) {
        const lock = await LockForeverDeployed.lock(lockForeverDeployedOwner, amountToLock);
        tokenToLockBalance = await TokenToLockDeployed.balanceOf(lockForeverDeployedOwner);
        burntTokenBalance = await LockForeverDeployed.balanceOf(lockForeverDeployedOwner);
        console.log(
            `After lock()\n`,
            `tokenToLockBalance: ${tokenToLockBalance}\n`,
            `burntTokenBalance: ${burntTokenBalance}\n`,
        )
    }
    // ===================== Send TokenToLock to LockForever END
};