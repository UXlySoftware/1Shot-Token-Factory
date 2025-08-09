import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


const INFURA_API_KEY = vars.has("INFURA_API_KEY") ? [vars.get("INFURA_API_KEY")] : [];
const PRIVATE_KEY = vars.has("PRIVATE_KEY") ? [vars.get("PRIVATE_KEY")] : ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"];
const ETHERSCAN_API_KEY = vars.has("ETHERSCAN_API_KEY") ? [vars.get("ETHERSCAN_API_KEY")] : [];
const BSCSCAN_API_KEY = vars.has("BSCSCAN_API_KEY") ? [vars.get("BSCSCAN_API_KEY")] : [];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      mining: {
        auto: true,
        interval: 5000
      }
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
    },
    fuji: {
      url: `https://avalanche-fuji.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
    },
    snowtrace: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      accounts: [`${PRIVATE_KEY}`],
    },
    bsc: {
      url: `https://bsc-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
    }
  },
  etherscan: {
    apiKey: {
      sepolia: `${ETHERSCAN_API_KEY}`,
      bsc: `${BSCSCAN_API_KEY}`,
      snowscan: `${ETHERSCAN_API_KEY}`
    },
    customChains: [
      {
        network: "snowscan",
        chainId: 43113,
        urls: {
          apiURL: "https://api.etherscan.io/api?chainid=43113",
          browserURL: "https://avalanche.testnet.localhost:8080"
        }
      }
    ]
  },
};

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log("Address: ", account.address, " Balance: ", await hre.ethers.provider.getBalance(account.address));
  }
});

task("latestblock", "Prints the latest block", async (taskArgs, hre) => {
  console.log(" Current Block: ", await hre.ethers.provider.getBlock("latest"));
});

task("feedata", "Prints the current fee data", async (taskArgs, hre) => {
  console.log("Fee Data: ", await hre.ethers.provider.getFeeData());
});

export default config;
