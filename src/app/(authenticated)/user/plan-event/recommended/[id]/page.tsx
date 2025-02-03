import PlanEventTitle from "@/components/dashboard/admin/events/plan-event/plan-event-page";
import React from "react";

interface Params {
  params: {
    id: string;
  };
}

function AiPlanedEvents({ params }: Params) {
  return <PlanEventTitle id={params.id} />;
}

export default AiPlanedEvents;
