import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Newspaper, Download, Mail, ExternalLink, Calendar, Award } from "lucide-react";
import { Link } from "react-router-dom";

const pressReleases = [
  {
    date: "December 2024",
    title: "EduLearn Reaches 10 Million Learners Worldwide",
    excerpt: "Platform celebrates milestone with launch of new AI-powered learning features and expanded course library."
  },
  {
    date: "November 2024",
    title: "EduLearn Partners with Fortune 500 Companies for Enterprise Learning",
    excerpt: "New partnerships bring professional development opportunities to over 500,000 employees globally."
  },
  {
    date: "October 2024",
    title: "EduLearn Launches Mobile App with Offline Learning",
    excerpt: "New mobile experience allows learners to download courses and study anywhere, anytime."
  },
  {
    date: "September 2024",
    title: "Series C Funding: EduLearn Raises $150M",
    excerpt: "Investment will fuel global expansion and development of cutting-edge educational technology."
  }
];

const mediaFeatures = [
  { name: "TechCrunch", logo: "TC", quote: "The future of online education" },
  { name: "Forbes", logo: "F", quote: "Top EdTech startup to watch" },
  { name: "The New York Times", logo: "NYT", quote: "Democratizing education globally" },
  { name: "Wired", logo: "W", quote: "Innovative approach to learning" }
];

const awards = [
  { year: "2024", title: "Best EdTech Platform", organization: "EdTech Awards" },
  { year: "2024", title: "Most Innovative Startup", organization: "Web Summit" },
  { year: "2023", title: "Top Online Learning Platform", organization: "G2 Crowd" },
  { year: "2023", title: "Excellence in Education", organization: "Education Week" }
];

const Press = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Newspaper className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Press & Media
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Get the latest news, press releases, and media resources about EduLearn
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Download className="w-5 h-5" />
                Press Kit
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact" className="gap-2">
                  <Mail className="w-5 h-5" />
                  Media Inquiries
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured In */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-medium text-muted-foreground mb-8">
            AS FEATURED IN
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {mediaFeatures.map((media, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-3 text-2xl font-bold text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {media.logo}
                </div>
                <p className="font-medium text-foreground">{media.name}</p>
                <p className="text-sm text-muted-foreground italic">"{media.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Press Releases</h2>
              <Button variant="outline">View All</Button>
            </div>
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <Card key={index} className="group hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="w-4 h-4" />
                          {release.date}
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {release.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {release.excerpt}
                        </p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Awards & Recognition</h2>
              <p className="text-muted-foreground">
                We're honored to be recognized by industry leaders
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className="p-6 bg-card border border-border rounded-2xl flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{award.year}</p>
                    <h3 className="font-semibold text-foreground">{award.title}</h3>
                    <p className="text-sm text-muted-foreground">{award.organization}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Media Contact</h2>
            <p className="text-muted-foreground mb-6">
              For press inquiries, interview requests, or additional information, please contact our media relations team.
            </p>
            <div className="p-8 bg-muted/50 rounded-2xl">
              <p className="font-semibold text-foreground mb-2">Sarah Johnson</p>
              <p className="text-muted-foreground mb-1">Head of Communications</p>
              <p className="text-primary font-medium">press@edulearn.com</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Press;
