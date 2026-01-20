/**
 * MentorsPage Component
 * 
 * Static page displaying mentor profiles for guidance.
 */
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users } from "lucide-react";

export default function MentorsPage() {
    const mentors = [
        {
            name: "CA Priya Sharma",
            title: "Senior Partner, Big 4",
            expertise: ["Audit", "Taxation"],
            experience: "15+ years",
            rating: 4.9,
            mentees: "200+"
        },
        {
            name: "CA Rajesh Kumar",
            title: "CFO, Fortune 500",
            expertise: ["Finance", "Strategy"],
            experience: "20+ years",
            rating: 4.8,
            mentees: "150+"
        },
        {
            name: "CA Anita Desai",
            title: "Tax Expert & Author",
            expertise: ["GST", "Income Tax"],
            experience: "12+ years",
            rating: 4.9,
            mentees: "300+"
        },
        {
            name: "CA Vikram Singh",
            title: "Startup Advisor",
            expertise: ["Compliance", "Fundraising"],
            experience: "10+ years",
            rating: 4.7,
            mentees: "100+"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl text-left">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-3">Our Mentors</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Learn from industry experts who have walked the path you're on.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mentors.map((mentor, index) => (
                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow text-left">
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                                {mentor.name.split(' ').slice(1).map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">{mentor.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{mentor.title}</p>
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {mentor.expertise.map((skill) => (
                                        <Badge key={skill} variant="secondary" className="text-xs">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        {mentor.rating}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users className="h-3 w-3" />
                                        {mentor.mentees} mentees
                                    </span>
                                    <span>{mentor.experience}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
