import { pusherServer } from "@/lib/pusher/server"
import { withServerSession } from "@/server/auth"

// This is optional but highly recommended to prevent bad actors
// from overloading your channel.
export async function POST(req: Request) {
    const { user } = await withServerSession()
    const data = await req.text()

    // Extracting the socketId and channelName from the
    // search params when making an authorized request.
    const [socketId, channelName] = data
        .split("&")
        .map((str) => str.split("=")[1])



    // Provide identity metadata for the request maker.
    const presenceData = {
        user_id: user.id,
        user_data: { user_id: user.id },
    }


    // Authorize a given pusher channel for the current user who
    // is making the socket connection.
    const auth = pusherServer.authorizeChannel(
        socketId ?? "",
        channelName ?? "",
        presenceData
    )

    return Response.json(auth)
}
