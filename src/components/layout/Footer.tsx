import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = {
    platform: {
      title: t("footer.platform"),
      links: [
        { label: t("footer.allCourses"), href: "/courses" },
        { label: t("footer.becomeInstructor"), href: "/become-instructor" },
        { label: t("footer.enterprise"), href: "/enterprise" },
        { label: t("footer.mobileApp"), href: "/mobile-app" },
      ],
    },
    company: {
      title: t("footer.company"),
      links: [
        { label: t("footer.aboutUs"), href: "/about" },
        { label: t("footer.careers"), href: "/careers" },
        { label: t("footer.press"), href: "/press" },
        { label: t("nav.blog"), href: "/blog" },
      ],
    },
    support: {
      title: t("footer.support"),
      links: [
        { label: t("footer.helpCenter"), href: "/help" },
        { label: t("footer.contactUs"), href: "/contact" },
        { label: t("footer.privacy"), href: "/privacy" },
        { label: t("footer.terms"), href: "/terms" },
      ],
    },
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-foreground text-background py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-background">
                Edu<span className="text-primary">Learn</span>
              </span>
            </a>
            <p className="text-background/70 mb-6 max-w-sm">
              {t("footer.description")}
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-background mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-background/70 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10 flex flex-col lg:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} EduLearn. {t("footer.rights")}
          </p>
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="text-background/60 hover:text-background transition-colors">
              {t("footer.privacy")}
            </a>
            <a href="/terms" className="text-background/60 hover:text-background transition-colors">
              {t("footer.terms")}
            </a>
            <a href="/cookies" className="text-background/60 hover:text-background transition-colors">
              {t("footer.cookies")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
