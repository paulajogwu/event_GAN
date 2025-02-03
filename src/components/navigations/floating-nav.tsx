"use client";

import { useState } from "react";
import Headroom from "react-headroom";
import VendorHeader from "../common/vendors/header";

export function FloatingNav() {
  const [openDrop, setOpenDrop] = useState(false);

  return (
    <>
      {openDrop && (
        <div
          onClick={() => setOpenDrop(false)}
          className="fixed inset-0 top-[20px] h-screen w-screen bg-transparent"
        />
      )}
      <Headroom className="sticky top-[75px] z-[50]">
        <VendorHeader />
      </Headroom>
    </>
  );
}
