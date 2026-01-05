import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Heart,
  Twitter,
  Linkedin,
  Facebook
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const BlogPost = () => {
  const { id } = useParams();
  const { t, language, isRTL } = useLanguage();

  const articles = [
    {
      id: "1",
      title: language === "ar" ? "10 مهارات أساسية يجب على كل مطور إتقانها في 2024" : "10 Essential Skills Every Developer Should Master in 2024",
      excerpt: language === "ar" ? "اكتشف أكثر مهارات البرمجة طلباً التي ستساعدك على البقاء في المقدمة في صناعة التكنولوجيا وتطوير حياتك المهنية." : "Discover the most in-demand programming skills that will help you stay ahead in the tech industry and advance your career.",
      category: language === "ar" ? "المهنة" : "Career",
      author: {
        name: language === "ar" ? "سارة جونسون" : "Sarah Johnson",
        role: language === "ar" ? "كاتبة تقنية أولى" : "Senior Tech Writer",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
      },
      date: language === "ar" ? "20 ديسمبر 2024" : "Dec 20, 2024",
      readTime: language === "ar" ? "8 دقيقة قراءة" : "8 min read",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop",
      content: language === "ar" ? `
        <p>صناعة التكنولوجيا تتطور باستمرار، والبقاء في المقدمة يعني تحديث مهاراتك باستمرار. في 2024، يواجه المطورون تحديات وفرص جديدة تتطلب مجموعة متنوعة من القدرات.</p>
        
        <h2>1. الحوسبة السحابية و DevOps</h2>
        <p>فهم المنصات السحابية مثل AWS و Azure و Google Cloud لم يعد اختيارياً. بالاقتران مع ممارسات DevOps، تمكن هذه المهارات من دورات نشر أسرع وتطبيقات أكثر موثوقية.</p>
        
        <h2>2. تكامل الذكاء الاصطناعي وتعلم الآلة</h2>
        <p>حتى لو لم تكن عالم بيانات، فإن فهم كيفية دمج أدوات وواجهات الذكاء الاصطناعي في التطبيقات أصبح ضرورياً. من الروبوتات الدردشة إلى أنظمة التوصية، الذكاء الاصطناعي في كل مكان.</p>
        
        <h2>3. أساسيات الأمن السيبراني</h2>
        <p>مع تزايد التهديدات السيبرانية، يحتاج كل مطور إلى فهم أفضل ممارسات الأمان. يشمل ذلك البرمجة الآمنة وأنظمة المصادقة وحماية البيانات.</p>
        
        <h2>الخلاصة</h2>
        <p>إتقان هذه المهارات يستغرق وقتاً وتفانياً، لكن الاستثمار يؤتي ثماره في النمو المهني والرضا الوظيفي. ابدأ بأضعف مجالاتك وابنِ من هناك.</p>
      ` : `
        <p>The tech industry is constantly evolving, and staying relevant means continuously updating your skill set. In 2024, developers face new challenges and opportunities that require a diverse range of abilities.</p>
        
        <h2>1. Cloud Computing & DevOps</h2>
        <p>Understanding cloud platforms like AWS, Azure, and Google Cloud is no longer optional. Combined with DevOps practices, these skills enable faster deployment cycles and more reliable applications.</p>
        
        <h2>2. AI & Machine Learning Integration</h2>
        <p>Even if you're not a data scientist, understanding how to integrate AI tools and APIs into applications is becoming essential. From chatbots to recommendation systems, AI is everywhere.</p>
        
        <h2>3. Cybersecurity Fundamentals</h2>
        <p>With increasing cyber threats, every developer needs to understand security best practices. This includes secure coding, authentication systems, and data protection.</p>
        
        <h2>Conclusion</h2>
        <p>Mastering these skills takes time and dedication, but the investment pays off in career growth and job satisfaction. Start with your weakest areas and build from there.</p>
      `
    },
    {
      id: "2",
      title: language === "ar" ? "كيف تبني أول نموذج تعلم آلة لك" : "How to Build Your First Machine Learning Model",
      excerpt: language === "ar" ? "دليل صديق للمبتدئين لفهم مفاهيم تعلم الآلة وبناء أول نموذج تنبؤي من الصفر." : "A beginner-friendly guide to understanding machine learning concepts and building your first predictive model from scratch.",
      category: language === "ar" ? "الذكاء الاصطناعي" : "AI & ML",
      author: {
        name: language === "ar" ? "د. مايكل تشين" : "Dr. Michael Chen",
        role: language === "ar" ? "رئيس أبحاث الذكاء الاصطناعي" : "AI Research Lead",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
      },
      date: language === "ar" ? "18 ديسمبر 2024" : "Dec 18, 2024",
      readTime: language === "ar" ? "12 دقيقة قراءة" : "12 min read",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop",
      content: language === "ar" ? `
        <p>قد يبدو تعلم الآلة مخيفاً، لكن مع النهج الصحيح، يمكن لأي شخص بناء أول نموذج له. سيرشدك هذا الدليل عبر الأساسيات.</p>
        
        <h2>فهم الأساسيات</h2>
        <p>تعلم الآلة يتعلق بتعليم أجهزة الكمبيوتر التعلم من البيانات. بدلاً من البرمجة الصريحة، نوفر أمثلة وندع الخوارزميات تجد الأنماط.</p>
        
        <h2>الخلاصة</h2>
        <p>بناء أول نموذج تعلم آلة لك هو إنجاز. استمر في التجربة، وتعلم من الإخفاقات، وتعامل تدريجياً مع مشاكل أكثر تعقيداً.</p>
      ` : `
        <p>Machine learning might seem intimidating, but with the right approach, anyone can build their first model. This guide will walk you through the fundamentals.</p>
        
        <h2>Understanding the Basics</h2>
        <p>Machine learning is about teaching computers to learn from data. Instead of explicit programming, we provide examples and let algorithms find patterns.</p>
        
        <h2>Conclusion</h2>
        <p>Building your first ML model is a milestone. Keep experimenting, learn from failures, and gradually tackle more complex problems.</p>
      `
    },
    {
      id: "3",
      title: language === "ar" ? "مستقبل التعلم عن بُعد: اتجاهات يجب مراقبتها" : "The Future of Remote Learning: Trends to Watch",
      excerpt: language === "ar" ? "استكشف الاتجاهات الناشئة في التعليم عبر الإنترنت وكيف تعيد التكنولوجيا تشكيل طريقة تعلمنا وتعليمنا." : "Explore emerging trends in online education and how technology is reshaping the way we learn and teach.",
      category: language === "ar" ? "التعليم" : "Education",
      author: {
        name: language === "ar" ? "إيميلي رودريغيز" : "Emily Rodriguez",
        role: language === "ar" ? "أخصائية تعليم" : "Education Specialist",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
      },
      date: language === "ar" ? "15 ديسمبر 2024" : "Dec 15, 2024",
      readTime: language === "ar" ? "6 دقيقة قراءة" : "6 min read",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop",
      content: language === "ar" ? `
        <p>تحول التعلم عن بُعد من ضرورة إلى خيار مفضل للملايين. دعنا نستكشف الاتجاهات التي تشكل مستقبله.</p>
        
        <h2>التخصيص المدعوم بالذكاء الاصطناعي</h2>
        <p>تستخدم منصات التعلم التكيفية الذكاء الاصطناعي لتخصيص المحتوى بناءً على التقدم الفردي وأسلوب التعلم والسرعة.</p>
        
        <h2>الخلاصة</h2>
        <p>مستقبل التعليم مرن ومخصص ومعزز بالتكنولوجيا. احتضن هذه الاتجاهات للبقاء في المقدمة.</p>
      ` : `
        <p>Remote learning has transformed from a necessity to a preferred choice for millions. Let's explore the trends shaping its future.</p>
        
        <h2>AI-Powered Personalization</h2>
        <p>Adaptive learning platforms use AI to customize content based on individual progress, learning style, and pace.</p>
        
        <h2>Conclusion</h2>
        <p>The future of education is flexible, personalized, and technology-enhanced. Embrace these trends to stay ahead.</p>
      `
    },
    {
      id: "4",
      title: language === "ar" ? "إتقان React: أنماط متقدمة وأفضل الممارسات" : "Mastering React: Advanced Patterns and Best Practices",
      excerpt: language === "ar" ? "طور مهاراتك في React مع أنماط المكونات المتقدمة وتقنيات تحسين الأداء و hooks الحديثة." : "Level up your React skills with advanced component patterns, performance optimization techniques, and modern hooks.",
      category: language === "ar" ? "التطوير" : "Development",
      author: {
        name: language === "ar" ? "أليكس طومسون" : "Alex Thompson",
        role: language === "ar" ? "مهندس واجهات أمامية" : "Frontend Architect",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
      },
      date: language === "ar" ? "12 ديسمبر 2024" : "Dec 12, 2024",
      readTime: language === "ar" ? "15 دقيقة قراءة" : "15 min read",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
      content: language === "ar" ? `
        <p>نضجت React بشكل كبير، وإتقان الأنماط المتقدمة يفصل المطورين الجيدين عن الممتازين.</p>
        
        <h2>المكونات المركبة</h2>
        <p>يسمح هذا النمط للمكونات بالعمل معاً مع الحفاظ على المرونة.</p>
        
        <h2>الخلاصة</h2>
        <p>هذه الأنماط تستغرق وقتاً لإتقانها لكنها تحسن جودة الكود وتجربة المطور بشكل كبير.</p>
      ` : `
        <p>React has matured significantly, and mastering advanced patterns separates good developers from great ones.</p>
        
        <h2>Compound Components</h2>
        <p>This pattern allows components to work together while maintaining flexibility.</p>
        
        <h2>Conclusion</h2>
        <p>These patterns take time to master but dramatically improve code quality and developer experience.</p>
      `
    },
    {
      id: "5",
      title: language === "ar" ? "لماذا المهارات الشخصية أهم من أي وقت مضى في التقنية" : "Why Soft Skills Matter More Than Ever in Tech",
      excerpt: language === "ar" ? "المهارات التقنية تحصل لك على الوظيفة، لكن المهارات الشخصية تساعدك على النجاح. تعلم كيفية تطوير التواصل والقيادة والعمل الجماعي." : "Technical skills get you hired, but soft skills help you thrive. Learn how to develop communication, leadership, and teamwork.",
      category: language === "ar" ? "المهنة" : "Career",
      author: {
        name: language === "ar" ? "جيسيكا بارك" : "Jessica Park",
        role: language === "ar" ? "مدربة مهنية" : "Career Coach",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop"
      },
      date: language === "ar" ? "10 ديسمبر 2024" : "Dec 10, 2024",
      readTime: language === "ar" ? "7 دقيقة قراءة" : "7 min read",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=600&fit=crop",
      content: language === "ar" ? `
        <p>في صناعة مهووسة بالمهارات التقنية، غالباً ما تحدد المهارات الشخصية النجاح المهني.</p>
        
        <h2>التواصل</h2>
        <p>التواصل الواضح يسد الفجوة بين أصحاب المصلحة التقنيين وغير التقنيين.</p>
        
        <h2>الخلاصة</h2>
        <p>استثمر في المهارات الشخصية إلى جانب التقنية. إنها المضاعف الذي يسرع حياتك المهنية.</p>
      ` : `
        <p>In an industry obsessed with technical skills, soft skills often determine career success.</p>
        
        <h2>Communication</h2>
        <p>Clear communication bridges the gap between technical and non-technical stakeholders.</p>
        
        <h2>Conclusion</h2>
        <p>Invest in soft skills alongside technical ones. They're the multiplier that accelerates your career.</p>
      `
    },
    {
      id: "6",
      title: language === "ar" ? "مقدمة في الحوسبة السحابية للمبتدئين" : "Introduction to Cloud Computing for Beginners",
      excerpt: language === "ar" ? "فهم البنية التحتية السحابية والخدمات وكيفية الاستفادة من AWS و Azure و Google Cloud لمشاريعك." : "Understanding cloud infrastructure, services, and how to leverage AWS, Azure, and Google Cloud for your projects.",
      category: language === "ar" ? "السحابة" : "Cloud",
      author: {
        name: language === "ar" ? "ديفيد كيم" : "David Kim",
        role: language === "ar" ? "مهندس حلول سحابية" : "Cloud Solutions Architect",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
      },
      date: language === "ar" ? "8 ديسمبر 2024" : "Dec 8, 2024",
      readTime: language === "ar" ? "10 دقيقة قراءة" : "10 min read",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
      content: language === "ar" ? `
        <p>أحدثت الحوسبة السحابية ثورة في كيفية بناء ونشر التطبيقات. إليك مقدمتك لهذه التكنولوجيا الأساسية.</p>
        
        <h2>ما هي الحوسبة السحابية؟</h2>
        <p>الحوسبة السحابية تقدم خدمات الحوسبة عبر الإنترنت، مما يوفر ابتكاراً أسرع وموارد مرنة.</p>
        
        <h2>الخلاصة</h2>
        <p>مهارات السحابة ضرورية للمطورين الحديثين. ابدأ التعلم اليوم وافتح فرصاً مهنية جديدة.</p>
      ` : `
        <p>Cloud computing has revolutionized how we build and deploy applications. Here's your introduction to this essential technology.</p>
        
        <h2>What is Cloud Computing?</h2>
        <p>Cloud computing delivers computing services over the internet, offering faster innovation and flexible resources.</p>
        
        <h2>Conclusion</h2>
        <p>Cloud skills are essential for modern developers. Start learning today and open new career opportunities.</p>
      `
    }
  ];

  const relatedArticles = [
    {
      id: "4",
      title: language === "ar" ? "إتقان React: أنماط متقدمة" : "Mastering React: Advanced Patterns",
      category: language === "ar" ? "التطوير" : "Development",
      readTime: language === "ar" ? "15 دقيقة قراءة" : "15 min read",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop"
    },
    {
      id: "5",
      title: language === "ar" ? "لماذا المهارات الشخصية مهمة في التقنية" : "Why Soft Skills Matter in Tech",
      category: language === "ar" ? "المهنة" : "Career",
      readTime: language === "ar" ? "7 دقيقة قراءة" : "7 min read",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=200&fit=crop"
    },
    {
      id: "6",
      title: language === "ar" ? "مقدمة في الحوسبة السحابية" : "Introduction to Cloud Computing",
      category: language === "ar" ? "السحابة" : "Cloud",
      readTime: language === "ar" ? "10 دقيقة قراءة" : "10 min read",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop"
    }
  ];

  const article = articles.find(a => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-16 px-4 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">{t("blogPost.articleNotFound")}</h1>
          <Button asChild>
            <Link to="/blog">{t("blogPost.backToBlog")}</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "rtl" : "ltr"}`}>
      <Navbar />
      
      {/* Hero */}
      <section className="pt-24 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            {t("blogPost.backToBlog")}
          </Link>
          
          <Badge variant="secondary" className="mb-4">{article.category}</Badge>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">{article.excerpt}</p>
          
          {/* Author & Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={article.author.avatar} alt={article.author.name} />
                <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{article.author.name}</p>
                <p className="text-sm text-muted-foreground">{article.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3 mb-8">
            <Button variant="outline" size="sm">
              <Heart className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t("blogPost.like")}
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t("blogPost.save")}
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t("blogPost.share")}
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-4 mb-12">
        <div className="container mx-auto max-w-4xl">
          <div className="aspect-video rounded-2xl overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div className={`grid lg:grid-cols-[1fr_280px] gap-12 ${isRTL ? "lg:grid-cols-[280px_1fr]" : ""}`}>
            {/* Article Content */}
            <article 
              className={`prose prose-lg max-w-none 
                prose-headings:text-foreground prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                ${isRTL ? "order-2" : "order-1"}`}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Sidebar */}
            <aside className={`space-y-8 ${isRTL ? "order-1" : "order-2"}`}>
              {/* Share */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">{t("blogPost.shareArticle")}</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Facebook className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Related Articles */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">{t("blogPost.relatedArticles")}</h3>
                  <div className="space-y-4">
                    {relatedArticles.filter(a => a.id !== id).slice(0, 3).map((related) => (
                      <Link 
                        key={related.id} 
                        to={`/blog/${related.id}`}
                        className="flex gap-3 group"
                      >
                        <img 
                          src={related.image} 
                          alt={related.title}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {related.title}
                          </p>
                          <span className="text-xs text-muted-foreground">{related.readTime}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;