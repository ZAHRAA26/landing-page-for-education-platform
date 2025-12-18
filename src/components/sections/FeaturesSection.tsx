import { BookOpen, Award, Users, Zap, Clock, Shield } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Expert-Led Courses",
    description: "Learn from industry professionals and thought leaders who bring real-world experience to every lesson.",
  },
  {
    icon: Zap,
    title: "Interactive Learning",
    description: "Engage with hands-on projects, quizzes, and coding exercises that reinforce your knowledge.",
  },
  {
    icon: Clock,
    title: "Learn at Your Pace",
    description: "Access courses anytime, anywhere. Our flexible platform adapts to your schedule and learning style.",
  },
  {
    icon: Award,
    title: "Earn Certificates",
    description: "Showcase your achievements with industry-recognized certificates upon course completion.",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join a global community of learners. Collaborate, discuss, and grow together.",
  },
  {
    icon: Shield,
    title: "Lifetime Access",
    description: "Purchase once, learn forever. Get lifetime access to all course materials and future updates.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Everything You Need to
            <span className="text-gradient"> Succeed</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our platform is designed with your success in mind, offering comprehensive tools and resources for effective learning.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon: Icon, title, description, index }: FeatureCardProps) => (
  <div
    className="group p-6 lg:p-8 bg-card rounded-2xl border border-border/50 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:shadow-glow transition-shadow duration-300">
      <Icon className="w-7 h-7 text-primary-foreground" />
    </div>
    <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </div>
);
