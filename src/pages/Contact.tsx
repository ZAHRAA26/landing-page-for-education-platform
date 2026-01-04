import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  HelpCircle, 
  FileText,
  Send,
  Building2
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: t("contact.messageSent"),
      description: t("contact.messageSuccess"),
    });
    
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const offices = [
    {
      city: isRTL ? "سان فرانسيسكو" : "San Francisco",
      address: "100 Market Street, Suite 500",
      phone: "+1 (415) 555-0123",
      hours: isRTL ? "الإثنين-الجمعة: 9 صباحاً - 6 مساءً PST" : "Mon-Fri: 9AM - 6PM PST"
    },
    {
      city: isRTL ? "نيويورك" : "New York",
      address: "350 Fifth Avenue, 21st Floor",
      phone: "+1 (212) 555-0456",
      hours: isRTL ? "الإثنين-الجمعة: 9 صباحاً - 6 مساءً EST" : "Mon-Fri: 9AM - 6PM EST"
    },
    {
      city: isRTL ? "لندن" : "London",
      address: "1 Canada Square, Canary Wharf",
      phone: "+44 20 7946 0958",
      hours: isRTL ? "الإثنين-الجمعة: 9 صباحاً - 6 مساءً GMT" : "Mon-Fri: 9AM - 6PM GMT"
    }
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: t("contact.liveChat"),
      description: t("contact.liveChatDesc"),
      action: t("contact.startChat"),
      available: t("contact.available247")
    },
    {
      icon: HelpCircle,
      title: t("contact.helpCenter"),
      description: t("contact.helpCenterDesc"),
      action: t("contact.visitHelpCenter"),
      available: t("contact.selfService")
    },
    {
      icon: FileText,
      title: t("contact.documentation"),
      description: t("contact.documentationDesc"),
      action: t("contact.viewDocs"),
      available: t("contact.alwaysAvailable")
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            {t("contact.badge")}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {t("contact.heroTitle1")}{" "}
            <span className="gradient-text">{t("contact.heroTitle2")}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("contact.heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-border/50 shadow-card">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">{t("contact.sendMessage")}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("contact.fullName")}</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder={isRTL ? "محمد أحمد" : "John Doe"}
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("contact.emailAddress")}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={isRTL ? "mohamed@example.com" : "john@example.com"}
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">{t("contact.subject")}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder={t("contact.subjectPlaceholder")}
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">{t("contact.message")}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t("contact.messagePlaceholder")}
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      t("contact.sending")
                    ) : (
                      <>
                        <Send className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        {t("contact.send")}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">{t("contact.quickContact")}</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50">
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{t("contact.emailUs")}</h3>
                      <p className="text-muted-foreground">support@learnhub.com</p>
                      <p className="text-sm text-muted-foreground">{t("contact.weRespond")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50">
                    <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{t("contact.callUs")}</h3>
                      <p className="text-muted-foreground">+1 (800) 123-4567</p>
                      <p className="text-sm text-muted-foreground">{t("contact.callHours")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Options */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">{t("contact.supportOptions")}</h2>
                <div className="space-y-4">
                  {supportOptions.map((option, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                        <option.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{option.title}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                      <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                        {option.available}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("contact.ourOffices")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("contact.officesSubtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <Card key={index} className="border-border/50 hover:shadow-card transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{office.city}</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <MapPin className="w-4 h-4 mt-1 shrink-0" />
                      <span className="text-sm">{office.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Phone className="w-4 h-4 shrink-0" />
                      <span className="text-sm">{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span className="text-sm">{office.hours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;