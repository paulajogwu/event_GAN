import VendorChats from "@/components/chats/vendor.chats";
import React from "react";

const Messages = () => {
  return (
    <section className="satoshi pb-10">
      <div>
        <h1 className="py-4 text-2xl font-bold text-[#000000]">Message</h1>
      </div>

      <VendorChats />
    </section>
  );
};

export default Messages;
