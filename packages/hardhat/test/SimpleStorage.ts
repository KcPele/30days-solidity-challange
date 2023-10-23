import { expect } from "chai";
import { ethers } from "hardhat";
import { SimpleStorage } from "../typechain-types";

describe("SimpleStorage", function () {
  // We define a fixture to reuse the same setup in every test.

  let simpleStorage: SimpleStorage;
  before(async () => {
    const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = (await simpleStorageFactory.deploy()) as SimpleStorage;
    await simpleStorage.deployed();
  });

  describe("Deployment", function () {
    it("Should show the data set", async function () {
      await simpleStorage.setData("Hello World");
      expect(await simpleStorage.getData()).to.equal("Hello World");
    });
  });
});
