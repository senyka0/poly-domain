import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API || "",
      polygonMumbai: process.env.POLYSCAN_API || "",
    },
  },
  networks: {
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY || ""],
      allowUnlimitedContractSize: true,
    },
    mumbai: {
      url: process.env.POLYGON_URL,
      accounts: [process.env.PRIVATE_KEY || ""],
      allowUnlimitedContractSize: true,
    },
  },
};

export default config;
