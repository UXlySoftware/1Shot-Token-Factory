// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TokenModule = buildModule("TokenModule", (m) => {

  const token = m.contract("Token", [], {});

  return { token };
});

const FactoryModule = buildModule("FactoryModule", (m) => {
  const { token } = m.useModule(TokenModule);

  const defaultAdmin = m.getParameter("defaultAdmin");
  const factory = m.contract("TokenFactory", [defaultAdmin, token], {});

  return { factory };
});

export default FactoryModule;
