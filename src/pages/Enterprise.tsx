import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Building2, 
  Users, 
  BarChart3, 
  Shield, 
  Headphones,
  Zap,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Users,
    title: "Team Management",
    description: "Easily manage learning paths for your entire organization with bulk enrollment and progress tracking"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Gain insights into team progress, completion rates, and skill development with detailed reports"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SSO integration, SOC 2 compliance, and advanced security features to protect your data"
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "24/7 priority support with a dedicated customer success manager for your organization"
  },
  {
    icon: Zap,
    title: "Custom Integrations",
    description: "Seamlessly integrate with your existing LMS, HR systems, and productivity tools"
  },
  {
    icon: Building2,
    title: "Custom Content",
    description: "Create private courses and learning paths tailored to your organization's needs"
  }
];

const logos = [
  "Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix", "Spotify", "Uber"
];

const stats = [
  { value: "500+", label: "Enterprise clients" },
  { value: "5M+", label: "Employee learners" },
  { value: "95%", label: "Satisfaction rate" },
  { value: "40%", label: "Skill improvement" }
];

const plans = [
  {
    name: "Team",
    description: "For small teams getting started",
    features: [
      "Up to 50 users",
      "5,000+ courses access",
      "Basic analytics",
      "Email support",
      "Team management"
    ]
  },
  {
    name: "Business",
    description: "For growing organizations",
    features: [
      "Up to 500 users",
      "Full course library",
      "Advanced analytics",
      "Priority support",
      "SSO integration",
      "Custom learning paths"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    features: [
      "Unlimited users",
      "Full course library",
      "Custom reporting",
      "24/7 dedicated support",
      "Full integrations suite",
      "Custom content creation",
      "On-premise options"
    ]
  }
];

const Enterprise = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/10 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              Trusted by 500+ enterprises
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Upskill Your{" "}
              <span className="text-primary">Entire Workforce</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Empower your employees with world-class learning. Enterprise solutions that scale with your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2">
                Request Demo
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-medium text-muted-foreground mb-8">
            TRUSTED BY LEADING COMPANIES
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 max-w-5xl mx-auto">
            {logos.map((logo, index) => (
              <div key={index} className="text-2xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Enterprise-Grade Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage learning at scale
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Plans for Every Team Size
            </h2>
            <p className="text-lg text-muted-foreground">
              Flexible pricing that grows with your organization
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border ${
                  plan.popular
                    ? "border-primary bg-primary/5 relative"
                    : "border-border bg-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Team's Learning?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Schedule a demo with our enterprise team to see how EduLearn can help your organization grow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your work email"
                className="bg-primary-foreground text-foreground"
              />
              <Button variant="secondary" size="lg">
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Enterprise;
