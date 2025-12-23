import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { 
  MapPin, Clock, DollarSign, Briefcase, Heart, Zap, 
  Users, Coffee, Laptop, Plane, GraduationCap, Dumbbell,
  ChevronRight, Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const jobs = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $180k",
    description: "Build and scale our learning platform with modern technologies.",
    tags: ["React", "Node.js", "PostgreSQL", "AWS"]
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$100k - $150k",
    description: "Design intuitive learning experiences that delight millions of students.",
    tags: ["Figma", "UX Research", "Prototyping", "Design Systems"]
  },
  {
    id: 3,
    title: "Content Strategist",
    department: "Content",
    location: "New York, NY",
    type: "Full-time",
    salary: "$80k - $120k",
    description: "Shape our content strategy and partner with world-class instructors.",
    tags: ["Content Strategy", "EdTech", "Curriculum Design", "SEO"]
  },
  {
    id: 4,
    title: "Data Scientist",
    department: "Data",
    location: "Remote",
    type: "Full-time",
    salary: "$130k - $170k",
    description: "Use data to personalize learning paths and improve student outcomes.",
    tags: ["Python", "Machine Learning", "SQL", "A/B Testing"]
  },
  {
    id: 5,
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$70k - $100k",
    description: "Help enterprise customers achieve their learning and development goals.",
    tags: ["B2B", "SaaS", "Training", "Relationship Management"]
  },
  {
    id: 6,
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $130k",
    description: "Drive growth through innovative marketing campaigns and partnerships.",
    tags: ["Digital Marketing", "Growth", "Analytics", "Brand Strategy"]
  }
];

const benefits = [
  { icon: Laptop, title: "Remote-First", description: "Work from anywhere in the world" },
  { icon: DollarSign, title: "Competitive Pay", description: "Top-tier salaries and equity" },
  { icon: Heart, title: "Health Benefits", description: "Medical, dental, and vision coverage" },
  { icon: Plane, title: "Unlimited PTO", description: "Take time when you need it" },
  { icon: GraduationCap, title: "Learning Budget", description: "$2,000/year for courses and books" },
  { icon: Dumbbell, title: "Wellness Stipend", description: "$100/month for health and fitness" },
  { icon: Coffee, title: "Home Office Setup", description: "$1,500 to set up your workspace" },
  { icon: Users, title: "Team Retreats", description: "Annual company-wide gatherings" }
];

const departments = ["All", "Engineering", "Design", "Content", "Data", "Customer Success", "Marketing"];

const Careers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || job.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">We're Hiring!</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-up">
            Build the Future of <span className="text-gradient">Education</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-up stagger-1">
            Join our mission to make world-class education accessible to everyone. 
            We're looking for passionate individuals who want to make a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="hero" size="xl">
              <a href="#positions">View Open Positions</a>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/about">Learn About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Join EduLearn?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer more than just a job - we offer a chance to transform lives through education
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-none shadow-soft bg-card hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Culture</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Move Fast & Learn</h3>
                    <p className="text-muted-foreground text-sm">We ship quickly, iterate based on feedback, and aren't afraid to experiment.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Collaborate & Grow</h3>
                    <p className="text-muted-foreground text-sm">We believe the best ideas come from diverse perspectives working together.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Impact Over Ego</h3>
                    <p className="text-muted-foreground text-sm">We focus on what's best for our students and the mission, not personal accolades.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop" 
                alt="Team collaboration"
                className="rounded-2xl shadow-card w-full h-40 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop" 
                alt="Team meeting"
                className="rounded-2xl shadow-card w-full h-40 object-cover mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop" 
                alt="Team brainstorm"
                className="rounded-2xl shadow-card w-full h-40 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop" 
                alt="Remote work"
                className="rounded-2xl shadow-card w-full h-40 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Open Positions</h2>
            <p className="text-muted-foreground">Find your perfect role and join our growing team</p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <Button
                  key={dept}
                  variant={selectedDepartment === dept ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDepartment(dept)}
                >
                  {dept}
                </Button>
              ))}
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <Card key={job.id} className="border-none shadow-soft bg-card hover:shadow-card transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{job.department}</Badge>
                          <Badge variant="outline">{job.type}</Badge>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">{job.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" /> {job.salary}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {job.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-primary/10 text-primary border-none">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="hero" className="flex-shrink-0 group-hover:scale-105 transition-transform">
                        Apply Now <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No positions found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Don't See Your Role */}
      <section className="py-20 px-4 gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Don't See Your Role?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for talented people. Send us your resume and tell us how you'd like to contribute.
          </p>
          <Button variant="hero" size="xl">
            Submit General Application
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
