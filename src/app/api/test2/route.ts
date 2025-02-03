




// export async function GET(request: Request) {
//     const event = await db.event.findFirst({
//         where: {
//             id: "66e02ebfa03dff4b3f5e6149"
//         },

//     });

//     if (!event) {
//         return
//     }

//     const services = ["66dec18047190b6564adc1c5", "66dec18547190b6564adc1cc", "66dec17e47190b6564adc1c4"]

//     console.log(event)

//     const users = await db.eventService.createMany({
//         data: services.map((service) => ({ eventId: event.id, serviceId: service }))
//     })

//     return new Response(JSON.stringify(users.count), {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//     });
// }


// // NEHEMIAH, VENDOR TEST, "AUGUSTINE"
// const userIds = ["66d74b6f4dc66e6d62c08837", "66da546d36f009bf6967051f", "66db8d07cb110e3c15f5d2a6"];

// export async function PUT(request: Request) {
//     for (const userId of userIds) {
//         // Update user role to VENDOR
//         await db.user.update({
//             where: { id: userId },
//             data: { role: "VENDOR" }
//         });

//         // Create vendor record
//         const user = await db.user.findUnique({ where: { id: userId } });
//         // if (user) {
//         //     await db.vendor.create({
//         //         data: {
//         //             name: user?.name ?? userId,
//         //             email: user.email || `${userId}@test.com`,
//         //             userId: user.id
//         //         }
//         //     });
//         // }
//     }

//     return new Response(JSON.stringify({ message: "Users updated and vendor records created" }), {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//     });
// }

export async function POST(req: Request) {


    return new Response(JSON.stringify({
        message: "Hello World"
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });


}