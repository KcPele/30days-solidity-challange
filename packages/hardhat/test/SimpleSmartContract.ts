import { ethers } from "hardhat";

describe("SimpleSmartContract", function () {
  // We define a fixture to reuse the same setup in every test.

  let simpleSmartContract: any;
  before(async () => {
    const simpleSmartContractFactory = await ethers.getContractFactory("SimpleSmartContract");
    simpleSmartContract = await simpleSmartContractFactory.deploy();

    await simpleSmartContract.deployed();
  });
  describe("Deployment", function () {
    it("Should have the right message on deploy", async function () {
      console.log("SimpleSmartContract deployed to:", simpleSmartContract.address);
    });
  });
});
