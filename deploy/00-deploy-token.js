const { network, ethers } = require("hardhat")
const { verify } = require("../utils/verify")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const NUMBER_TOKEN_MINT = "100000000000000000000000"
  const arguments = [NUMBER_TOKEN_MINT]
  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS

  log("----------------------------------------------------")

  const Token = await deploy("Token", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: waitBlockConfirmations,
  })

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log("Verifying...")
    await verify(Token.address, arguments)
  }

  const networkName = network.name == "hardhat" ? "localhost" : network.name
  log(`Current Network: ${networkName}`)

  log("----------------------------------------------------")
}
module.exports.tags = ["all", "raffle"]
