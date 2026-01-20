/**
 * StudyPage Component
 * 
 * Static page for Study resources section.
 * Displays information about study materials and resources.
 */
import { Card } from "@/components/ui/card";
import { BookOpen, FileText, Video, Download } from "lucide-react";

export default function StudyPage() {
    const resources = [
        {
            icon: BookOpen,
            title: "Study Guides",
            description: "Comprehensive guides covering all CA exam topics with detailed explanations."
        },
        {
            icon: FileText,
            title: "Practice Papers",
            description: "Previous year papers and mock tests to prepare for your exams."
        },
        {
            icon: Video,
            title: "Video Lectures",
            description: "Expert-led video tutorials breaking down complex concepts."
        },
        {
            icon: Download,
            title: "Downloadable Notes",
            description: "Concise revision notes in PDF format for offline study."
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl text-left">
            {/* Page Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-3">Study Resources</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Access comprehensive study materials designed to help you excel in your CA journey.
                </p>
            </div>

            {/* Resource Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource, index) => (
                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow text-left">
                        <resource.icon className="h-10 w-10 text-primary mb-4" />
                        <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </Card>
                ))}
            </div>

            {/* Coming Soon Notice */}
            <div className="mt-10 text-center p-6 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                    More study resources coming soon. Stay tuned!
                </p>
            </div>
        </div>
    );
}
