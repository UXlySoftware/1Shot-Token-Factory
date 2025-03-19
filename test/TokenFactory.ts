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
  });
});
