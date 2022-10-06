// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.16;

import "./utils/ERC20.sol";
// import "./utils/SafeMath.sol";
import "./utils/Ownable.sol";

contract Token is ERC20, Ownable {
    // using SafeMath for uint256;

    constructor(address ownerAddress_, string memory name_, string memory symbol_, uint8 decimals_, uint256 initialSupply_) ERC20(name_, symbol_, decimals_) {

        _mint(ownerAddress_, initialSupply_);
        transferOwnership(ownerAddress_);
    }
}
