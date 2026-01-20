/**
 * EventsPage Component
 * 
 * Static page displaying upcoming events and webinars.
 */
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EventsPage() {
    const events = [
        {
            title: "CA Finals Preparation Workshop",
            date: "Feb 15, 2026",
            time: "10:00 AM - 4:00 PM",
            location: "Online",
            attendees: "200+ registered",
            type: "Workshop"
        },
        {
            title: "Tax Planning Masterclass",
            date: "Feb 22, 2026",
            time: "2:00 PM - 5:00 PM",
            location: "Mumbai",
            attendees: "50 seats",
            type: "Masterclass"
        },
        {
            title: "Networking Meet for CA Aspirants",
            date: "Mar 5, 2026",
            time: "6:00 PM - 9:00 PM",
            location: "Delhi",
            attendees: "100 seats",
            type: "Networking"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl text-left">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-3">Upcoming Events</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Join our events, workshops, and networking sessions to accelerate your career.
                </p>
            </div>

            <div className="space-y-4">
                {events.map((event, index) => (
                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow text-left">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-2">
                                <Badge variant="secondary">{event.type}</Badge>
                                <h3 className="font-semibold text-lg">{event.title}</h3>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" /> {event.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" /> {event.time}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" /> {event.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users className="h-4 w-4" /> {event.attendees}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
