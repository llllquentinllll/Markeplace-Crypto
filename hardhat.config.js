/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Your etherscan API key"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x"
const RPC_URL_GOERLI =
  process.env.RPC_URL_GOERLI ||
  "https://eth-goerli.g.alchemy.com/v2/fexfrxFeta7A8RwJhewB0fXpPOvm6oMt"

module.exports = {
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    localhost: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    goerli: {
      url: RPC_URL_GOERLI,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
  },
  etherscan: {
    // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      rinkeby: ETHERSCAN_API_KEY,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.7",
      },
      {
        version: "0.4.24",
      },
    ],
  },
}
