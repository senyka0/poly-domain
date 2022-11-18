import { ethers } from "ethers";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import contractAbi from "../artifacts/contracts/Domains.sol/Domains.json";

interface Props {
  name: string;
  setEditing: Dispatch<SetStateAction<boolean>>;
}

const Editing: FC<Props> = ({ name, setEditing }) => {
  const [newRecord, setNewRecord] = useState<string>("");

  const updateDomain = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x2c4f2C46e6b6d9C757fE52a336eF9F831e377404", contractAbi.abi, signer);
        let tx = await contract.setRecord(name, newRecord);
        await tx.wait();
        setEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <label className="w-[260px] relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <input
          onChange={(e) => {
            setNewRecord(e.target.value);
          }}
          placeholder="Message"
          className="text-white peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        />

        <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">Message</span>
      </label>
      <button className="text-white inline-block rounded-full bg-gradient-to-r from-[#AD1DEB] to-[#6E72FC] p-[2px]" onClick={updateDomain}>
        <span className="block rounded-full bg-slate-900 px-8 py-3 text-sm font-medium hover:bg-transparent">Update Record</span>
      </button>
      <button
        className="text-white inline-block rounded-full bg-slate-500 p-[2px]"
        onClick={() => {
          setEditing(false);
        }}
      >
        <span className="block rounded-full bg-slate-900 px-8 py-3 text-sm font-medium hover:bg-transparent">Close</span>
      </button>
    </div>
  );
};

export default Editing;
