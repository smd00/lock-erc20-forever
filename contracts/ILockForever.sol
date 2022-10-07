// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.16;

interface ILockForever {
    struct LockRecord {
        uint256 recordId;
        address lockerAddress;
        uint256 lockAmount;
        uint256 lockTime;
    }

    function lock(address account, uint256 amount) external returns (bool);

    function getWalletLockRecordsLength(address account)
        external
        view
        returns (uint256);

    function getWalletLockRecords(address account)
        external
        view
        returns (LockRecord[] memory);

    event TokensLocked(address token, address spender, uint256 amount);
}
