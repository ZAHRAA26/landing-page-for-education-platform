import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  BookOpen, 
  CreditCard, 
  User, 
  Settings, 
  PlayCircle, 
  MessageCircle,
  ChevronRight,
  Mail,
  Phone,
  MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Learn the basics of using EduLearn",
    articles: ["How to create an account", "Navigating the platform", "Finding your first course", "Setting up your profile"]
  },
  {
    icon: PlayCircle,
    title: "Courses & Learning",
    description: "Everything about taking courses",
    articles: ["Enrolling in courses", "Tracking your progress", "Downloading resources", "Earning certificates"]
  },
  {
    icon: CreditCard,
    title: "Payments & Billing",
    description: "Manage your payments and subscriptions",
    articles: ["Payment methods", "Subscription plans", "Refund policy", "Invoice and receipts"]
  },
  {
    icon: User,
    title: "Account Management",
    description: "Update your account settings",
    articles: ["Changing password", "Updating email", "Privacy settings", "Deleting account"]
  },
  {
    icon: Settings,
    title: "Technical Issues",
    description: "Troubleshoot common problems",
    articles: ["Video playback issues", "Login problems", "Browser compatibility", "Mobile app help"]
  },
  {
    icon: MessageCircle,
    title: "Community & Support",
    description: "Connect with others",
    articles: ["Discussion forums", "Study groups", "Contacting instructors", "Reporting issues"]
  }
];

const popularArticles = [
  "How do I get a refund?",
  "Can I download course videos?",
  "How do certificates work?",
  "Why won't my video play?",
  "How to cancel my subscription"
];

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              How can we help you?
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Search our knowledge base or browse categories below
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              Popular Articles
            </h2>
            <div className="flex flex-wrap gap-3">
              {popularArticles.map((article, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-muted rounded-full text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {article}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Browse by Category
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="group p-6 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <ul className="space-y-2">
                    {category.articles.map((article, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Still need help?
            </h2>
            <p className="text-muted-foreground mb-8">
              Our support team is here to assist you
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="p-6 bg-card rounded-2xl border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Email Us</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get a response within 24 hours
                </p>
                <Button variant="outline" asChild>
                  <Link to="/contact">Send Email</Link>
                </Button>
              </div>
              <div className="p-6 bg-card rounded-2xl border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with us in real-time
                </p>
                <Button variant="outline">Start Chat</Button>
              </div>
              <div className="p-6 bg-card rounded-2xl border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Mon-Fri, 9am-6pm PST
                </p>
                <Button variant="outline">+1 (555) 123-4567</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpCenter;
