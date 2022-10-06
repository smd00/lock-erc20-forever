# Lock ERC20 Forever (Truffle)

### How to deploy contracts?

```
truffle deploy --network mumbai --reset
```

### Testing (DEV)
```
truffle console --network mumbai
const [platform, acc1, acc2, acc3] = accounts
this.web3.eth.getBalance(platform)
this.web3.eth.getBalance(acc1)
this.web3.eth.getBalance(acc2)
this.web3.eth.getBalance(acc3)

var tokenToLock = await ERC20.at('0x7236F4A0890ba9e99d1Ac15D0f04a6A356cB1B93')
var lockForever = await LockForever.at('0xf703dB11b6943f3B786D6387Ab05AbaB7AE43Da4')
```