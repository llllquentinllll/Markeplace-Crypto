// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

error Raffle__SendMoreToBeScam();

contract Token is ERC20 {
    event eventScam(address indexed player);
    // Variables
    uint256 private immutable i_scamFee;

    constructor(uint256 initialSupply, uint256 scamFee) ERC20("FTX", "FTT") {
        _mint(msg.sender, initialSupply);
        i_scamFee = scamFee;
    }

    function scam() public payable {
        if (msg.value < i_scamFee) {
            revert Raffle__SendMoreToBeScam();
        }
        emit eventScam(msg.sender);
    }
}
