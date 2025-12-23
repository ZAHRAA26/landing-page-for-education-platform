import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, Users, Award, Globe, Linkedin, Twitter } from "lucide-react";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
    bio: "Former Google engineer with 15+ years in EdTech",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    bio: "Ex-Amazon tech lead, passionate about scalable learning systems",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Content",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    bio: "PhD in Education, designed curricula for top universities",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "David Kim",
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    bio: "Product veteran from Coursera and Udemy",
    linkedin: "#",
    twitter: "#"
  }
];

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for the highest quality in everything we create, from course content to user experience."
  },
  {
    icon: Heart,
    title: "Passion",
    description: "We're driven by a genuine love for education and helping others achieve their potential."
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe learning is better together and foster a supportive global community."
  },
  {
    icon: Globe,
    title: "Accessibility",
    description: "Education should be available to everyone, regardless of location or background."
  }
];

const milestones = [
  { year: "2019", event: "Founded with a vision to democratize education" },
  { year: "2020", event: "Launched first 50 courses, reached 10,000 students" },
  { year: "2021", event: "Expanded to 200+ courses, partnered with industry leaders" },
  { year: "2022", event: "Reached 100,000 students across 150 countries" },
  { year: "2023", event: "Introduced AI-powered learning paths" },
  { year: "2024", event: "500,000+ students, recognized as top EdTech platform" }
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-up">
            Transforming Lives Through <span className="text-gradient">Education</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-up stagger-1">
            We're on a mission to make world-class education accessible to everyone, 
            everywhere. Join us in shaping the future of learning.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <Card className="border-none shadow-card bg-card">
            <CardContent className="p-8">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To empower individuals worldwide with the skills and knowledge they need 
                to thrive in the digital age. We believe that quality education should 
                not be a privilege but a right accessible to all.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-card bg-card">
            <CardContent className="p-8">
              <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-accent-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become the world's most trusted and innovative learning platform, 
                where anyone can acquire new skills, advance their careers, and 
                unlock their full potential through transformative education.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and shape our culture
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-soft bg-card text-center hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate educators and technologists working together to revolutionize learning
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-none shadow-soft bg-card overflow-hidden hover:shadow-card transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-3">
                      <a href={member.linkedin} className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href={member.twitter} className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Twitter className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-primary text-sm mb-2">{member.role}</p>
                    <p className="text-xs text-muted-foreground">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-muted-foreground">From a small idea to a global platform</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20" />
            
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <Card className="border-none shadow-soft bg-card inline-block">
                    <CardContent className="p-4">
                      <span className="text-primary font-bold">{milestone.year}</span>
                      <p className="text-foreground text-sm mt-1">{milestone.event}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-4 h-4 rounded-full gradient-primary z-10 shadow-glow" />
                <div className="w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500K+", label: "Students Worldwide" },
              { value: "1,000+", label: "Expert Instructors" },
              { value: "5,000+", label: "Courses Available" },
              { value: "150+", label: "Countries Reached" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Join Our Growing Team</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals to help us transform education. 
            Check out our open positions and be part of something meaningful.
          </p>
          <Button asChild variant="hero" size="xl">
            <Link to="/careers">View Open Positions</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
