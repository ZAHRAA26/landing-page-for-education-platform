import { BookOpen, Award, Users, Zap, Clock, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: BookOpen,
      title: t("features.expertCourses"),
      description: t("features.expertCoursesDesc"),
    },
    {
      icon: Zap,
      title: t("features.interactive"),
      description: t("features.interactiveDesc"),
    },
    {
      icon: Clock,
      title: t("features.pace"),
      description: t("features.paceDesc"),
    },
    {
      icon: Award,
      title: t("features.certificates"),
      description: t("features.certificatesDesc"),
    },
    {
      icon: Users,
      title: t("features.community"),
      description: t("features.communityDesc"),
    },
    {
      icon: Shield,
      title: t("features.lifetime"),
      description: t("features.lifetimeDesc"),
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t("features.badge")}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t("features.title1")}
            <span className="text-gradient">{t("features.title2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("features.subtitle")}
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
