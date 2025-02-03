import React from "react";

type Props = {
  eventName: string;
  // serviceName: string;
  // serviceDate: string;
  // eventId: string;
  username: string;
  link: string;
};

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "jsx-email";

const ServiceOrderEmail = ({ eventName, username, link }: Props) => {
  return (
    <Html>
      <Head />
      <Preview>Hurray, You've made a sale</Preview>
      <Link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Arial:400,600"
      />
      <Tailwind>
        <Body>
          <Container className="mx-auto my-[40px] w-[465px] border-separate rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              New Order
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              One of your product has been ordered on the event gizmo platform
              for an event titled: "{eventName}".
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Please review the event details and confirm your availability.
            </Text>

            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={link}
              >
                View Event Details
              </Button>
            </Section>
            <Text className="!text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              <Link href={link} className="text-blue-600 no-underline">
                {link}
              </Link>
            </Text>

            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="!text-[12px] leading-[24px] text-[#666666]">
              This invitation was intended for{" "}
              <span className="text-black">{username} </span>. If you were not
              expecting this invitation, you can ignore this email. If you are
              concerned about your account's safety, please reply to this email
              to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ServiceOrderEmail;
