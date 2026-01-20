/**
 * JobBoardPage Component
 * 
 * Static page displaying job listings for CA professionals.
 */
import { Card } from "@/components/ui/card";
import { Briefcase, Building2, IndianRupee, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function JobBoardPage() {
    const jobs = [
        {
            title: "Senior Auditor",
            company: "Deloitte India",
            location: "Mumbai",
            salary: "₹12-18 LPA",
            type: "Full-time",
            posted: "2 days ago"
        },
        {
            title: "Tax Consultant",
            company: "KPMG",
            location: "Bangalore",
            salary: "₹10-15 LPA",
            type: "Full-time",
            posted: "1 week ago"
        },
        {
            title: "Financial Analyst",
            company: "Goldman Sachs",
            location: "Mumbai",
            salary: "₹15-22 LPA",
            type: "Full-time",
            posted: "3 days ago"
        },
        {
            title: "Internal Auditor",
            company: "Tata Group",
            location: "Delhi",
            salary: "₹8-12 LPA",
            type: "Full-time",
            posted: "5 days ago"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl text-left">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-3">Job Board</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Discover career opportunities tailored for CA professionals.
                </p>
            </div>

            <div className="space-y-4">
                {jobs.map((job, index) => (
                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer text-left">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">{job.title}</h3>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Building2 className="h-4 w-4" /> {job.company}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Briefcase className="h-4 w-4" /> {job.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <IndianRupee className="h-4 w-4" /> {job.salary}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline">{job.type}</Badge>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> {job.posted}
                                </span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
