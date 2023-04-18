const { ethers } = require("hardhat")

const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const frontEndContractsFile = "../Markeplace-Crypto-Frontend/constants/contractAddresses.json"
const frontEndAbiFile = "../Markeplace-Crypto-Frontend/constants/abi.json"

const networkConfig = {
  31337: {
    name: "localhost",
  },
  // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
  5: {
    name: "goerli",
    linkUsdPriceFeed: "0x48731cF7e84dc94C5f84577882c14Be11a5B7456",
  },
}
module.exports = {
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
  frontEndContractsFile,
  frontEndAbiFile,
  networkConfig,
}
