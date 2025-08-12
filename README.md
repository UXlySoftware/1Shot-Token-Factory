# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

## Deployments:

```
npx hardhat vars set INFURA_API_KEY
npx hardhat vars set PRIVATE_KEY
npx hardhat vars set ETHERSCAN_API_KEY
npx hardhat ignition deploy ./ignition/modules/TestnetDeploy.ts --network <testnetwork> --parameters ./ignition/parameters.json
npx hardhat ignition verify chain-<chainId> --include-unrelated-contracts
```

### Sepolia

Token Implementation: [`0x879b0a3e1D9DeD7a0691c8f928D518640A2935c1`](https://sepolia.etherscan.io/address/0x879b0a3e1D9DeD7a0691c8f928D518640A2935c1)

Token Factory: [`0xA1BfEd6c6F1C3A516590edDAc7A8e359C2189A61`](https://sepolia.etherscan.io/address/0xA1BfEd6c6F1C3A516590edDAc7A8e359C2189A61)

## Fuji

Token Implementation: [`0xd5E1156353a64a661811E8d279E67020778a30a2`](https://testnet.snowtrace.io/address/0xd5E1156353a64a661811E8d279E67020778a30a2)

Token Factory: [`0x9aB94A0aE47e709E4f56Ce513a13d16e224240BD`](https://testnet.snowtrace.io/address/0x9aB94A0aE47e709E4f56Ce513a13d16e224240BD)

## Binance Smart Chain Testnet

Token Implementation: [`0x678586adA236937458D0e8cc9AbfCCfEA6918D8B`](https://testnet.bscscan.com/token/0x678586adA236937458D0e8cc9AbfCCfEA6918D8B)

Token Factory: [`0xD9699942281A00188707d3244c9Cb827DE0e4A3c`](https://testnet.bscscan.com/address/0xD9699942281A00188707d3244c9Cb827DE0e4A3c)

## Binance Smart Chain

Token Implementation: [`0xF4e2CE808268188dfFfdBe801a58D6e8a2B59176`](https://bscscan.com/address/0xF4e2CE808268188dfFfdBe801a58D6e8a2B59176)

Token Factory: [`0xF7995B5472A996c6E0d5840857C040A87e8C9fa8`](https://bscscan.com/address/0xF7995B5472A996c6E0d5840857C040A87e8C9fa8)