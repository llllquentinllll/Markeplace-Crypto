const { network, ethers } = require("hardhat")
const { verify } = require("../utils/verify")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  let contractName = "contracts/"
  const { deployer } = await getNamedAccounts()
  const NUMBER_TOKEN_MINT = "100000000000000000000000"
  const SCAM_FEE = ethers.utils.parseEther("0.001") //"1000000000000000"
  const arguments = [NUMBER_TOKEN_MINT, SCAM_FEE]
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
module.exports.tags = ["all", "raffle"]
