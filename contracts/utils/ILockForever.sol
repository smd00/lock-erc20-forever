// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.16;

interface ILockForever {
    function lock(address account, uint256 amount) external returns (bool);
    function getTokenToLock() external view returns (address);
    event TokensLocked(address token, address spender, uint256 amount);
}