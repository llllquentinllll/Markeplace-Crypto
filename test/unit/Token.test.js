const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")

let deployer
let Token

beforeEach(async () => {
  deployer = (await getNamedAccounts()).deployer
  await deployments.fixture(["all"])
  Token = await ethers.getContract("Token", deployer)
})

describe("fund", function () {
  it("Return the name of the token FTT", async () => {
    const name = await Token.getName()
    assert.equal(name, "FTX")
  })
})
