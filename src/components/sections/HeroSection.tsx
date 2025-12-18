import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Star, Users, BookOpen } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen gradient-hero pt-24 lg:pt-32 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up opacity-0">
              <Star className="w-4 h-4 fill-current" />
              <span>Rated #1 Learning Platform 2024</span>
            </div>

            {/* Headline */}
            <h1 className=" text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.5] lg:leading-[1.5] text-foreground mb-6 animate-fade-up opacity-0 stagger-1">
              Unlock Your
              <span className="block text-gradient ">Learning Potential</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-up opacity-0 stagger-2">
              Join millions of learners worldwide and master new skills with expert-led courses, interactive projects, and personalized learning paths.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-fade-up opacity-0 stagger-3">
              <Button variant="hero" size="xl">
                Start Learning Free
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="heroOutline" size="xl">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 lg:gap-10 justify-center lg:justify-start animate-fade-up opacity-0 stagger-4">
              <StatItem icon={<Users className="w-5 h-5" />} value="2M+" label="Active Students" />
              <StatItem icon={<BookOpen className="w-5 h-5" />} value="500+" label="Courses" />
              <StatItem icon={<Star className="w-5 h-5" />} value="4.9" label="Rating" />
            </div>
          </div>

          {/* Right Content - Hero Image/Illustration */}
          <div className="relative lg:pl-8 animate-scale-in opacity-0">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-card rounded-2xl shadow-card p-6 lg:p-8 border border-border/50">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-glow cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Introduction to Web Development</h3>
                <p className="text-muted-foreground text-sm mb-4">Learn the fundamentals of modern web development</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-card" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">+1.2k enrolled</span>
                  </div>
                  <div className="flex items-center gap-1 text-accent">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-card rounded-xl shadow-card p-4 border border-border/50 animate-float hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">New Course!</p>
                    <p className="text-xs text-muted-foreground">AI & Machine Learning</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-card p-4 border border-border/50 animate-float hidden lg:block" style={{ animationDelay: '-2s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg">🎉</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Certificate Earned!</p>
                    <p className="text-xs text-muted-foreground">React Development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatItem = ({ icon, value, label }: StatItemProps) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
      {icon}
    </div>
    <div>
      <p className="text-xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  </div>
);
