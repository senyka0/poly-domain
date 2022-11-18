import React, { Dispatch, FC, SetStateAction } from "react";

interface Props {
  setDomain: Dispatch<SetStateAction<string>>;
  setRecord: Dispatch<SetStateAction<string>>;
}

const Forms: FC<Props> = ({ setDomain, setRecord }) => {
  return (
    <div className="space-y-6">
      <label className="w-[260px] relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <input
          onChange={(e) => {
            setDomain(e.target.value);
          }}
          maxLength={10}
          placeholder="Domain"
          className="text-white peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        />

        <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">Domain</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 grid w-10 place-content-center pr-1 text-gray-500">.poly</span>
      </label>
      <label className="w-[260px] relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <input
          onChange={(e) => {
            setRecord(e.target.value);
          }}
          placeholder="Message"
          className="text-white peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        />

        <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">Message</span>
      </label>
    </div>
  );
};

export default Forms;
