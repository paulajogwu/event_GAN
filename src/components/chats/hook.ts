import { pusherClient } from "@/lib/pusher/client";
import { useEffect } from "react";
import { WebMessage } from "./messages";


const usePusherSubscription = (roomId: string, callBack: (text: WebMessage) => void) => {

    useEffect(() => {
        // subscribe the current room to listen for pusher events.
        pusherClient.subscribe(roomId);

        // when an "incoming-message" event is triggered
        // (shown in the previous code block)
        // make sure to update the messages state in real-time for all users.
        pusherClient.bind("incoming-message", (data: WebMessage) => {

            callBack(data);
        });

        // unsubscribe on component unmount.
        return () => {
            pusherClient.unbind("incoming-message");
            pusherClient.unsubscribe(roomId);

        };
    }, [roomId]);
};

export default usePusherSubscription;
