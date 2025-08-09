import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("TokenFactory", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployTokenFactory() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Token = await hre.ethers.getContractFactory("Token");
    const token = await Token.deploy();

    const TokenFactory = await hre.ethers.getContractFactory("TokenFactory");
    const tokenFactory = await TokenFactory.deploy(owner.address, await token.getAddress());

    return { tokenFactory, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the default admin", async function () {
      const { tokenFactory, owner } = await loadFixture(deployTokenFactory);

      const DEFAULT_ADMIN_ROLE = await tokenFactory.DEFAULT_ADMIN_ROLE();

      expect(await tokenFactory.hasRole(DEFAULT_ADMIN_ROLE, owner.address)).to.equal(true);
    });
  });

  describe("Create Token", function () {
    describe("Events", function () {
      it("Should emit an event on Token Creation", async function () {
        const { tokenFactory, owner } = await loadFixture(
          deployTokenFactory
        );

        await expect(tokenFactory.deployToken(owner.address, "TestToken", "TT", 0))
          .to.emit(tokenFactory, "TokenCreated")
          .withArgs(anyValue); // We accept any value as `when` arg
      });
    });

    describe("Minting", function () {
      it("Total supply should be 0 when deployed", async function () {
        const { tokenFactory, owner } = await loadFixture(
          deployTokenFactory
        );

        const maxSupply = '100000000000000000000';
        const tx = await tokenFactory.deployToken(owner.address, "TestToken", "TT", maxSupply);
        tx.wait();

        const token = await hre.ethers.getContractAt("Token", "0x9f1ac54BEF0DD2f6f3462EA0fa94fC62300d3a8e");
        expect(await token.maxSupply()).to.equal(maxSupply);
        expect(await token.totalSupply()).to.equal(0);
      });

      it("Can't mint more tokens than the total supply", async function () {
        const { tokenFactory, owner } = await loadFixture(
          deployTokenFactory
        );

        const maxSupply = '100000000000000000000';
        const tx = await tokenFactory.deployToken(owner.address, "TestToken", "TT", maxSupply);
        tx.wait();

        const token = await hre.ethers.getContractAt("Token", "0x9f1ac54BEF0DD2f6f3462EA0fa94fC62300d3a8e");
        await token.mint(owner.address, maxSupply);
        expect(await token.totalSupply()).to.equal(await token.maxSupply());
        await expect(
          token.mint(owner.address, 1)
        ).to.be.revertedWith("Max supply exceeded");
      });
    });
  });
});
