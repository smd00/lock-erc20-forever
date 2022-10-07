const LockForever = artifacts.require("LockForever");
const Token = artifacts.require("Token");

const address = require('./address.json');

module.exports = async function(callback) {
    console.log(address)
    const lockForever = await LockForever.at(address.LockForever);
    const token = await Token.at(address.Token);
    
    var burntTokenBalance = await lockForever.balanceOf(address.Wallet);
    var tokenToLockBalance = await token.balanceOf(address.Wallet);

    console.log(
        `tokenToLockBalance: ${tokenToLockBalance}\n`,
        `burntTokenBalance: ${burntTokenBalance}\n`,
        )
    
    callback();
}
