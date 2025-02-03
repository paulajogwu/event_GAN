"use client";

import React, { useMemo, useState } from "react";
import { api } from "@/trpc/react";
import Messages from "./messages";
import { Event, Service } from "@prisma/client";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  Avatar,
  VoiceCallButton,
  ConversationHeader,
  EllipsisButton,
} from "@chatscope/chat-ui-kit-react";

export interface EventWithServices {
  id: string; // VendorId
  event: Event;
  services: Service[];
}

function VendorChats() {
  const [selectedChat, setSelectedChat] = useState<string>("");
  const {
    data,
    isLoading: eventsLoading,
    error,
  } = api.event.getVendorEventsAndServiceById.useQuery();

  console.log("chatData", data);

  const deduplicatedEvents = useMemo(() => {
    const vendorMap = new Map<string, EventWithServices>();

    if (!data) return vendorMap;

    data.forEach((item) => {
      if (!vendorMap.has(item.id)) {
        vendorMap.set(item.id, {
          id: item.id,
          event: {
            id: item.id,
            name: item.name,
            description: item.description,
            guestCount: item.guestCount,
            type: item.type,
            totalPrice: item.totalPrice,
            completionRate: item.completionRate,
            status: item.status,
            location: item.location,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            customId: item.customId,
            userId: item.userId,
            startDate: item?.startDate,
            endDate: item?.endDate,
          },
          services: item.eventService.map((service) => service.service),
        });
      } else {
        // Merge services if vendor already exists
        const existingVendor = vendorMap.get(item.id)!;
        existingVendor.services = [
          ...new Set([
            ...existingVendor.services,
            ...item.eventService.map((service) => service.service),
          ]),
        ];
      }
    });

    return vendorMap;
  }, [data]);

  const arrayOfEvents = Array.from(deduplicatedEvents.values());

  const handleClickChat = (vendorId: string) => {
    setSelectedChat(vendorId);
  };

  return (
    <section>
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
              {arrayOfEvents.map((chat, idx) => (
                <Conversation
                  info={chat.services
                    ?.map((service) => service.name)
                    .join(", ")}
                  key={`${chat.event?.id}-${idx}`}
                  lastSenderName="lastSender"
                  name={chat.event.name}
                  onClick={() => handleClickChat(chat.id)}
                  active={selectedChat === chat.id}
                >
                  <Avatar
                    name={chat.event.name ?? "Vendor"}
                    src={"/img/placeholder.png"}
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
                  src={"/img/placeholder.png"}
                  name={
                    deduplicatedEvents.get(selectedChat)?.event.name ??
                    "No vendor"
                  }
                />
                <ConversationHeader.Content
                  userName={
                    deduplicatedEvents.get(selectedChat)?.event.name ??
                    "No vendor"
                  }
                  info={
                    deduplicatedEvents
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
                roomId={"everything"}
                eventId={deduplicatedEvents.get(selectedChat)?.event.id ?? ""}
                services={deduplicatedEvents.get(selectedChat)?.services ?? []}
                selectedChat={selectedChat}
              />
            </div>
          </ChatContainer>
        </MainContainer>
      </div>
    </section>
  );
}

export default VendorChats;
