const Token = artifacts.require("Token");

const address = require('./address.json');

module.exports = async function(callback) {
    console.log(address)
    const token = await Token.at(address.Token);

    const amount = this.web3.utils.toWei('1000', "ether");
    var tx = await token.approve(address.LockForever, amount);
    console.log(tx);
    
    callback();
}
