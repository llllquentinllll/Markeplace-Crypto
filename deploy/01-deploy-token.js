const { network, ethers } = require("hardhat")
const { verify } = require("../utils/verify")
const {
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
  networkConfig,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  let contractName = "contracts/"
  const { deployer } = await getNamedAccounts()

  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS

  const chainId = network.config.chainId
  let linkUsdPriceFeedAddress

  if (chainId == 31337) {
    const linkUsdAggregator = await deployments.get("MockV3Aggregator")
    linkUsdPriceFeedAddress = linkUsdAggregator.address
  } else {
    linkUsdPriceFeedAddress = networkConfig[chainId]["linkUsdPriceFeed"]
  }

  if (linkUsdPriceFeedAddress != null) {
    log("----------------------------------------------------")

    const arguments = [linkUsdPriceFeedAddress]
    const Token = await deploy("Token", {
      from: deployer,
      args: arguments,
      log: true,
      waitConfirmations: waitBlockConfirmations,
    })
    console.log("Api Key: ", process.env.API_KEY_ETHERSCAN)

    if (!developmentChains.includes(network.name) && process.env.API_KEY_ETHERSCAN) {
      log("Verifying...")
      ;("contracts/Token.sol:Token")
      contractName += "Token.sol:Token"
      console.log("contractName: ", contractName)
      await verify(Token.address, arguments, contractName)
    }

    const networkName = network.name == "hardhat" ? "localhost" : network.name
    log(`Current Network: ${networkName}`)

    log("----------------------------------------------------")
  }
}
module.exports.tags = ["all", "token"]
