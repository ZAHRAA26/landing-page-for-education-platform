import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  CheckCircle2,
  Circle,
  Lock,
  Clock,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  FileText,
  HelpCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: "video" | "reading" | "quiz";
  status: "completed" | "current" | "locked";
}

interface Section {
  id: number;
  title: string;
  lessons: Lesson[];
}

const CourseProgress = () => {
  const { id } = useParams();
  const { t, isRTL, language } = useLanguage();
  const { toast } = useToast();
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  const courseData = {
    id: Number(id) || 1,
    title: language === "ar" 
      ? "معسكر تطوير الويب الكامل" 
      : "Complete Web Development Bootcamp",
    instructor: language === "ar" ? "سارة جونسون" : "Sarah Johnson",
    totalLessons: 48,
    completedLessons: 18,
    totalDuration: language === "ar" ? "48 ساعة" : "48 hours",
    image: "from-primary/30 to-accent/20",
  };

  const [sections, setSections] = useState<Section[]>([
    {
      id: 1,
      title: language === "ar" ? "مقدمة في تطوير الويب" : "Introduction to Web Development",
      lessons: [
        { id: 1, title: language === "ar" ? "مرحباً بك في الدورة" : "Welcome to the Course", duration: "5:30", type: "video", status: "completed" },
        { id: 2, title: language === "ar" ? "إعداد بيئة التطوير" : "Setting Up Development Environment", duration: "12:45", type: "video", status: "completed" },
        { id: 3, title: language === "ar" ? "أدوات المطور" : "Developer Tools", duration: "8:20", type: "reading", status: "completed" },
        { id: 4, title: language === "ar" ? "اختبار القسم الأول" : "Section 1 Quiz", duration: "10:00", type: "quiz", status: "completed" },
      ],
    },
    {
      id: 2,
      title: language === "ar" ? "أساسيات HTML" : "HTML Fundamentals",
      lessons: [
        { id: 5, title: language === "ar" ? "بنية صفحة HTML" : "HTML Page Structure", duration: "15:00", type: "video", status: "completed" },
        { id: 6, title: language === "ar" ? "العناصر والوسوم" : "Elements and Tags", duration: "18:30", type: "video", status: "completed" },
        { id: 7, title: language === "ar" ? "النماذج والإدخال" : "Forms and Input", duration: "22:15", type: "video", status: "completed" },
        { id: 8, title: language === "ar" ? "تمرين عملي: إنشاء صفحة" : "Practice: Create a Page", duration: "30:00", type: "reading", status: "completed" },
      ],
    },
    {
      id: 3,
      title: language === "ar" ? "تنسيق CSS" : "CSS Styling",
      lessons: [
        { id: 9, title: language === "ar" ? "مقدمة في CSS" : "Introduction to CSS", duration: "14:00", type: "video", status: "completed" },
        { id: 10, title: language === "ar" ? "المحددات والخصائص" : "Selectors and Properties", duration: "20:00", type: "video", status: "completed" },
        { id: 11, title: language === "ar" ? "Flexbox و Grid" : "Flexbox & Grid", duration: "25:00", type: "video", status: "current" },
        { id: 12, title: language === "ar" ? "التصميم المتجاوب" : "Responsive Design", duration: "18:00", type: "video", status: "locked" },
        { id: 13, title: language === "ar" ? "اختبار CSS" : "CSS Quiz", duration: "15:00", type: "quiz", status: "locked" },
      ],
    },
    {
      id: 4,
      title: language === "ar" ? "أساسيات JavaScript" : "JavaScript Basics",
      lessons: [
        { id: 14, title: language === "ar" ? "مقدمة في JavaScript" : "Introduction to JavaScript", duration: "12:00", type: "video", status: "locked" },
        { id: 15, title: language === "ar" ? "المتغيرات وأنواع البيانات" : "Variables and Data Types", duration: "16:00", type: "video", status: "locked" },
        { id: 16, title: language === "ar" ? "الدوال والكائنات" : "Functions and Objects", duration: "22:00", type: "video", status: "locked" },
        { id: 17, title: language === "ar" ? "DOM Manipulation" : "DOM Manipulation", duration: "28:00", type: "video", status: "locked" },
      ],
    },
    {
      id: 5,
      title: language === "ar" ? "مشروع تطبيقي" : "Practical Project",
      lessons: [
        { id: 18, title: language === "ar" ? "تخطيط المشروع" : "Project Planning", duration: "10:00", type: "reading", status: "locked" },
        { id: 19, title: language === "ar" ? "بناء الواجهة" : "Building the Interface", duration: "45:00", type: "video", status: "locked" },
        { id: 20, title: language === "ar" ? "إضافة التفاعلية" : "Adding Interactivity", duration: "35:00", type: "video", status: "locked" },
        { id: 21, title: language === "ar" ? "المشروع النهائي" : "Final Project", duration: "60:00", type: "reading", status: "locked" },
      ],
    },
  ]);

  const completedCount = sections.reduce(
    (acc, section) => acc + section.lessons.filter((l) => l.status === "completed").length,
    0
  );
  const totalCount = sections.reduce((acc, section) => acc + section.lessons.length, 0);
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  const currentLesson = sections
    .flatMap((s) => s.lessons)
    .find((l) => l.status === "current");

  const markAsComplete = (sectionId: number, lessonId: number) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          const lessonIndex = section.lessons.findIndex((l) => l.id === lessonId);
          const updatedLessons = section.lessons.map((lesson, idx) => {
            if (lesson.id === lessonId) {
              return { ...lesson, status: "completed" as const };
            }
            if (idx === lessonIndex + 1 && lesson.status === "locked") {
              return { ...lesson, status: "current" as const };
            }
            return lesson;
          });
          return { ...section, lessons: updatedLessons };
        }
        
        // Check if we need to unlock the first lesson of the next section
        const currentSectionIndex = prev.findIndex((s) => s.id === sectionId);
        const currentSectionLessons = prev[currentSectionIndex]?.lessons || [];
        const isLastLesson = currentSectionLessons[currentSectionLessons.length - 1]?.id === lessonId;
        
        if (isLastLesson && section.id === sectionId + 1) {
          const updatedLessons = section.lessons.map((lesson, idx) => {
            if (idx === 0 && lesson.status === "locked") {
              return { ...lesson, status: "current" as const };
            }
            return lesson;
          });
          return { ...section, lessons: updatedLessons };
        }
        
        return section;
      })
    );

    toast({
      title: t("progress.lessonCompleted"),
      description: t("progress.lessonCompletedDesc"),
    });
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <PlayCircle className="w-4 h-4" />;
      case "reading":
        return <FileText className="w-4 h-4" />;
      case "quiz":
        return <HelpCircle className="w-4 h-4" />;
      default:
        return <PlayCircle className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "current":
        return <Play className="w-5 h-5 text-primary fill-primary" />;
      case "locked":
        return <Lock className="w-5 h-5 text-muted-foreground" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <BackArrow className="w-4 h-4" />
            {t("progress.backToDashboard")}
          </Link>

          {/* Course Header */}
          <div className="bg-card rounded-2xl border border-border/50 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Course Image */}
              <div className={`w-full lg:w-48 h-32 rounded-xl bg-gradient-to-br ${courseData.image}`} />

              {/* Course Info */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground mb-2">{courseData.title}</h1>
                <p className="text-muted-foreground mb-4">
                  {t("progress.by")} {courseData.instructor}
                </p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {t("progress.progress")}: {completedCount}/{totalCount} {t("progress.lessonsCompleted")}
                    </span>
                    <span className="text-sm font-bold text-primary">{progressPercentage}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BookOpen className="w-4 h-4" />
                    <span>{totalCount} {t("progress.lessons")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{courseData.totalDuration}</span>
                  </div>
                  {progressPercentage === 100 && (
                    <div className="flex items-center gap-2 text-green-500">
                      <Award className="w-4 h-4" />
                      <span>{t("progress.courseCompleted")}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Continue Button */}
              {currentLesson && (
                <div className="flex flex-col justify-center">
                  <Button variant="hero" size="lg" className="gap-2">
                    <Play className="w-4 h-4" />
                    {t("progress.continueLesson")}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    {currentLesson.title}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Course Curriculum */}
          <div className="bg-card rounded-2xl border border-border/50 p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">{t("progress.curriculum")}</h2>

            <Accordion type="multiple" defaultValue={["section-3"]} className="space-y-4">
              {sections.map((section) => {
                const sectionCompleted = section.lessons.filter((l) => l.status === "completed").length;
                const sectionTotal = section.lessons.length;
                const isSectionComplete = sectionCompleted === sectionTotal;

                return (
                  <AccordionItem
                    key={section.id}
                    value={`section-${section.id}`}
                    className="border border-border/50 rounded-xl overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-secondary/50">
                      <div className="flex items-center gap-3 flex-1">
                        {isSectionComplete ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground" />
                        )}
                        <div className="text-start flex-1">
                          <h3 className="font-semibold text-foreground">{section.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {sectionCompleted}/{sectionTotal} {t("progress.completed")}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-2 mt-2">
                        {section.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                              lesson.status === "current"
                                ? "bg-primary/10 border border-primary/20"
                                : lesson.status === "completed"
                                ? "bg-green-500/5"
                                : "bg-secondary/50 opacity-60"
                            }`}
                          >
                            {getStatusIcon(lesson.status)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                {getLessonIcon(lesson.type)}
                                <span
                                  className={`font-medium ${
                                    lesson.status === "locked" ? "text-muted-foreground" : "text-foreground"
                                  }`}
                                >
                                  {lesson.title}
                                </span>
                              </div>
                              <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                            </div>
                            {lesson.status === "current" && (
                              <Button
                                size="sm"
                                variant="hero"
                                onClick={() => markAsComplete(section.id, lesson.id)}
                              >
                                {t("progress.markComplete")}
                              </Button>
                            )}
                            {lesson.status === "completed" && (
                              <span className="text-xs text-green-500 font-medium">
                                {t("progress.done")}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseProgress;
