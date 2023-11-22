import { expect } from "chai";
import { ethers } from "hardhat";
import { EtherWallet } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("EtherWallet", function () {
  // We define a fixture to reuse the same setup in every test.

  let etherWallet: EtherWallet;
  let ownerAddress: SignerWithAddress;
  let secondAddress: SignerWithAddress;
  before(async () => {
    const [owner, second] = await ethers.getSigners();
    ownerAddress = owner;
    secondAddress = second;
    const etherWalletFactory = await ethers.getContractFactory("EtherWallet");
    etherWallet = (await etherWalletFactory.deploy(owner.address)) as EtherWallet;
    await etherWallet.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await etherWallet.owner()).to.equal(ownerAddress.address);
    });
  });
  describe("Deposit", function () {
    it("Should deposit ether to the contract", async function () {
      await etherWallet.deposit({ value: 100 });
      expect(await etherWallet.balanceOf()).to.equal(100);
    });
  });
  describe("Send", function () {
    it("Should send ether from the contract", async function () {
      await etherWallet.send(ownerAddress.address, 50);
      expect(await ethers.provider.getBalance(etherWallet.address)).to.equal(50);
    });
    it("should fails since sender is not the owner", async () => {
      expect(await etherWallet.send(secondAddress.address, 50)).to.reverted;
    });
  });
});
