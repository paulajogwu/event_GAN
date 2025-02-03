import { render } from "jsx-email";
import AccountVerificationEmail from "@/emails/AccountVerificationEmail";
import PasswordResetEmail from "@/emails/PasswordResetEmail";
import { sendMail } from "@/server/mailer";
import ServiceOrderEmail from "@/emails/vendors/ServiceOrderEmail";

export const sendVerificationEmail = async (email: string, token: string) => {
  const baseUrl = process.env.NEXTAUTH_URL;
  const confirmLink = `${baseUrl}/verify-email/${token}`;

  const html = await render(
    AccountVerificationEmail({
      verifyLink: confirmLink,
    }),
  );

  await sendMail({
    to: email,
    subject: "Confirm your email",
    html,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const baseUrl = process.env.NEXTAUTH_URL;
  const confirmLink = `${baseUrl}/reset-password/${token}`;

  const html = await render(
    PasswordResetEmail({
      resetLink: confirmLink,
    }),
  );

  await sendMail({
    to: email,
    subject: "Reset your password",
    html,
  });
};


export const sendNewOrderEmail = async (event: { id: string; name: string },) => {
  const baseUrl = process.env.NEXTAUTH_URL;
  const link = `${baseUrl}/dashboard/events/${event.id}`

  // const userServiceInfo = await db.eventService.findMany({
  //   where: {
  //     eventId: event.id
  //   },
  //   include: {
  //     service: {
  //       include: {
  //         user: true
  //       }
  //     }
  //   }
  // })

  // const emails = userServiceInfo.map((info) => (info.service.user.email))

  // console.log(emails)


  const html = await render(
    ServiceOrderEmail({
      eventName: event.name,
      link,
      username: "vendor"
    }),
  );

  await sendMail({
    to: "chineduezeh19@gmail.com",
    subject: "Hurray, You've made a sale",
    html,

  });
};