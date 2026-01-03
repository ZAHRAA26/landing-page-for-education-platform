import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Star, Users, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const HeroSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative min-h-screen gradient-hero pt-24 lg:pt-32 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 start-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 end-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up opacity-0">
              <Star className="w-4 h-4 fill-current" />
              <span>{t("hero.badge")}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.5] lg:leading-[1.5] text-foreground mb-6 animate-fade-up opacity-0 stagger-1">
              {t("hero.title1")}
              <span className="block text-gradient">{t("hero.title2")}</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-up opacity-0 stagger-2">
              {t("hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-fade-up opacity-0 stagger-3">
              <Button variant="hero" size="xl" asChild>
                <Link to="/auth">
                  {t("hero.cta1")}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl">
                <Play className="w-5 h-5" />
                {t("hero.cta2")}
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 lg:gap-10 justify-center lg:justify-start animate-fade-up opacity-0 stagger-4">
              <StatItem icon={<Users className="w-5 h-5" />} value="2M+" label={t("hero.stats.students")} />
              <StatItem icon={<BookOpen className="w-5 h-5" />} value="500+" label={t("hero.stats.courses")} />
              <StatItem icon={<Star className="w-5 h-5" />} value="4.9" label={t("hero.stats.rating")} />
            </div>
          </div>

          {/* Right Content - Hero Image/Illustration */}
          <div className="relative lg:ps-8 animate-scale-in opacity-0">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-card rounded-2xl shadow-card p-6 lg:p-8 border border-border/50">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-glow cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-primary-foreground ms-1" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Introduction to Web Development</h3>
                <p className="text-muted-foreground text-sm mb-4">Learn the fundamentals of modern web development</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2 rtl:space-x-reverse">
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
              <div className="absolute -top-4 -end-4 bg-card rounded-xl shadow-card p-4 border border-border/50 animate-float hidden lg:block">
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

              <div className="absolute -bottom-4 -start-4 bg-card rounded-xl shadow-card p-4 border border-border/50 animate-float hidden lg:block" style={{ animationDelay: '-2s' }}>
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
