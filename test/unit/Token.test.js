const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")

let deployer
let Token
let scamFee = ethers.utils.parseEther("0.001")
let mockV3Aggregator

beforeEach(async () => {
  deployer = (await getNamedAccounts()).deployer
  await deployments.fixture(["all"])
  Token = await ethers.getContract("Token", deployer)
  mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
})

describe("receive link", function () {
  it("update the balance of link", async () => {
    const initialBalanceInLink = await Token.getBalanceInLink()
    await Token.receiveLinkTokens()
    const finalBalanceInLink = await Token.getBalanceInLink()
    console.log("initialBalanceInLink: " + initialBalanceInLink)
    console.log("finalBalanceInLink: " + finalBalanceInLink)
    assert.equal(finalBalanceInLink.toString(), initialBalanceInLink.toString())
  })
})
