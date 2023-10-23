import { expect } from "chai";
import { ethers } from "hardhat";
import { AdvanceStorage } from "../typechain-types";

describe("AdvanceStorage", function () {
  // We define a fixture to reuse the same setup in every test.

  let advanceStorage: AdvanceStorage;
  before(async () => {
    const advanceStorageFactory = await ethers.getContractFactory("AdvanceStorage");
    advanceStorage = (await advanceStorageFactory.deploy()) as AdvanceStorage;
    await advanceStorage.deployed();
  });

  describe("Deployment", function () {
    it("Should show set an element in the array ", async function () {
      await advanceStorage.add(23);
      const result = await advanceStorage.get(0);
      expect(result).to.equal(23);
    });
    it("it should return the length of the array ", async function () {
      await advanceStorage.add(2);
      await advanceStorage.add(23);
      await advanceStorage.add(3);
      const result = await advanceStorage.length();
      expect(result).to.equal(4);
    });

    it("it should fail if we try to get an element that is not in the array ", async function () {
      await advanceStorage.add(2);
      await advanceStorage.add(23);
      await advanceStorage.add(3);
      await expect(advanceStorage.get(7)).to.be.revertedWithPanic("0x32");
    });
  });
});
