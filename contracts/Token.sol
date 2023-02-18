// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

//Jul

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(uint256 initialSupply) ERC20("FTX", "FTT") {
        _mint(msg.sender, initialSupply);
    }

    function getName() public view returns (string memory) {
        return name();
    }
}
