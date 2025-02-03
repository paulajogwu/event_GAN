import EventCard from "../../event-card";
import eventIMage from "~/public/img/event1.png"

export function WatchMagic() {
    return (
        <div className="max-w-lg mx-auto">
            <EventCard
            event={{
                id: '1',
                image: eventIMage,
                title: "95 sitting capicity hall",
                description:
                    "Ideal for birthdays, seminars, and weddings receptions; Includes a small stage and great lake view.",
                location: "India",
                roomCount: 3,
                elevator: "Yes",
            }} />
        </div>
    )
}
