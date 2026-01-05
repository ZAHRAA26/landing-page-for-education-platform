import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Award, 
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Heart,
  Share2,
  PlayCircle,
  FileText,
  Download
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const CourseDetail = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const { t, isRTL, language } = useLanguage();

  // Mock course data with translations
  const courseData = {
    id: "1",
    title: language === "ar" 
      ? "معسكر تطوير الويب الكامل 2024" 
      : "Complete Web Development Bootcamp 2024",
    description: language === "ar"
      ? "أتقن HTML و CSS و JavaScript و React و Node.js و MongoDB. ابنِ مشاريع حقيقية وكن مطور full-stack جاهزاً لسوق العمل."
      : "Master HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and become a full-stack developer ready for the job market.",
    instructor: {
      name: language === "ar" ? "د. سارة ميتشل" : "Dr. Sarah Mitchell",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      title: language === "ar" ? "مهندسة برمجيات أولى" : "Senior Software Engineer",
      bio: language === "ar" 
        ? "د. سارة ميتشل مهندسة برمجيات خبيرة لديها أكثر من 15 عاماً من الخبرة في تطوير الويب. عملت في شركات تقنية كبرى مثل Google و Meta، وقد درّست أكثر من 500,000 طالب حول العالم."
        : "Dr. Sarah Mitchell is a seasoned software engineer with over 15 years of experience in web development. She has worked at top tech companies including Google and Meta, and has taught over 500,000 students worldwide.",
      courses: 12,
      students: 150000,
      rating: 4.9
    },
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.8,
    totalRatings: 12847,
    students: 45230,
    duration: language === "ar" ? "42 ساعة" : "42 hours",
    lectures: 320,
    level: language === "ar" ? "جميع المستويات" : "All Levels",
    language: language === "ar" ? "الإنجليزية" : "English",
    lastUpdated: language === "ar" ? "ديسمبر 2024" : "December 2024",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    videoPreview: "https://www.w3schools.com/html/mov_bbb.mp4",
    features: [
      t("courseDetail.hoursOnDemand").replace("hours", "42"),
      t("courseDetail.lecturesCovering").replace("lectures", "320"),
      "15 " + t("courseDetail.realWorldProjects"),
      t("courseDetail.downloadableResources"),
      t("courseDetail.certificateCompletion"),
      t("courseDetail.lifetimeAccess"),
      t("courseDetail.mobileAccess"),
      t("courseDetail.moneyBackGuarantee")
    ],
    requirements: [
      t("courseDetail.noProgramming"),
      t("courseDetail.computerInternet"),
      t("courseDetail.desireToLearn")
    ],
    curriculum: [
      {
        title: language === "ar" ? "مقدمة في تطوير الويب" : "Introduction to Web Development",
        duration: language === "ar" ? "2 ساعة 30 د" : "2h 30m",
        lectures: [
          { title: language === "ar" ? "مرحباً بك في الدورة" : "Welcome to the Course", duration: "5:00", type: "video", free: true },
          { title: language === "ar" ? "كيف يعمل الإنترنت" : "How the Internet Works", duration: "15:00", type: "video", free: true },
          { title: language === "ar" ? "إعداد بيئة التطوير" : "Setting Up Your Development Environment", duration: "20:00", type: "video", free: false },
          { title: language === "ar" ? "موارد الدورة" : "Course Resources", duration: "2:00", type: "resource", free: true }
        ]
      },
      {
        title: language === "ar" ? "أساسيات HTML" : "HTML Fundamentals",
        duration: language === "ar" ? "4 ساعة 15 د" : "4h 15m",
        lectures: [
          { title: language === "ar" ? "ما هو HTML؟" : "What is HTML?", duration: "10:00", type: "video", free: false },
          { title: language === "ar" ? "هيكل مستند HTML" : "HTML Document Structure", duration: "18:00", type: "video", free: false },
          { title: language === "ar" ? "العمل مع عناصر النص" : "Working with Text Elements", duration: "25:00", type: "video", free: false },
          { title: language === "ar" ? "الروابط والصور" : "Links and Images", duration: "30:00", type: "video", free: false },
          { title: language === "ar" ? "مشروع HTML تطبيقي" : "HTML Practice Project", duration: "45:00", type: "video", free: false }
        ]
      },
      {
        title: language === "ar" ? "تنسيق CSS" : "CSS Styling",
        duration: language === "ar" ? "6 ساعة 45 د" : "6h 45m",
        lectures: [
          { title: language === "ar" ? "مقدمة في CSS" : "Introduction to CSS", duration: "12:00", type: "video", free: false },
          { title: language === "ar" ? "المحددات والخصائص" : "Selectors and Properties", duration: "28:00", type: "video", free: false },
          { title: language === "ar" ? "نموذج الصندوق بالتفصيل" : "Box Model Deep Dive", duration: "35:00", type: "video", free: false },
          { title: language === "ar" ? "تخطيط Flexbox" : "Flexbox Layout", duration: "45:00", type: "video", free: false },
          { title: language === "ar" ? "إتقان CSS Grid" : "CSS Grid Mastery", duration: "50:00", type: "video", free: false },
          { title: language === "ar" ? "التصميم المتجاوب" : "Responsive Design", duration: "40:00", type: "video", free: false }
        ]
      },
      {
        title: language === "ar" ? "أساسيات JavaScript" : "JavaScript Essentials",
        duration: language === "ar" ? "8 ساعة 20 د" : "8h 20m",
        lectures: [
          { title: language === "ar" ? "أساسيات JavaScript" : "JavaScript Basics", duration: "20:00", type: "video", free: false },
          { title: language === "ar" ? "المتغيرات وأنواع البيانات" : "Variables and Data Types", duration: "30:00", type: "video", free: false },
          { title: language === "ar" ? "الدوال والنطاق" : "Functions and Scope", duration: "45:00", type: "video", free: false },
          { title: language === "ar" ? "التعامل مع DOM" : "DOM Manipulation", duration: "55:00", type: "video", free: false },
          { title: language === "ar" ? "معالجة الأحداث" : "Event Handling", duration: "40:00", type: "video", free: false },
          { title: language === "ar" ? "JavaScript غير المتزامن" : "Async JavaScript", duration: "60:00", type: "video", free: false }
        ]
      },
      {
        title: language === "ar" ? "إطار عمل React" : "React Framework",
        duration: language === "ar" ? "10 ساعة 30 د" : "10h 30m",
        lectures: [
          { title: language === "ar" ? "مقدمة في React" : "React Introduction", duration: "15:00", type: "video", free: false },
          { title: language === "ar" ? "المكونات والخصائص" : "Components and Props", duration: "40:00", type: "video", free: false },
          { title: language === "ar" ? "إدارة الحالة" : "State Management", duration: "55:00", type: "video", free: false },
          { title: language === "ar" ? "Hooks بالتفصيل" : "Hooks Deep Dive", duration: "70:00", type: "video", free: false },
          { title: language === "ar" ? "بناء تطبيق كامل" : "Building a Complete App", duration: "120:00", type: "video", free: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        user: language === "ar" ? "مايكل تشن" : "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        rating: 5,
        date: language === "ar" ? "منذ أسبوعين" : "2 weeks ago",
        comment: language === "ar" 
          ? "هذه الدورة غيرت مسيرتي المهنية بالكامل! انتقلت من عدم معرفة أي شيء عن البرمجة إلى الحصول على وظيفة مطور مبتدئ خلال 6 أشهر."
          : "This course completely transformed my career! I went from knowing nothing about coding to landing a junior developer position within 6 months."
      },
      {
        id: 2,
        user: language === "ar" ? "إيميلي رودريغيز" : "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        rating: 5,
        date: language === "ar" ? "منذ شهر" : "1 month ago",
        comment: language === "ar"
          ? "أفضل استثمار قمت به في تعليمي. المشاريع عملية وذات صلة، ودعم المجتمع مذهل."
          : "Best investment I've ever made in my education. The projects are practical and relevant, and the community support is amazing."
      },
      {
        id: 3,
        user: language === "ar" ? "جيمس ويلسون" : "James Wilson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
        rating: 4,
        date: language === "ar" ? "منذ شهر" : "1 month ago",
        comment: language === "ar"
          ? "دورة شاملة رائعة تغطي جميع الأساسيات. بعض الأقسام يمكن أن تكون أكثر تعمقاً، لكن بشكل عام نقطة انطلاق ممتازة."
          : "Great comprehensive course covering all the essentials. Some sections could be more in-depth, but overall an excellent starting point."
      },
      {
        id: 4,
        user: language === "ar" ? "بريا شارما" : "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
        rating: 5,
        date: language === "ar" ? "منذ شهرين" : "2 months ago",
        comment: language === "ar"
          ? "المنهج منظم بشكل جيد ومحدث بأحدث ممارسات الصناعة. قسم React وحده يستحق سعر الدورة بأكملها!"
          : "The curriculum is well-structured and up-to-date with the latest industry practices. The React section alone is worth the price of the entire course!"
      }
    ]
  };

  const ratingDistribution = [
    { stars: 5, percentage: 78 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 }
  ];

  const whatYouLearn = [
    t("courseDetail.buildProjects"),
    t("courseDetail.masterHTML"),
    t("courseDetail.createResponsive"),
    t("courseDetail.learnReact"),
    t("courseDetail.understandBackend"),
    t("courseDetail.workWithDB"),
    t("courseDetail.deployCloud"),
    t("courseDetail.writeClean")
  ];

  const totalLectures = courseData.curriculum.reduce(
    (acc, section) => acc + section.lectures.length, 
    0
  );

  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Video */}
      <section className="bg-gradient-to-b from-primary/10 to-background pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Link 
            to="/courses" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowIcon className="w-4 h-4" />
            {t("courseDetail.backToCourses")}
          </Link>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{t("courseDetail.bestseller")}</Badge>
                <Badge variant="outline">{courseData.level}</Badge>
                <Badge variant="outline">{t("courseDetail.updated")} {courseData.lastUpdated}</Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {courseData.title}
              </h1>
              
              <p className="text-lg text-muted-foreground">
                {courseData.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{courseData.rating}</span>
                  <span className="text-muted-foreground">({courseData.totalRatings.toLocaleString()} {t("courseDetail.ratings")})</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {courseData.students.toLocaleString()} {t("courseDetail.students")}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={courseData.instructor.avatar} />
                  <AvatarFallback>{courseData.instructor.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">{t("courseDetail.createdBy")}</p>
                  <p className="font-medium text-foreground">{courseData.instructor.name}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {courseData.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {courseData.lectures} {t("courseDetail.lectures")}
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  {t("courseDetail.certificateIncluded")}
                </span>
              </div>
            </div>
            
            {/* Video Preview & Enrollment Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 overflow-hidden border-border/50 shadow-xl">
                <div className="relative aspect-video bg-muted">
                  {isPlaying ? (
                    <video 
                      src={courseData.videoPreview}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <img 
                        src={courseData.thumbnail} 
                        alt={courseData.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors group"
                      >
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-primary-foreground ml-1" />
                        </div>
                      </button>
                      <span className="absolute bottom-4 left-4 text-white text-sm font-medium">
                        {t("courseDetail.previewCourse")}
                      </span>
                    </>
                  )}
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">${courseData.price}</span>
                    <span className="text-lg text-muted-foreground line-through">${courseData.originalPrice}</span>
                    <Badge variant="destructive" className="ml-2">
                      {Math.round((1 - courseData.price / courseData.originalPrice) * 100)}% {t("courseDetail.off")}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      {t("courseDetail.enrollNow")}
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      {t("courseDetail.addToWishlist")}
                      <Heart className="w-4 h-4 ms-2" />
                    </Button>
                  </div>
                  
                  <p className="text-center text-sm text-muted-foreground">
                    {t("courseDetail.moneyBack")}
                  </p>
                  
                  <div className="pt-4 border-t border-border space-y-3">
                    <h4 className="font-semibold text-foreground">{t("courseDetail.courseIncludes")}</h4>
                    <ul className="space-y-2">
                      {courseData.features.slice(0, 6).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button variant="ghost" className="w-full">
                    <Share2 className="w-4 h-4 me-2" />
                    {t("courseDetail.share")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Course Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="lg:max-w-2xl space-y-12">
            
            {/* What You'll Learn */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">{t("courseDetail.whatYouLearn")}</h2>
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {whatYouLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Requirements */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">{t("courseDetail.requirements")}</h2>
              <ul className="space-y-3">
                {courseData.requirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Curriculum */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">{t("courseDetail.courseCurriculum")}</h2>
                <span className="text-sm text-muted-foreground">
                  {courseData.curriculum.length} {t("courseDetail.sections")} • {totalLectures} {t("courseDetail.lectures")} • {courseData.duration}
                </span>
              </div>
              
              <Accordion type="multiple" className="space-y-3">
                {courseData.curriculum.map((section, sectionIndex) => (
                  <AccordionItem 
                    key={sectionIndex} 
                    value={`section-${sectionIndex}`}
                    className="border border-border/50 rounded-lg px-4 data-[state=open]:bg-muted/30"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex flex-col items-start text-start">
                        <span className="font-semibold text-foreground">{section.title}</span>
                        <span className="text-sm text-muted-foreground">
                          {section.lectures.length} {t("courseDetail.lectures")} • {section.duration}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 pb-4">
                        {section.lectures.map((lecture, lectureIndex) => (
                          <li 
                            key={lectureIndex}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              {lecture.type === "video" ? (
                                <PlayCircle className="w-4 h-4 text-muted-foreground" />
                              ) : lecture.type === "resource" ? (
                                <Download className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <FileText className="w-4 h-4 text-muted-foreground" />
                              )}
                              <span className="text-foreground">{lecture.title}</span>
                              {lecture.free && (
                                <Badge variant="secondary" className="text-xs">{t("courseDetail.preview")}</Badge>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">{lecture.duration}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            {/* Instructor */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">{t("courseDetail.yourInstructor")}</h2>
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={courseData.instructor.avatar} />
                      <AvatarFallback className="text-2xl">{courseData.instructor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{courseData.instructor.name}</h3>
                        <p className="text-muted-foreground">{courseData.instructor.title}</p>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          {courseData.instructor.rating} {t("courseDetail.instructorRating")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-muted-foreground" />
                          {courseData.instructor.courses} {t("courseDetail.courses")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          {courseData.instructor.students.toLocaleString()} {t("courseDetail.students")}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {courseData.instructor.bio}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Reviews */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">{t("courseDetail.studentReviews")}</h2>
              
              {/* Rating Summary */}
              <Card className="border-border/50 mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-foreground">{courseData.rating}</div>
                      <div className="flex justify-center my-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-5 h-5 ${star <= Math.round(courseData.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{t("courseDetail.courseRating")}</p>
                    </div>
                    <div className="flex-1 space-y-2">
                      {ratingDistribution.map((item) => (
                        <div key={item.stars} className="flex items-center gap-3">
                          <div className="flex items-center gap-1 w-12">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-foreground">{item.stars}</span>
                          </div>
                          <Progress value={item.percentage} className="flex-1 h-2" />
                          <span className="text-sm text-muted-foreground w-12">{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Individual Reviews */}
              <div className="space-y-4">
                {courseData.reviews.map((review) => (
                  <Card key={review.id} className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>{review.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-foreground">{review.user}</h4>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-6">
                {t("courseDetail.showAllReviews")}
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;