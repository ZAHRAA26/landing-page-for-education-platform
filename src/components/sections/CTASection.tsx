import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const CTASection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="relative bg-card rounded-3xl p-8 lg:p-16 border border-border/50 shadow-card overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 end-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 start-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              {t("cta.title1")}
              <span className="text-gradient block mt-2">{t("cta.title2")}</span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/auth">
                  {t("cta.button1")}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/courses">{t("cta.button2")}</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              {t("cta.note")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
