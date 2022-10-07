const LockForever = artifacts.require("LockForever");

const address = require('./address.json');

module.exports = async function(callback) {
    console.log(address)
    const lockForever = await LockForever.at(address.LockForever);
    var tx = await lockForever.getWalletLockRecordsLength(address.Wallet);
    console.log(tx);
    
    callback();
}
