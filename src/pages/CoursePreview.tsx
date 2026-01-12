import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CourseStatusBadge, { CourseStatus } from "@/components/CourseStatusBadge";
import {
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  Star,
  Clock,
  Users,
  Play,
  BookOpen,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  FileText,
  Send,
  Edit,
  Eye,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CoursePreview = () => {
  const { t, isRTL, language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  const [expandedSections, setExpandedSections] = useState<string[]>(["1"]);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [courseStatus, setCourseStatus] = useState<CourseStatus>("draft");
  const [pendingStatus, setPendingStatus] = useState<CourseStatus>("draft");

  // Simulated course data
  const courseData = {
    title: language === "ar" ? "معسكر تطوير الويب الكامل" : "Complete Web Development Bootcamp",
    shortDescription: language === "ar" 
      ? "تعلم تطوير الويب من الصفر حتى الاحتراف"
      : "Learn web development from zero to hero",
    description: language === "ar"
      ? "دورة شاملة لتعلم تطوير الويب من الصفر حتى الاحتراف. تتضمن HTML, CSS, JavaScript, React, Node.js وأكثر. ستتعلم كيفية بناء مواقع ويب احترافية وتطبيقات ويب متكاملة."
      : "A comprehensive course to learn web development from scratch to professional level. Includes HTML, CSS, JavaScript, React, Node.js and more. You'll learn how to build professional websites and full-stack web applications.",
    price: "99.99",
    discountPrice: "79.99",
    category: language === "ar" ? "التطوير" : "Development",
    level: language === "ar" ? "مبتدئ" : "Beginner",
    duration: "20 hours",
    instructor: language === "ar" ? "أحمد محمد" : "Ahmed Mohammed",
    rating: 4.8,
    students: 1250,
    lectures: 45,
    thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    curriculum: [
      {
        id: "1",
        title: language === "ar" ? "مقدمة في تطوير الويب" : "Introduction to Web Development",
        lessons: [
          { id: "1-1", title: language === "ar" ? "ترحيب ونظرة عامة" : "Welcome & Overview", duration: "10:00", hasVideo: true },
          { id: "1-2", title: language === "ar" ? "إعداد بيئة العمل" : "Setting Up Your Environment", duration: "15:00", hasVideo: true },
        ],
      },
      {
        id: "2",
        title: language === "ar" ? "أساسيات HTML" : "HTML Fundamentals",
        lessons: [
          { id: "2-1", title: language === "ar" ? "هيكل صفحة HTML" : "HTML Page Structure", duration: "20:00", hasVideo: true },
          { id: "2-2", title: language === "ar" ? "العناصر والوسوم" : "Elements and Tags", duration: "25:00", hasVideo: true },
          { id: "2-3", title: language === "ar" ? "النماذج والمدخلات" : "Forms and Inputs", duration: "30:00", hasVideo: true },
        ],
      },
      {
        id: "3",
        title: language === "ar" ? "CSS وتنسيق الصفحات" : "CSS and Page Styling",
        lessons: [
          { id: "3-1", title: language === "ar" ? "أساسيات CSS" : "CSS Basics", duration: "20:00", hasVideo: true },
          { id: "3-2", title: language === "ar" ? "Flexbox و Grid" : "Flexbox & Grid", duration: "35:00", hasVideo: true },
        ],
      },
    ],
    whatYouLearn: language === "ar" 
      ? [
          "بناء 15+ مشروع ويب حقيقي",
          "إتقان HTML5, CSS3, وجافاسكريبت الحديث",
          "إنشاء مواقع متجاوبة من الصفر",
          "تعلم React وبناء تطبيقات صفحة واحدة",
          "فهم تطوير الخلفية باستخدام Node.js",
          "العمل مع قواعد البيانات مثل MongoDB",
        ]
      : [
          "Build 15+ real-world web projects",
          "Master HTML5, CSS3, and modern JavaScript",
          "Create responsive websites from scratch",
          "Learn React and build single-page applications",
          "Understand backend development with Node.js",
          "Work with databases like MongoDB",
        ],
    requirements: language === "ar"
      ? [
          "لا حاجة لخبرة برمجية سابقة",
          "حاسوب مع اتصال بالإنترنت",
          "الرغبة في التعلم وبناء المشاريع",
        ]
      : [
          "No programming experience needed",
          "A computer with internet access",
          "Desire to learn and build projects",
        ],
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleStatusChange = () => {
    setCourseStatus(pendingStatus);
    setShowStatusDialog(false);

    const statusMessages = {
      draft: {
        title: t("coursePreview.statusChanged"),
        description: t("coursePreview.statusDraft"),
      },
      review: {
        title: t("coursePreview.statusChanged"),
        description: t("coursePreview.statusReview"),
      },
      published: {
        title: t("coursePreview.statusChanged"),
        description: t("coursePreview.statusPublished"),
      },
    };

    toast({
      title: statusMessages[pendingStatus].title,
      description: statusMessages[pendingStatus].description,
    });
  };

  const totalLectures = courseData.curriculum.reduce(
    (acc, section) => acc + section.lessons.length,
    0
  );

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Edu<span className="text-primary">Learn</span>
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <CourseStatusBadge status={courseStatus} />
              <Button variant="outline" size="sm" onClick={() => setShowStatusDialog(true)}>
                {t("coursePreview.changeStatus")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Preview Banner */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-primary/10 border-b border-primary/20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-primary">
              <Eye className="w-4 h-4" />
              <span>{t("coursePreview.previewMode")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(`/edit-course/${id}`)}
              >
                <Edit className="w-4 h-4 mr-1" />
                {t("coursePreview.edit")}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
              >
                <BackIcon className="w-4 h-4 mr-1" />
                {t("coursePreview.backToDashboard")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="pt-32 pb-12">
        {/* Course Header Section */}
        <section className="bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/10 py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Course Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{courseData.category}</Badge>
                  <Badge variant="outline">{courseData.level}</Badge>
                  <CourseStatusBadge status={courseStatus} size="sm" />
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {courseData.title}
                </h1>

                <p className="text-lg text-muted-foreground">
                  {courseData.shortDescription}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{courseData.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{courseData.students} {t("courseDetail.students")}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{courseData.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <BookOpen className="w-4 h-4" />
                    <span>{totalLectures} {t("courseDetail.lectures")}</span>
                  </div>
                </div>

                <p className="text-muted-foreground">
                  {t("courseDetail.createdBy")}{" "}
                  <span className="text-primary font-medium">{courseData.instructor}</span>
                </p>
              </div>

              {/* Course Card */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-lg sticky top-40">
                  <div className="relative aspect-video">
                    <img
                      src={courseData.thumbnailUrl}
                      alt={courseData.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                        <Play className="w-8 h-8 text-primary-foreground fill-primary-foreground" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      {courseData.discountPrice && (
                        <span className="text-3xl font-bold text-foreground">
                          ${courseData.discountPrice}
                        </span>
                      )}
                      <span
                        className={`${
                          courseData.discountPrice
                            ? "text-lg line-through text-muted-foreground"
                            : "text-3xl font-bold text-foreground"
                        }`}
                      >
                        ${courseData.price}
                      </span>
                      {courseData.discountPrice && (
                        <Badge variant="destructive">
                          {Math.round(
                            ((parseFloat(courseData.price) -
                              parseFloat(courseData.discountPrice)) /
                              parseFloat(courseData.price)) *
                              100
                          )}
                          % {t("courseDetail.off")}
                        </Badge>
                      )}
                    </div>

                    <Button className="w-full" size="lg" disabled={courseStatus !== "published"}>
                      {courseStatus === "published" 
                        ? t("courseDetail.enrollNow")
                        : t("coursePreview.notPublished")}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      {t("courseDetail.moneyBack")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* What You'll Learn */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {t("courseDetail.whatYouLearn")}
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {courseData.whatYouLearn.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {t("courseDetail.requirements")}
                </h2>
                <ul className="space-y-2">
                  {courseData.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Course Description */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {t("createCourse.fullDescription")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {courseData.description}
                </p>
              </div>

              {/* Curriculum */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {t("courseDetail.courseCurriculum")}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {courseData.curriculum.length} {t("courseDetail.sections")} •{" "}
                  {totalLectures} {t("courseDetail.lectures")} • {courseData.duration}
                </p>

                <div className="space-y-3">
                  {courseData.curriculum.map((section, sectionIndex) => (
                    <div
                      key={section.id}
                      className="border border-border/50 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-muted-foreground">
                            {sectionIndex + 1}.
                          </span>
                          <span className="font-medium text-foreground">
                            {section.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">
                            {section.lessons.length} {t("courseDetail.lectures")}
                          </span>
                          {expandedSections.includes(section.id) ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </button>

                      {expandedSections.includes(section.id) && (
                        <div className="divide-y divide-border/50">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-4 hover:bg-secondary/10 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.hasVideo ? (
                                  <Play className="w-4 h-4 text-muted-foreground" />
                                ) : (
                                  <FileText className="w-4 h-4 text-muted-foreground" />
                                )}
                                <span className="text-sm text-muted-foreground">
                                  {sectionIndex + 1}.{lessonIndex + 1}
                                </span>
                                <span className="text-foreground">{lesson.title}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {lesson.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Course Includes */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  {t("courseDetail.courseIncludes")}
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <Play className="w-4 h-4 text-primary" />
                    {courseData.duration} {t("courseDetail.hoursOnDemand")}
                  </li>
                  <li className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-primary" />
                    {totalLectures} {t("courseDetail.lecturesCovering")}
                  </li>
                  <li className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-primary" />
                    {t("courseDetail.downloadableResources")}
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    {t("courseDetail.certificateCompletion")}
                  </li>
                </ul>
              </div>

              {/* Instructor */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  {t("courseDetail.yourInstructor")}
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">
                      {courseData.instructor.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{courseData.instructor}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("courseDetail.instructorRating")}: {courseData.rating}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Status Change Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("coursePreview.changeStatusTitle")}</DialogTitle>
            <DialogDescription>
              {t("coursePreview.changeStatusDesc")}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <label className="text-sm font-medium text-foreground mb-2 block">
              {t("coursePreview.selectStatus")}
            </label>
            <Select value={pendingStatus} onValueChange={(value) => setPendingStatus(value as CourseStatus)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {t("courseStatus.draft")}
                  </div>
                </SelectItem>
                <SelectItem value="review">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {t("courseStatus.review")}
                  </div>
                </SelectItem>
                <SelectItem value="published">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {t("courseStatus.published")}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                {pendingStatus === "draft" && t("coursePreview.draftInfo")}
                {pendingStatus === "review" && t("coursePreview.reviewInfo")}
                {pendingStatus === "published" && t("coursePreview.publishedInfo")}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatusDialog(false)}>
              {t("studentManagement.cancel")}
            </Button>
            <Button onClick={handleStatusChange}>
              <Send className="w-4 h-4 mr-1" />
              {t("coursePreview.confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoursePreview;
