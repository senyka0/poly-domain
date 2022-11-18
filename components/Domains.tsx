import { ethers } from "ethers";
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import contractAbi from "../artifacts/contracts/Domains.sol/Domains.json";
import { Swiper, SwiperSlide } from "swiper/react";

interface Domain {
  id: string;
  name: string;
  record: string;
  owner: string;
}

interface Props {
  address: string;
  setName: Dispatch<SetStateAction<string>>;
  setEditing: Dispatch<SetStateAction<boolean>>;
}

const Domains: FC<Props> = ({ address, setName, setEditing }) => {
  useEffect(() => {
    const fetchDomains = async () => {
      if (address) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x2c4f2C46e6b6d9C757fE52a336eF9F831e377404", contractAbi.abi, signer);
        const names = await contract.getAllNames();
        console.log(names);
        const mintRecords = await Promise.all(
          names.map(async (name: string) => {
            const mintRecord = await contract.records(name);
            const owner = await contract.domains(name);
            return {
              id: names.indexOf(name),
              name: name,
              record: mintRecord,
              owner: owner,
            };
          })
        );
        console.log(mintRecords);
        setDomains(mintRecords);
      }
    };
    fetchDomains();
    const countId = setInterval(() => {
      fetchDomains();
    }, 5000);
    return () => clearInterval(countId);
  }, [address]);

  const [domains, setDomains] = useState<Domain[]>([]);

  const editRecord = (name: string) => {
    setName(name);
    setEditing(true);
  };

  return (
    <div className="flex items-center justify-center w-[270px] ">
      <Swiper pagination={true} modules={[Pagination]}>
        {domains.map((domain, index) => {
          if (domain.owner.toLocaleLowerCase() === address.toLocaleLowerCase()) {
            return (
              <SwiperSlide key={index}>
                <div className="p-2 rounded-2xl bg-gradient-to-r from-[#AD1DEB] to-[#6E72FC] shadow-xl mx-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{domain.name}.poly</h3>
                    <p className="mt-1 mb-4 text-sm text-white">
                      {domain.record}{" "}
                      <button onClick={() => editRecord(domain.name)}>
                        <img className="h-auto w-3" src="https://img.icons8.com/metro/26/000000/pencil.png" alt="Edit button" />
                      </button>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </div>
  );
};

export default Domains;
