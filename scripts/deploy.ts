import { UnsignedTransaction } from "ethers";
import { Contract, ContractFactory } from "ethers";
import hre from "hardhat";

const main = async () => {
  const [owner] = await hre.ethers.getSigners();
  const domainContractFactory: ContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract: Contract = await domainContractFactory.deploy("poly");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
