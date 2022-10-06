# Lock ERC20 Forever

## Deployment Instructions
- Deploy Token.sol contract
```shell
npx hardhat run scripts/deployToken.js --network mumbai
```
- Update deployLockForever.js token contract address
- Deploy LockForever.sol contract 
```shell
npx hardhat run scripts/deployLockForever.js --network mumbai
```
## Verify contract on Etherscan:
- Flatten files 
```shell
npx hardhat flatten
```
- Remove license from flat file `// SPDX-License-Identifier: UNLICENSED`

## Usage Instructions
- Paste flatten files to Remix
- Connect MetaMask
- Deploy & Run Transactions
- Select Contract: IERC20
- At Address: (0xTokenAddress)
- `approve(0xLockForeverAddress, 800000000000000000000000000)`
- Select Contract: LockForever
- `lockForever(1000000000000000000000000)`
- `currentLockBalance()`
- `lockBalance(0xOwnerWalletAddress)`
- `lockRecordIds(0xOwnerWalletAddress)`
- `lockRecordsMapping(1)`
