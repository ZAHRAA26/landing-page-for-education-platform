import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Clock, User, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Blog = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const articles = [
    {
      id: "1",
      title: language === "ar" ? "10 مهارات أساسية يجب على كل مطور إتقانها في 2024" : "10 Essential Skills Every Developer Should Master in 2024",
      excerpt: language === "ar" ? "اكتشف أكثر مهارات البرمجة طلباً التي ستساعدك على البقاء في المقدمة في صناعة التكنولوجيا وتطوير حياتك المهنية." : "Discover the most in-demand programming skills that will help you stay ahead in the tech industry and advance your career.",
      category: language === "ar" ? "المهنة" : "Career",
      author: language === "ar" ? "سارة جونسون" : "Sarah Johnson",
      date: language === "ar" ? "20 ديسمبر 2024" : "Dec 20, 2024",
      readTime: language === "ar" ? "8 دقائق قراءة" : "8 min read",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
      featured: true
    },
    {
      id: "2",
      title: language === "ar" ? "كيف تبني أول نموذج تعلم آلي لك" : "How to Build Your First Machine Learning Model",
      excerpt: language === "ar" ? "دليل مبسط لفهم مفاهيم التعلم الآلي وبناء أول نموذج تنبؤي من الصفر." : "A beginner-friendly guide to understanding machine learning concepts and building your first predictive model from scratch.",
      category: language === "ar" ? "الذكاء الاصطناعي" : "AI & ML",
      author: language === "ar" ? "د. مايكل تشن" : "Dr. Michael Chen",
      date: language === "ar" ? "18 ديسمبر 2024" : "Dec 18, 2024",
      readTime: language === "ar" ? "12 دقيقة قراءة" : "12 min read",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
      featured: true
    },
    {
      id: "3",
      title: language === "ar" ? "مستقبل التعلم عن بعد: اتجاهات يجب مراقبتها" : "The Future of Remote Learning: Trends to Watch",
      excerpt: language === "ar" ? "استكشف الاتجاهات الناشئة في التعليم عبر الإنترنت وكيف تعيد التكنولوجيا تشكيل طريقة تعلمنا وتعليمنا." : "Explore emerging trends in online education and how technology is reshaping the way we learn and teach.",
      category: language === "ar" ? "التعليم" : "Education",
      author: language === "ar" ? "إيميلي رودريغز" : "Emily Rodriguez",
      date: language === "ar" ? "15 ديسمبر 2024" : "Dec 15, 2024",
      readTime: language === "ar" ? "6 دقائق قراءة" : "6 min read",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      featured: false
    },
    {
      id: "4",
      title: language === "ar" ? "إتقان React: أنماط متقدمة وأفضل الممارسات" : "Mastering React: Advanced Patterns and Best Practices",
      excerpt: language === "ar" ? "طور مهاراتك في React مع أنماط المكونات المتقدمة وتقنيات تحسين الأداء والـ hooks الحديثة." : "Level up your React skills with advanced component patterns, performance optimization techniques, and modern hooks.",
      category: language === "ar" ? "التطوير" : "Development",
      author: language === "ar" ? "أليكس طومسون" : "Alex Thompson",
      date: language === "ar" ? "12 ديسمبر 2024" : "Dec 12, 2024",
      readTime: language === "ar" ? "15 دقيقة قراءة" : "15 min read",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
      featured: false
    },
    {
      id: "5",
      title: language === "ar" ? "لماذا المهارات الناعمة أهم من أي وقت مضى في التقنية" : "Why Soft Skills Matter More Than Ever in Tech",
      excerpt: language === "ar" ? "المهارات التقنية تحصل لك على وظيفة، لكن المهارات الناعمة تساعدك على النجاح. تعلم كيفية تطوير التواصل والقيادة والعمل الجماعي." : "Technical skills get you hired, but soft skills help you thrive. Learn how to develop communication, leadership, and teamwork.",
      category: language === "ar" ? "المهنة" : "Career",
      author: language === "ar" ? "جيسيكا بارك" : "Jessica Park",
      date: language === "ar" ? "10 ديسمبر 2024" : "Dec 10, 2024",
      readTime: language === "ar" ? "7 دقائق قراءة" : "7 min read",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop",
      featured: false
    },
    {
      id: "6",
      title: language === "ar" ? "مقدمة في الحوسبة السحابية للمبتدئين" : "Introduction to Cloud Computing for Beginners",
      excerpt: language === "ar" ? "فهم البنية التحتية السحابية والخدمات وكيفية الاستفادة من AWS و Azure و Google Cloud لمشاريعك." : "Understanding cloud infrastructure, services, and how to leverage AWS, Azure, and Google Cloud for your projects.",
      category: language === "ar" ? "السحابة" : "Cloud",
      author: language === "ar" ? "ديفيد كيم" : "David Kim",
      date: language === "ar" ? "8 ديسمبر 2024" : "Dec 8, 2024",
      readTime: language === "ar" ? "10 دقائق قراءة" : "10 min read",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
      featured: false
    }
  ];

  const categories = [
    { key: "All", label: t("blog.all") },
    { key: "Career", label: t("blog.career") },
    { key: "Development", label: t("blog.development") },
    { key: "AI & ML", label: t("blog.aiMl") },
    { key: "Education", label: t("blog.education") },
    { key: "Cloud", label: t("blog.cloud") },
  ];

  const getCategoryKey = (category: string) => {
    const mapping: Record<string, string> = {
      "المهنة": "Career",
      "التطوير": "Development",
      "الذكاء الاصطناعي": "AI & ML",
      "التعليم": "Education",
      "السحابة": "Cloud",
    };
    return mapping[category] || category;
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const articleCategoryKey = getCategoryKey(article.category);
    const matchesCategory = selectedCategory === "All" || articleCategoryKey === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = filteredArticles.filter(a => a.featured);
  const regularArticles = filteredArticles.filter(a => !a.featured);

  const getSelectedCategoryLabel = () => {
    const cat = categories.find(c => c.key === selectedCategory);
    return cat ? cat.label : selectedCategory;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            {t("blog.badge")}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {t("blog.title1")}<span className="gradient-text">{t("blog.title2")}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("blog.subtitle")}
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder={t("blog.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-4 px-4 border-b border-border/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.key)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-foreground mb-8">{t("blog.featured")}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Link key={article.id} to={`/blog/${article.id}`}>
                  <Card className="overflow-hidden border-border/50 hover:shadow-card transition-all duration-300 group h-full">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-3">{article.category}</Badge>
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {article.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {article.date}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            {selectedCategory === "All" ? t("blog.allArticles") : `${getSelectedCategoryLabel()} ${t("blog.articles")}`}
          </h2>
          {regularArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <Link key={article.id} to={`/blog/${article.id}`}>
                  <Card className="overflow-hidden border-border/50 hover:shadow-card transition-all duration-300 group h-full">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-5">
                      <Badge variant="secondary" className="mb-2 text-xs">{article.category}</Badge>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("blog.noArticles")}</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="gradient-primary p-8 md:p-12 text-center border-0">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t("blog.newsletter")}
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
              {t("blog.newsletterDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                placeholder={t("blog.emailPlaceholder")}
                className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary" className="shrink-0">
                {t("blog.subscribe")} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
