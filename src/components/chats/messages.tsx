"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaFile, FaLocationArrow } from "react-icons/fa6";
import { api } from "@/trpc/react";
import { Service } from "@prisma/client";
import { Loader2 } from "lucide-react";
import usePusherSubscription from "./hook";
import { useSession } from "next-auth/react";
import SendMessage from "./input";
import { Message, MessageList, Loader } from "@chatscope/chat-ui-kit-react";
import { uploadAttachment } from "@/app/actions/upload";

const generateRandomId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export type MessageType = "text" | "attachment";

export type WebMessage = {
  text: string;
  senderId: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  conversationId: string;
  attachment?: {
    url: string;
    name: string;
    type: string;
  };
};

const Messages = ({
  eventId,
  services,
  selectedChat,
}: {
  eventId: string;
  services: Service[];
  roomId?: string;
  selectedChat?: string;
}) => {
  const [noChatRoom, setNoChatRoom] = useState(false);
  const [messages, setMessages] = useState<WebMessage[]>([]);
  const pendingMessageArgs = useRef<{
    message: string;
    type: MessageType;
    attachment?: File;
  } | null>(null);

  const clientSession = useSession();
  const utils = api.useUtils();
  console.log(clientSession);
  const userId = clientSession.data?.user?.id;

  const [roomId, setRoomId] = useState("");

  const {
    data: chatRoom,
    error,
    isLoading,
    refetch: refetchRoom,
  } = api.chatServer.getChatRoom.useQuery(
    {
      eventId,
      serviceId: services[0]?.id ?? "",
    },
    {
      enabled: !!eventId && !!services,
    },
  );

  useEffect(() => {
    if (chatRoom?.id) {
      setRoomId(chatRoom.id);
    }
  }, [chatRoom?.id]);

  useEffect(() => {
    if (roomId) {
      resendPendingMessage();
    }
  }, [roomId]);

  useEffect(() => {
    setMessages(
      chatRoom?.messages?.map((msg) => ({
        text: msg.text,
        senderId: msg.senderId,
        id: msg.id,
        createdAt: msg.createdAt.toISOString(),
        updatedAt: msg.updatedAt.toISOString(),
        conversationId: msg.conversationId,
        attachment: msg?.attachment
          ? JSON.parse(msg.attachment as string)
          : undefined,
      })) ?? [],
    );
  }, [chatRoom?.messages?.length]);

  const { mutateAsync: createChatRoom, isPending: isCreatingChatRoom } =
    api.chatServer.createChatRoom.useMutation({
      onSuccess(response) {
        utils.chatServer.getChatRoom.setData(
          {
            eventId,
            serviceId: String(services[0]?.id),
          },
          (prev) => {
            if (!prev) return prev;
            return { ...prev, id: response?.id ?? "" };
          },
        );
        setRoomId(response.id);
      },
    });

  const resendPendingMessage = async () => {
    if (!pendingMessageArgs.current) return;
    await handleSendMessage(
      pendingMessageArgs.current.message,
      pendingMessageArgs.current.type,
      pendingMessageArgs.current.attachment,
    );
    pendingMessageArgs.current = null;
  };

  console.log(messages);
  console.log(roomId);

  usePusherSubscription(roomId ?? "", (message) => {
    console.log(message);
    if (message.senderId !== userId) {
      setMessages((prev) => [...prev, message]);
    }
  });

  useEffect(() => {
    if (error) {
      if (error.message.toLowerCase().includes("found")) {
        setNoChatRoom(true);
      }
    } else {
      setNoChatRoom(false);
    }
  }, [error]);

  const { mutateAsync: postMessage } = api.chatServer.postMessage.useMutation({
    onSuccess() {
      refetchRoom();
    },
  });

  const handleSendMessage = async (
    message: string,
    type: MessageType = "text",
    attachment?: File,
  ) => {
    const trimmedMessage = message.trim();

    if (!roomId) {
      try {
        await createChatRoom({
          eventId,
          serviceIds: services.map((s) => s.id),
        });
        pendingMessageArgs.current = {
          message: trimmedMessage,
          type,
          attachment,
        };
        return;
      } catch (error) {
        console.error("Error creating chat room:", error);
      }
    }

    switch (type) {
      case "text":
        if (trimmedMessage !== "") {
          setMessages((prev) => [
            ...prev,
            {
              text: trimmedMessage,
              senderId: userId ?? "",
              id: generateRandomId(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              conversationId: roomId ?? "",
            },
          ]);

          roomId && postMessage({ text: trimmedMessage, roomId });
        }
        break;
      case "attachment":
        if (attachment) {
          // Show optimistic update
          setMessages((prev) => [
            ...prev,
            {
              text: trimmedMessage,
              senderId: userId ?? "",
              id: generateRandomId(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              conversationId: roomId ?? "",
              attachment: {
                url: URL.createObjectURL(attachment),
                name: attachment.name,
                type: attachment.type,
              },
            },
          ]);

          try {
            // Upload file using server action
            const formData = new FormData();
            formData.append("attachment", attachment);
            const attachmentUrl = await uploadAttachment(formData);

            // Send message with attachment URL
            if (roomId) {
              await postMessage({
                text: trimmedMessage,
                roomId,
                attachment: {
                  url: attachmentUrl as string,
                  name: attachment.name,
                  type: attachment.type,
                },
              });
            }
          } catch (error) {
            console.error("Error handling attachment:", error);
          }
        }
        break;
    }
  };

  // if (isLoading || isCreatingChatRoom)
  //   return (
  //     <div className="flex h-full items-center justify-center">
  //       <Loader2 className="animate-spin" />
  //     </div>
  //   );
  return (
    <>
      <MessageList
        style={{
          height: "100%",
        }}
        loading={isLoading || isCreatingChatRoom}
      >
        {/* {isLoading && <Loader. />} */}

        {noChatRoom && !selectedChat && (
          <MessageList.Content
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
              textAlign: "center",
              fontSize: "1.2em",
            }}
          >
            Send a message to start a conversation
          </MessageList.Content>
        )}

        {!isLoading && !noChatRoom && (
          <>
            {messages.map((msg) => {
              if (msg?.attachment) {
                return <CustomMessage msg={msg} userId={userId} />;
              }
              return (
                <Message
                  model={{
                    message: msg.text,
                    sentTime: msg.createdAt,
                    sender: msg.senderId,
                    direction:
                      msg.senderId === userId ? "outgoing" : "incoming",
                    position: "single",

                    // payload: {
                    //   src: msg?.attachment?.url,
                    //   name: msg?.attachment?.name,
                    //   width: 200,
                    // },
                  }}
                  key={msg.id}
                />
              );
            })}
          </>
        )}
        {/* Message input */}

        {/* <Button
              onClick={() => {
                createChatRoom({
                  eventId,
                  serviceIds: services.map((s) => s.id),
                });
              }}
              disabled={isCreatingChatRoom}
              variant={"ghost"}
            >
              Create chat room
            </Button> */}
      </MessageList>
      {selectedChat && (
        <>
          <div
            style={{
              all: "inherit",
            }}
            // @ts-ignore
            as="MessageInput"
          >
            <SendMessage handleSendMessage={handleSendMessage} />
          </div>
        </>
      )}
    </>
  );
};

export default Messages;

const CustomMessage = ({
  msg,
  userId,
}: {
  msg: WebMessage;
  userId?: string;
}) => {
  const hasAttachment = !!msg?.attachment;
  const isImage = msg?.attachment?.type.includes("image");

  return (
    <Message
      model={{
        type: "custom",
        sentTime: msg.createdAt,
        sender: msg.senderId,
        direction: msg.senderId === userId ? "outgoing" : "incoming",
        position: "single",
      }}
    >
      <Message.CustomContent>
        {hasAttachment ? (
          <div className="flex flex-col gap-2">
            {isImage ? (
              <img
                src={msg?.attachment?.url}
                alt={msg?.attachment?.name}
                className="min-h-[200px] w-full max-w-[200px] rounded-lg"
              />
            ) : (
              <a
                href={msg?.attachment?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-gray-100 p-3 transition-colors hover:bg-gray-200"
              >
                <FaFile className="text-gray-500" />
                <span className="max-w-[150px] truncate text-sm text-gray-700">
                  {msg?.attachment?.name}
                </span>
              </a>
            )}
            {msg.text && <p>{msg.text}</p>}
          </div>
        ) : (
          msg.text
        )}
      </Message.CustomContent>
    </Message>
  );
};
