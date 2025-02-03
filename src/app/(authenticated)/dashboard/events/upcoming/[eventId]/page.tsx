import UpcomingEventDetails from '@/components/events/upcoming-events/details/event-details'
import React from 'react'

interface Params {
    params: {
        id: string
    }
}

function UpcomingEventDetailsPage({ params }:Params) {
    return (
        <div>
            <UpcomingEventDetails
             id={params.id}
             guestTypeCount={"150 Guests"}
             eventType={"Wedding "}
             campaignsCount={50}
              />
        </div>
    )
}

export default UpcomingEventDetailsPage
