/**
 * PracticePage Component
 * 
 * Static page for Practice section.
 * Shows practice tests and mock exams.
 */
import { Card } from "@/components/ui/card";
import { ClipboardCheck, Timer, Target, TrendingUp } from "lucide-react";

export default function PracticePage() {
    const features = [
        {
            icon: ClipboardCheck,
            title: "Mock Tests",
            description: "Full-length mock exams simulating actual CA exam conditions."
        },
        {
            icon: Timer,
            title: "Timed Quizzes",
            description: "Quick quizzes to test your knowledge under time pressure."
        },
        {
            icon: Target,
            title: "Topic-wise Practice",
            description: "Focus on specific topics to strengthen weak areas."
        },
        {
            icon: TrendingUp,
            title: "Performance Analytics",
            description: "Track your progress and identify areas for improvement."
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl text-left">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-3">Practice Zone</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Sharpen your skills with our extensive practice resources and mock exams.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow text-left">
                        <feature.icon className="h-10 w-10 text-primary mb-4" />
                        <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </Card>
                ))}
            </div>

            <div className="mt-10 text-center p-6 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                    Practice tests and quizzes coming soon!
                </p>
            </div>
        </div>
    );
}
