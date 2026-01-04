import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Search, 
  Star, 
  Clock, 
  Users, 
  ChevronDown
} from "lucide-react";

const Courses = () => {
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");

  const allCourses = [
    {
      id: 1,
      title: isRTL ? "بوتكامب تطوير الويب الكامل" : "Complete Web Development Bootcamp",
      category: "Development",
      categoryLabel: t("coursesPage.development"),
      instructor: isRTL ? "سارة جونسون" : "Sarah Johnson",
      rating: 4.9,
      students: 12500,
      duration: isRTL ? "48 ساعة" : "48 hours",
      price: 89,
      originalPrice: 199,
      image: "from-primary/30 to-accent/20",
      badge: t("coursesPage.bestseller"),
      level: isRTL ? "مبتدئ" : "Beginner",
      levelKey: "Beginner",
    },
    {
      id: 2,
      title: isRTL ? "علم البيانات وتعلم الآلة" : "Data Science & Machine Learning",
      category: "Data Science",
      categoryLabel: t("coursesPage.dataScience"),
      instructor: isRTL ? "مايكل تشين" : "Michael Chen",
      rating: 4.8,
      students: 8900,
      duration: isRTL ? "52 ساعة" : "52 hours",
      price: 99,
      originalPrice: 249,
      image: "from-accent/30 to-primary/20",
      badge: t("coursesPage.hot"),
      level: isRTL ? "متوسط" : "Intermediate",
      levelKey: "Intermediate",
    },
    {
      id: 3,
      title: isRTL ? "ماستركلاس تصميم UI/UX" : "UI/UX Design Masterclass",
      category: "Design",
      categoryLabel: t("coursesPage.design"),
      instructor: isRTL ? "إيما ويليامز" : "Emma Williams",
      rating: 4.9,
      students: 6700,
      duration: isRTL ? "36 ساعة" : "36 hours",
      price: 79,
      originalPrice: 179,
      image: "from-primary/20 to-accent/30",
      badge: t("coursesPage.new"),
      level: isRTL ? "مبتدئ" : "Beginner",
      levelKey: "Beginner",
    },
    {
      id: 4,
      title: isRTL ? "استراتيجية التسويق الرقمي" : "Digital Marketing Strategy",
      category: "Marketing",
      categoryLabel: t("coursesPage.marketing"),
      instructor: isRTL ? "ديفيد براون" : "David Brown",
      rating: 4.7,
      students: 5400,
      duration: isRTL ? "28 ساعة" : "28 hours",
      price: 69,
      originalPrice: 149,
      image: "from-accent/20 to-primary/30",
      level: isRTL ? "مبتدئ" : "Beginner",
      levelKey: "Beginner",
    },
    {
      id: 5,
      title: isRTL ? "دورة React و Next.js المتقدمة" : "React & Next.js Advanced Course",
      category: "Development",
      categoryLabel: t("coursesPage.development"),
      instructor: isRTL ? "أليكس طومسون" : "Alex Thompson",
      rating: 4.9,
      students: 7800,
      duration: isRTL ? "42 ساعة" : "42 hours",
      price: 109,
      originalPrice: 229,
      image: "from-primary/25 to-accent/25",
      badge: t("coursesPage.popular"),
      level: isRTL ? "متقدم" : "Advanced",
      levelKey: "Advanced",
    },
    {
      id: 6,
      title: isRTL ? "بايثون للمبتدئين" : "Python for Beginners",
      category: "Development",
      categoryLabel: t("coursesPage.development"),
      instructor: isRTL ? "ليزا بارك" : "Lisa Park",
      rating: 4.8,
      students: 15200,
      duration: isRTL ? "32 ساعة" : "32 hours",
      price: 59,
      originalPrice: 129,
      image: "from-accent/25 to-primary/25",
      level: isRTL ? "مبتدئ" : "Beginner",
      levelKey: "Beginner",
    },
    {
      id: 7,
      title: isRTL ? "تطوير تطبيقات الجوال بـ Flutter" : "Mobile App Development with Flutter",
      category: "Development",
      categoryLabel: t("coursesPage.development"),
      instructor: isRTL ? "جيمس ويلسون" : "James Wilson",
      rating: 4.7,
      students: 4300,
      duration: isRTL ? "45 ساعة" : "45 hours",
      price: 89,
      originalPrice: 189,
      image: "from-primary/30 to-accent/15",
      level: isRTL ? "متوسط" : "Intermediate",
      levelKey: "Intermediate",
    },
    {
      id: 8,
      title: isRTL ? "أساسيات الأمن السيبراني" : "Cybersecurity Fundamentals",
      category: "IT & Security",
      categoryLabel: t("coursesPage.itSecurity"),
      instructor: isRTL ? "روبرت مارتينيز" : "Robert Martinez",
      rating: 4.8,
      students: 3900,
      duration: isRTL ? "38 ساعة" : "38 hours",
      price: 99,
      originalPrice: 219,
      image: "from-accent/15 to-primary/30",
      badge: t("coursesPage.new"),
      level: isRTL ? "مبتدئ" : "Beginner",
      levelKey: "Beginner",
    },
  ];

  const categories = [
    { key: "All", label: t("coursesPage.all") },
    { key: "Development", label: t("coursesPage.development") },
    { key: "Data Science", label: t("coursesPage.dataScience") },
    { key: "Design", label: t("coursesPage.design") },
    { key: "Marketing", label: t("coursesPage.marketing") },
    { key: "IT & Security", label: t("coursesPage.itSecurity") },
  ];

  const levels = [
    { key: "All Levels", label: t("coursesPage.allLevels") },
    { key: "Beginner", label: t("coursesPage.beginner") },
    { key: "Intermediate", label: t("coursesPage.intermediate") },
    { key: "Advanced", label: t("coursesPage.advanced") },
  ];

  const priceRanges = [
    { label: t("coursesPage.allPrices"), key: "All Prices", min: 0, max: Infinity },
    { label: t("coursesPage.under50"), key: "Under $50", min: 0, max: 49 },
    { label: "$50 - $79", key: "$50 - $79", min: 50, max: 79 },
    { label: "$80 - $99", key: "$80 - $99", min: 80, max: 99 },
    { label: "$100+", key: "$100+", min: 100, max: Infinity },
  ];

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All Levels" || course.levelKey === selectedLevel;
    const priceRange = priceRanges.find(p => p.key === selectedPriceRange);
    const matchesPrice = priceRange ? course.price >= priceRange.min && course.price <= priceRange.max : true;
    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 lg:pt-32 pb-12 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              {t("coursesPage.title")} <span className="text-gradient">{t("coursesPage.titleHighlight")}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t("coursesPage.subtitle")}
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground`} />
              <Input
                type="text"
                placeholder={t("coursesPage.searchPlaceholder")}
                className={`${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} h-14 text-base rounded-xl shadow-soft`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Courses */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-10 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {levels.map((level) => (
                    <option key={level.key} value={level.key}>{level.label}</option>
                  ))}
                </select>
                <ChevronDown className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none`} />
              </div>
              <div className="relative">
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-10 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {priceRanges.map((range) => (
                    <option key={range.key} value={range.key}>{range.label}</option>
                  ))}
                </select>
                <ChevronDown className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none`} />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            {t("coursesPage.showing")} <span className="font-semibold text-foreground">{filteredCourses.length}</span> {t("coursesPage.coursesCount")}
          </p>

          {/* Courses Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">{t("coursesPage.noCoursesFound")}</p>
              <Button variant="outline" onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedLevel("All Levels");
                setSelectedPriceRange("All Prices");
              }}>
                {t("coursesPage.clearFilters")}
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

interface CourseCardProps {
  id: number;
  title: string;
  categoryLabel: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  price: number;
  originalPrice: number;
  image: string;
  badge?: string;
  level: string;
}

const CourseCard = ({
  id,
  title,
  categoryLabel,
  instructor,
  rating,
  students,
  duration,
  price,
  originalPrice,
  image,
  badge,
  level,
}: CourseCardProps) => {
  const { t, isRTL } = useLanguage();
  
  return (
    <Link 
      to={`/courses/${id}`}
      className="group bg-card rounded-2xl border border-border/50 overflow-hidden shadow-soft hover:shadow-card hover:-translate-y-2 transition-all duration-300"
    >
      {/* Image */}
      <div className={`relative aspect-[4/3] bg-gradient-to-br ${image}`}>
        {badge && (
          <span className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold`}>
            {badge}
          </span>
        )}
        <span className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} px-2 py-1 rounded bg-background/80 backdrop-blur-sm text-xs font-medium`}>
          {level}
        </span>
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="text-xs font-medium text-primary uppercase tracking-wide">
          {categoryLabel}
        </span>
        <h3 className="text-lg font-bold text-foreground mt-2 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4">{t("coursesPage.by")} {instructor}</p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="font-medium text-foreground">{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">${price}</span>
            <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>
          </div>
          <Button size="sm" variant="default">
            {t("coursesPage.enroll")}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default Courses;