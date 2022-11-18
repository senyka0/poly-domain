import React, { Dispatch, FC, SetStateAction, useState } from "react";

interface Props {
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
}

const ConnectWallet: FC<Props> = ({ address, setAddress }) => {
  const connectWallet = async (): Promise<void> => {
    console.log(process.env.GOERLI_URL);
    if (window.ethereum) {
      if (window.ethereum.networkVersion !== 80001) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x13881" }],
          });
        } catch (err: any) {
          if (err.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x13881",
                  chainName: "Polygon Mumbai Testnet",
                  rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
                  nativeCurrency: {
                    name: "Mumbai Matic",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                },
              ],
            });
          }
        }
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(accounts[0]);
    } else {
      alert("MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html");
    }
  };
  return (
    <div>
      <button className="text-white inline-block rounded-full bg-gradient-to-r from-[#AD1DEB] to-[#6E72FC] p-[2px]" onClick={connectWallet}>
        <span className="block rounded-full bg-slate-900 px-8 py-3 text-sm font-medium hover:bg-transparent">{address ? `${address.substring(0, 7)}...${address.substring(address.length - 5)}` : "Connect"}</span>
      </button>
    </div>
  );
};

export default ConnectWallet;
