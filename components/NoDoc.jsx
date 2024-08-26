import Image from "next/image";
import React from "react";
import rowDocIcon from "../public/Row-Doc.svg";

const NoDoc = () => {
  return (
    <div className="flex items-center justify-center space-x-4 h-[30vh] opacity-40">
      <Image width={30} height={30} alt="logo" src={rowDocIcon} />
      <h1 className="text-lg">Create a doc to start :)</h1>
    </div>
  );
};

export default NoDoc;
