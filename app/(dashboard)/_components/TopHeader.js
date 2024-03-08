import React from "react";
import { UserButton } from "@clerk/nextjs";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
function TopHeader() {
  return (
    <div className="flex p-5 border-b items-center justify-between md:justify-end">
      <AlignJustify className="md:hidden" />
      <Image
        src="/logo.svg"
        width={150}
        height={100}
        className="md:hidden"
        alt="logo"
      />
      <UserButton />
    </div>
  );
}

export default TopHeader;
