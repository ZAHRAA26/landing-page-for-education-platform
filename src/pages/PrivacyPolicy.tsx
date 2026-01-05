import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield, Lock, Eye, FileText, Users, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPolicy = () => {
  const { t, isRTL } = useLanguage();

  const sections = [
    {
      icon: FileText,
      title: t("privacy.section1Title"),
      content: t("privacy.section1Content")
    },
    {
      icon: Eye,
      title: t("privacy.section2Title"),
      content: t("privacy.section2Content")
    },
    {
      icon: Users,
      title: t("privacy.section3Title"),
      content: t("privacy.section3Content")
    },
    {
      icon: Lock,
      title: t("privacy.section4Title"),
      content: t("privacy.section4Content")
    },
    {
      icon: Globe,
      title: t("privacy.section5Title"),
      content: t("privacy.section5Content")
    },
    {
      icon: Shield,
      title: t("privacy.section6Title"),
      content: t("privacy.section6Content")
    }
  ];

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "rtl" : "ltr"}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t("privacy.title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("privacy.subtitle")}
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              {t("privacy.lastUpdated")}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="group">
                <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse text-right" : ""}`}>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      {section.title}
                    </h2>
                    <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Contact Section */}
            <div className={`mt-16 p-8 bg-muted/50 rounded-2xl ${isRTL ? "text-right" : ""}`}>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t("privacy.questions")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t("privacy.contactText")}
              </p>
              <p className="text-foreground font-medium">
                privacy@edulearn.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;