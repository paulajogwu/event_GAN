"use client";
import React, { useRef, useState } from "react";
import { MessageType } from "./messages";
import { MessageInput } from "@chatscope/chat-ui-kit-react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  handleSendMessage: (
    message: string,
    type?: MessageType,
    attachment?: File,
  ) => void;
};

const SendMessage = ({ handleSendMessage }: Props) => {
  const [messageBoxValue, setMessageBoxValue] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment(file);
    }
  };

  const handleSend = (message?: string) => {
    handleSendMessage(
      message || messageBoxValue,
      attachment ? "attachment" : "text",
      attachment || undefined,
    );
    setMessageBoxValue("");
    setAttachment(null);
  };

  return (
    <div
      style={{
        all: "inherit",
        position: "relative",
      }}
      // @ts-ignore
      as={MessageInput}
    >
      {attachment && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute bottom-[48px] left-0 flex w-full items-center gap-2 rounded-lg bg-[#F2F4F7] p-2"
        >
          <span className="text-sm">{attachment.name}</span>
          <button
            onClick={() => setAttachment(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </motion.div>
      )}
      <MessageInput
        onAttachClick={handleAttachmentClick}
        onSend={(_, textContent) => handleSend(textContent)}
        placeholder="Type your message..."
        value={messageBoxValue}
        onChange={(_, textContent) => setMessageBoxValue(textContent)}
        autoFocus
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="absolute bottom-0 left-0 hidden"
      />
    </div>
  );
};

export default SendMessage;
