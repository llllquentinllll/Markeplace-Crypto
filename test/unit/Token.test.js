const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")

let deployer
let Token
let scamFee = ethers.utils.parseEther("0.001")
beforeEach(async () => {
  deployer = (await getNamedAccounts()).deployer
  await deployments.fixture(["all"])
  Token = await ethers.getContract("Token", deployer)
})

describe("scam", function () {
  it("reverts when you don't pay enough", async () => {
    await expect(Token.scam()).to.be.revertedWith("Raffle__SendMoreToBeScam")
  })
  it("emits event on enter", async () => {
    await expect(Token.scam({ value: scamFee })).to.emit(Token, "eventScam")
  })
})
