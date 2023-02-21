const { ethers } = require("hardhat")

const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const frontEndContractsFile = "../Markeplace-Crypto-Frontend/constants/contractAddresses.json"
const frontEndAbiFile = "../Markeplace-Crypto-Frontend/constants/abi.json"

module.exports = {
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
  frontEndContractsFile,
  frontEndAbiFile,
}
