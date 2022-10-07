const LockForever = artifacts.require("LockForever");

const address = require('./address.json');

module.exports = async function(callback) {
    console.log(address)
    const lockForever = await LockForever.at(address.LockForever);

    const amount = this.web3.utils.toWei('1000', "ether");

    var tx = await lockForever.lock(address.Wallet, amount);

    console.log(tx);
    
    callback();
}
