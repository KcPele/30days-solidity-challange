import { expect } from "chai";
import { ethers } from "hardhat";
import { Crud } from "../typechain-types";

describe("Crud", function () {
  // We define a fixture to reuse the same setup in every test.

  let crud: Crud;
  before(async () => {
    const crudFactory = await ethers.getContractFactory("Crud");
    crud = (await crudFactory.deploy()) as Crud;
    await crud.deployed();
  });

  describe("Deployment", function () {
    it("it should create a new user", async function () {
      await crud.create("jemi");

      const result = await crud.read(1);

      expect(result[0]).to.equal(1);
      expect(result[1]).to.equal("jemi");
    });
    it("it should update a user", async function () {
      await crud.update(1, "jemi2");
      const result = await crud.read(1);
      expect(result[1]).to.equal("jemi2");
    });
    it("it should revert if user does not exist", async function () {
      await expect(crud.read(3)).to.be.revertedWithCustomError(crud, "USER_NOTFOUND");
    });
    it("it should destry a user", async () => {
      await crud.destroy(1);
      await expect(crud.read(1)).to.be.revertedWithCustomError(crud, "USER_NOTFOUND");
    });
  });
});
