"use client";

import React, { useMemo, useState } from "react";
import { VendorWithServices } from "@/app/(authenticated)/user/events/[id]/page";
import Messages from "./messages";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  Avatar,
  ConversationHeader,
  EllipsisButton,
} from "@chatscope/chat-ui-kit-react";

function UsersChat({
  eventId,
  vendorsMap,
}: {
  eventId: string;
  vendorsMap: Map<string, VendorWithServices>;
}) {
  const [selectedChat, setSelectedChat] = useState<string>("");
  const roomId = "everything";
  const vendorsWithServices = useMemo(
    () => Array.from(vendorsMap.values()),
    [vendorsMap.size],
  );

  const handleClickChat = (vendorId: string) => {
    setSelectedChat(vendorId);
  };

  return (
    <section className="my-8">
      <div style={{ position: "relative", height: "500px" }}>
        <MainContainer
          responsive
          style={{
            height: "500px",
          }}
        >
          <Sidebar position="left">
            <Search placeholder="Search..." />
            <ConversationList>
              {vendorsWithServices.map(({ vendor, services }, idx) => (
                <Conversation
                  info={services?.map((service) => service.name).join(", ")}
                  key={`${vendor?.id}-${idx}`}
                  lastSenderName="lastSender"
                  name={vendor.businessName}
                  onClick={() => handleClickChat(vendor.id)}
                  active={selectedChat === vendor.id}
                >
                  <Avatar
                    name={vendor.businessName ?? "Vendor"}
                    src={vendor.images[0] ?? "/img/placeholder.png"}
                    status="available"
                  />
                </Conversation>
              ))}
            </ConversationList>
          </Sidebar>
          <ChatContainer>
            {selectedChat && (
              <ConversationHeader>
                <ConversationHeader.Back />
                <Avatar
                  src={
                    vendorsMap.get(selectedChat)?.vendor?.images[0] ??
                    "/img/placeholder.png"
                  }
                  name={
                    vendorsMap.get(selectedChat)?.vendor?.businessName ??
                    "No vendor"
                  }
                />
                <ConversationHeader.Content
                  userName={
                    vendorsMap.get(selectedChat)?.vendor?.businessName ??
                    "No vendor"
                  }
                  info={
                    vendorsMap
                      .get(selectedChat)
                      ?.services?.map((service) => service.name)
                      .join(", ") ?? "No event type"
                  }
                />
                <ConversationHeader.Actions>
                  <EllipsisButton orientation="vertical" />
                </ConversationHeader.Actions>
              </ConversationHeader>
            )}
            <div
              style={{
                all: "inherit",
              }}
              // @ts-ignore
              as={MessageList}
            >
              <Messages
                roomId={roomId}
                eventId={eventId}
                services={vendorsMap.get(selectedChat)?.services ?? []}
                selectedChat={selectedChat}
              />
            </div>
          </ChatContainer>
        </MainContainer>
      </div>
    </section>
  );
}

export default UsersChat;
