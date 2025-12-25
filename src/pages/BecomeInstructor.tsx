import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  GraduationCap, 
  DollarSign, 
  Users, 
  Globe, 
  Video, 
  Award,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const benefits = [
  {
    icon: DollarSign,
    title: "Earn Money",
    description: "Set your own prices and earn up to 97% revenue share on course sales"
  },
  {
    icon: Users,
    title: "Reach Millions",
    description: "Access our global community of 10+ million eager learners"
  },
  {
    icon: Globe,
    title: "Teach Anywhere",
    description: "Create and manage courses from anywhere in the world"
  },
  {
    icon: Video,
    title: "Easy Course Creation",
    description: "Our tools make it simple to create professional courses"
  },
  {
    icon: Award,
    title: "Build Your Brand",
    description: "Establish yourself as an expert in your field"
  },
  {
    icon: GraduationCap,
    title: "Support & Resources",
    description: "Get dedicated support and resources to help you succeed"
  }
];

const steps = [
  { number: "01", title: "Apply", description: "Fill out our instructor application form" },
  { number: "02", title: "Get Approved", description: "Our team reviews your application" },
  { number: "03", title: "Create Course", description: "Use our tools to build your first course" },
  { number: "04", title: "Start Earning", description: "Publish and start earning from day one" }
];

const stats = [
  { value: "$50M+", label: "Paid to instructors" },
  { value: "50K+", label: "Active instructors" },
  { value: "10M+", label: "Students reached" },
  { value: "97%", label: "Max revenue share" }
];

const BecomeInstructor = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    expertise: "",
    experience: "",
    courseIdea: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you within 48 hours."
    });
    setFormData({ name: "", email: "", expertise: "", experience: "", courseIdea: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/10 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              Join 50,000+ instructors worldwide
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Share Your Knowledge,{" "}
              <span className="text-primary">Impact Lives</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Become an EduLearn instructor and reach millions of students eager to learn from experts like you.
            </p>
            <Button size="lg" className="gap-2" asChild>
              <a href="#apply">
                Start Teaching Today
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Teach on EduLearn?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join the world's leading online learning platform and transform your expertise into income
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in four simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="text-6xl font-bold text-primary/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-4 w-8 h-8 text-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Apply to Become an Instructor
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below and our team will get back to you within 48 hours
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Area of Expertise *
                </label>
                <Input
                  required
                  value={formData.expertise}
                  onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                  placeholder="e.g., Web Development, Data Science, Design"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Teaching/Professional Experience *
                </label>
                <Textarea
                  required
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="Tell us about your relevant experience..."
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Course Idea (Optional)
                </label>
                <Textarea
                  value={formData.courseIdea}
                  onChange={(e) => setFormData({ ...formData, courseIdea: e.target.value })}
                  placeholder="Briefly describe a course you'd like to create..."
                  rows={4}
                />
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  By submitting this application, you agree to our instructor terms and conditions.
                </p>
              </div>
              <Button type="submit" size="lg" className="w-full">
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BecomeInstructor;
