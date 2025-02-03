import EventDetailsCard from "@/components/events/event-details/page";
import React from "react";

interface Params {
  params: {
    id: string;
  };
}
function EventDetails({ params }: Params) {
  return <EventDetailsCard id={params.id} />;
}

export default EventDetails;
