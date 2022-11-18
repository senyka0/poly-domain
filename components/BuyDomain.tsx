import React, { Dispatch, FC, SetStateAction } from "react";
import { ethers } from "ethers";
import contractAbi from "../artifacts/contracts/Domains.sol/Domains.json";

interface Props {
  domain: string;
  record: string;
  price: number;
}

const BuyDomain: FC<Props> = ({ domain, record, price }) => {
  const buy = async () => {
    if (domain.length < 3) {
      alert("Domain must be at least 3 characters long");
    }
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x2c4f2C46e6b6d9C757fE52a336eF9F831e377404", contractAbi.abi, signer);
        let tx = await contract.register(domain, { value: ethers.utils.parseEther(price.toString()) });
        const receipt = await tx.wait();
        if (receipt.status === 1 && record) {
          tx = await contract.setRecord(domain, record);
          await tx.wait();
        } else {
          alert("Transaction failed! Please try again");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button className="text-white inline-block rounded-full bg-gradient-to-r from-[#AD1DEB] to-[#6E72FC] p-[2px]" onClick={buy}>
        <span className="block rounded-full bg-slate-900 px-8 py-3 text-sm font-medium hover:bg-transparent">Buy Domain</span>
      </button>
    </div>
  );
};

export default BuyDomain;
