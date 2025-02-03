import EventRecommended from "@/components/dashboard/admin/events/plan-event/recommended";
import React from "react";

interface Params {
  params: {
    id: string;
  };
}

function AiPlanedEvents() {
  return <EventRecommended />;
}

export default AiPlanedEvents;
