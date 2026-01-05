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
import { useLanguage } from "@/contexts/LanguageContext";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t, isRTL } = useLanguage();

  const categories = [
    {
      icon: BookOpen,
      title: t("helpCenter.gettingStarted"),
      description: t("helpCenter.gettingStartedDesc"),
      articles: [
        t("helpCenter.article1"),
        t("helpCenter.article2"),
        t("helpCenter.article3"),
        t("helpCenter.article4")
      ]
    },
    {
      icon: PlayCircle,
      title: t("helpCenter.coursesLearning"),
      description: t("helpCenter.coursesLearningDesc"),
      articles: [
        t("helpCenter.article5"),
        t("helpCenter.article6"),
        t("helpCenter.article7"),
        t("helpCenter.article8")
      ]
    },
    {
      icon: CreditCard,
      title: t("helpCenter.paymentsBilling"),
      description: t("helpCenter.paymentsBillingDesc"),
      articles: [
        t("helpCenter.article9"),
        t("helpCenter.article10"),
        t("helpCenter.article11"),
        t("helpCenter.article12")
      ]
    },
    {
      icon: User,
      title: t("helpCenter.accountManagement"),
      description: t("helpCenter.accountManagementDesc"),
      articles: [
        t("helpCenter.article13"),
        t("helpCenter.article14"),
        t("helpCenter.article15"),
        t("helpCenter.article16")
      ]
    },
    {
      icon: Settings,
      title: t("helpCenter.technicalIssues"),
      description: t("helpCenter.technicalIssuesDesc"),
      articles: [
        t("helpCenter.article17"),
        t("helpCenter.article18"),
        t("helpCenter.article19"),
        t("helpCenter.article20")
      ]
    },
    {
      icon: MessageCircle,
      title: t("helpCenter.communitySupport"),
      description: t("helpCenter.communitySupportDesc"),
      articles: [
        t("helpCenter.article21"),
        t("helpCenter.article22"),
        t("helpCenter.article23"),
        t("helpCenter.article24")
      ]
    }
  ];

  const popularArticles = [
    t("helpCenter.popular1"),
    t("helpCenter.popular2"),
    t("helpCenter.popular3"),
    t("helpCenter.popular4"),
    t("helpCenter.popular5")
  ];

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "rtl" : "ltr"}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t("helpCenter.title")}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t("helpCenter.subtitle")}
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground`} />
              <Input
                type="text"
                placeholder={t("helpCenter.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${isRTL ? "pr-12" : "pl-12"} py-6 text-lg rounded-xl`}
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
              {t("helpCenter.popularArticles")}
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
              {t("helpCenter.browseByCategory")}
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
                          <ChevronRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
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
              {t("helpCenter.stillNeedHelp")}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t("helpCenter.supportTeam")}
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="p-6 bg-card rounded-2xl border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{t("helpCenter.emailUs")}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("helpCenter.emailResponse")}
                </p>
                <Button variant="outline" asChild>
                  <Link to="/contact">{t("helpCenter.sendEmail")}</Link>
                </Button>
              </div>
              <div className="p-6 bg-card rounded-2xl border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{t("helpCenter.liveChat")}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("helpCenter.chatRealTime")}
                </p>
                <Button variant="outline">{t("helpCenter.startChat")}</Button>
              </div>
              <div className="p-6 bg-card rounded-2xl border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{t("helpCenter.callUs")}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("helpCenter.callHours")}
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