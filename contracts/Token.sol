// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

error Raffle__SendMoreToBeScam();

contract Token {
    event receiveLink(address indexed player);

    // Variables
    uint256 private constant PRICE_LINK_FEE = 5e15; // = 0.005

    uint256 private s_balanceInLink = 1;
    uint256 private s_balanceInUsd = 0;
    AggregatorV3Interface private s_linkPriceFeedAddress;

    // Adresse du contrat LINK
    address public linkTokenAddress = 0x326C977E6efc84E512bB9C30f76E30c160eD06FB;

    constructor(address linkPriceFeedAddress) {
        s_linkPriceFeedAddress = AggregatorV3Interface(linkPriceFeedAddress);
    }

    function receiveLinkTokens() public {
        // Vérifier que le contrat LINK est approuvé pour transférer des tokens
        require(
            IERC20(linkTokenAddress).allowance(msg.sender, address(this)) >= PRICE_LINK_FEE,
            "Tokens must be approved before calling this function"
        );

        // Transférer les tokens LINK du portefeuille de l'appelant au contrat de la fonction
        require(
            IERC20(linkTokenAddress).transferFrom(msg.sender, address(this), PRICE_LINK_FEE),
            "Token transfer failed"
        );

        // Convertir le prix LINK/USD en utilisant l'oracle de prix
        uint256 price = getPrice(AggregatorV3Interface(s_linkPriceFeedAddress));

        s_balanceInLink = s_balanceInLink + PRICE_LINK_FEE;
        s_balanceInUsd = s_balanceInUsd + (price * PRICE_LINK_FEE);

        emit receiveLink(msg.sender);
    }

    // Fonction utilitaire pour convertir le prix LINK/USD
    function getPrice(AggregatorV3Interface priceFeed) internal view returns (uint256) {
        (, int256 answer, , , ) = priceFeed.latestRoundData();

        // Convertir le prix en 18 décimales pour que ce soit lisible par ether
        return uint256(answer) * 10 ** 10;
    }

    function getBalanceInLink() public view returns (uint256) {
        return s_balanceInLink;
    }

    function getBalanceInUsd() public view returns (uint256) {
        return s_balanceInUsd;
    }
}
