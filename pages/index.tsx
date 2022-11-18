import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import BuyDomain from "../components/BuyDomain";
import ConnectWallet from "../components/ConnectWallet";
import Domains from "../components/Domains";
import Editing from "../components/Editing";
import Forms from "../components/Forms";
// import { ethers } from "ethers";
// import fetch from "node-fetch";
import SVGComponent from "../components/SVGComponent";

interface Props {
  meta: {
    name: string;
    description: string;
    image: string;
  };
}

const Index: NextPage<Props> = ({ meta }) => {
  const [domain, setDomain] = useState<string>("");
  const [record, setRecord] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const price = domain.length < 4 ? 0.1 : domain.length < 7 ? 0.05 : 0.01;

  return (
    <div className="h-screen min-h-[650px] bg-slate-900 font-semibold select-none">
      <Head>
        <title>Poly Domains</title>
      </Head>
      <div className="hidden sm:block right-2 top-2 absolute">
        <ConnectWallet address={address} setAddress={setAddress} />
      </div>
      <div className="flex flex-col h-screen pt-6 sm:pt-32 items-center space-y-6">
        {editing ? (
          <div className="flex flex-col items-center space-y-6">
            <SVGComponent text={name} />
            <Editing name={name} setEditing={setEditing} />
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <SVGComponent text={domain} />
            <Forms setDomain={setDomain} setRecord={setRecord} />
            {domain.length > 0 && <div className="text-white">Cost: {price} MATIC</div>}
            {address ? <BuyDomain domain={domain} record={record} price={price} /> : <ConnectWallet address={address} setAddress={setAddress} />}
            <Domains address={address} setName={setName} setEditing={setEditing} />
          </div>
        )}
      </div>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/polygon_mumbai");
//   const contract = new ethers.Contract("0x56dD78763b0D227548e27aD6a5f478Ebb7F1F5b5", [{ inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }], name: "tokenURI", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" }], provider);
//   const uri = await contract.tokenURI(0);
//   const res = await fetch(uri).then((data) => data.json());
//   return {
//     props: { meta: res },
//   };
// };

export default Index;
