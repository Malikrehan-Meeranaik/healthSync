import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2.5">
      <div className="rounded-2xl bg-white p-1">
        <Image
          src="/assets/icons/logo.svg"
          height={60}
          width={60}
          alt="Logo"
          className="side-img max-w-full rounded-3xl"
        />
      </div>
      <div className="flex items-center gap-1">
        <div className="flex flex-col">
          <p className="cursor-pointer text-2xl font-extrabold text-white">
            HEALTH
          </p>
          <div className="w-22 h-2 bg-secondaryColor"></div>
        </div>
        <div className="mt-4 flex flex-col gap-0">
          <div className="w-18 h-2 bg-secondaryColor"></div>
          <p className="cursor-pointer text-2xl font-extrabold text-white">
            SYNC
          </p>
        </div>
      </div>
    </div>
  );
};

export default Logo;
