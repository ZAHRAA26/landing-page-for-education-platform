import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Navbar
    "nav.courses": "Courses",
    "nav.blog": "Blog",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.login": "Log In",
    "nav.getStarted": "Get Started Free",
    
    // Hero
    "hero.badge": "🎓 Trusted by 2M+ learners worldwide",
    "hero.title1": "Master New Skills",
    "hero.title2": "Transform Your Future",
    "hero.subtitle": "Join thousands of learners advancing their careers with expert-led courses in technology, business, and creative skills.",
    "hero.cta1": "Start Learning Free",
    "hero.cta2": "Watch Demo",
    "hero.stats.students": "Active Students",
    "hero.stats.courses": "Courses",
    "hero.stats.rating": "Rating",
    
    // Stats Section
    "stats.students": "Active Students",
    "stats.courses": "Expert Courses",
    "stats.countries": "Countries",
    "stats.success": "Success Rate",
    
    // Features
    "features.badge": "Why Choose Us",
    "features.title1": "Everything You Need to",
    "features.title2": " Succeed",
    "features.subtitle": "Our platform is designed with your success in mind, offering comprehensive tools and resources for effective learning.",
    "features.expertCourses": "Expert-Led Courses",
    "features.expertCoursesDesc": "Learn from industry professionals and thought leaders who bring real-world experience to every lesson.",
    "features.interactive": "Interactive Learning",
    "features.interactiveDesc": "Engage with hands-on projects, quizzes, and coding exercises that reinforce your knowledge.",
    "features.pace": "Learn at Your Pace",
    "features.paceDesc": "Access courses anytime, anywhere. Our flexible platform adapts to your schedule and learning style.",
    "features.certificates": "Earn Certificates",
    "features.certificatesDesc": "Showcase your achievements with industry-recognized certificates upon course completion.",
    "features.community": "Community Support",
    "features.communityDesc": "Join a global community of learners. Collaborate, discuss, and grow together.",
    "features.lifetime": "Lifetime Access",
    "features.lifetimeDesc": "Purchase once, learn forever. Get lifetime access to all course materials and future updates.",
    
    // Courses
    "courses.badge": "Popular Courses",
    "courses.title1": "Explore Our",
    "courses.title2": " Top Courses",
    "courses.subtitle": "Discover hand-picked courses designed to help you achieve your learning goals and advance your career.",
    "courses.viewAll": "View All Courses",
    "courses.enroll": "Enroll Now",
    "courses.students": "students",
    
    // CTA
    "cta.title1": "Ready to Start Your",
    "cta.title2": "Learning Journey?",
    "cta.subtitle": "Join over 2 million learners worldwide and take the first step towards achieving your goals. Start learning for free today.",
    "cta.button1": "Get Started For Free",
    "cta.button2": "Browse Courses",
    "cta.note": "No credit card required • Free forever plan available",
    
    // Footer
    "footer.description": "Empowering learners worldwide with high-quality education and expert-led courses.",
    "footer.platform": "Platform",
    "footer.company": "Company",
    "footer.support": "Support",
    "footer.allCourses": "All Courses",
    "footer.enterprise": "Enterprise",
    "footer.becomeInstructor": "Become Instructor",
    "footer.mobileApp": "Mobile App",
    "footer.aboutUs": "About Us",
    "footer.careers": "Careers",
    "footer.press": "Press",
    "footer.helpCenter": "Help Center",
    "footer.contactUs": "Contact Us",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.cookies": "Cookies",
    "footer.rights": "All rights reserved.",
  },
  ar: {
    // Navbar
    "nav.courses": "الدورات",
    "nav.blog": "المدونة",
    "nav.about": "من نحن",
    "nav.contact": "اتصل بنا",
    "nav.login": "تسجيل الدخول",
    "nav.getStarted": "ابدأ مجاناً",
    
    // Hero
    "hero.badge": "🎓 موثوق به من قبل 2 مليون+ متعلم حول العالم",
    "hero.title1": "اتقن مهارات جديدة",
    "hero.title2": "غيّر مستقبلك",
    "hero.subtitle": "انضم إلى آلاف المتعلمين الذين يطورون حياتهم المهنية من خلال دورات يقودها خبراء في التكنولوجيا والأعمال والمهارات الإبداعية.",
    "hero.cta1": "ابدأ التعلم مجاناً",
    "hero.cta2": "شاهد العرض",
    "hero.stats.students": "طالب نشط",
    "hero.stats.courses": "دورة",
    "hero.stats.rating": "تقييم",
    
    // Stats Section
    "stats.students": "طالب نشط",
    "stats.courses": "دورة متخصصة",
    "stats.countries": "دولة",
    "stats.success": "نسبة النجاح",
    
    // Features
    "features.badge": "لماذا تختارنا",
    "features.title1": "كل ما تحتاجه",
    "features.title2": " للنجاح",
    "features.subtitle": "منصتنا مصممة لنجاحك، تقدم أدوات وموارد شاملة للتعلم الفعال.",
    "features.expertCourses": "دورات يقودها خبراء",
    "features.expertCoursesDesc": "تعلم من محترفين في الصناعة وقادة الفكر الذين يجلبون خبرة حقيقية لكل درس.",
    "features.interactive": "تعلم تفاعلي",
    "features.interactiveDesc": "شارك في مشاريع عملية واختبارات وتمارين برمجية تعزز معرفتك.",
    "features.pace": "تعلم بسرعتك",
    "features.paceDesc": "الوصول إلى الدورات في أي وقت وأي مكان. منصتنا المرنة تتكيف مع جدولك وأسلوب تعلمك.",
    "features.certificates": "احصل على شهادات",
    "features.certificatesDesc": "اعرض إنجازاتك بشهادات معترف بها في الصناعة عند إتمام الدورة.",
    "features.community": "دعم المجتمع",
    "features.communityDesc": "انضم إلى مجتمع عالمي من المتعلمين. تعاون وناقش وتطور معاً.",
    "features.lifetime": "وصول مدى الحياة",
    "features.lifetimeDesc": "اشترِ مرة واحدة، تعلم للأبد. احصل على وصول مدى الحياة لجميع مواد الدورة والتحديثات المستقبلية.",
    
    // Courses
    "courses.badge": "الدورات الشائعة",
    "courses.title1": "اكتشف",
    "courses.title2": " أفضل دوراتنا",
    "courses.subtitle": "اكتشف دورات مختارة بعناية مصممة لمساعدتك على تحقيق أهدافك التعليمية وتطوير حياتك المهنية.",
    "courses.viewAll": "عرض جميع الدورات",
    "courses.enroll": "سجل الآن",
    "courses.students": "طالب",
    
    // CTA
    "cta.title1": "مستعد لبدء",
    "cta.title2": "رحلة التعلم؟",
    "cta.subtitle": "انضم إلى أكثر من 2 مليون متعلم حول العالم واتخذ الخطوة الأولى نحو تحقيق أهدافك. ابدأ التعلم مجاناً اليوم.",
    "cta.button1": "ابدأ مجاناً",
    "cta.button2": "تصفح الدورات",
    "cta.note": "لا حاجة لبطاقة ائتمان • خطة مجانية للأبد متاحة",
    
    // Footer
    "footer.description": "تمكين المتعلمين حول العالم بتعليم عالي الجودة ودورات يقودها خبراء.",
    "footer.platform": "المنصة",
    "footer.company": "الشركة",
    "footer.support": "الدعم",
    "footer.allCourses": "جميع الدورات",
    "footer.enterprise": "للمؤسسات",
    "footer.becomeInstructor": "كن مدرباً",
    "footer.mobileApp": "تطبيق الجوال",
    "footer.aboutUs": "من نحن",
    "footer.careers": "الوظائف",
    "footer.press": "الصحافة",
    "footer.helpCenter": "مركز المساعدة",
    "footer.contactUs": "اتصل بنا",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الخدمة",
    "footer.cookies": "ملفات تعريف الارتباط",
    "footer.rights": "جميع الحقوق محفوظة.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  const isRTL = language === "ar";

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
