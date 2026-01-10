import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  GraduationCap, 
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Upload,
  DollarSign,
  BookOpen,
  Clock,
  Users,
  Save,
  Video,
  File,
  X,
  Play,
  FileText
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface CurriculumLesson {
  id: string;
  title: string;
  duration: string;
  videoFile: File | null;
  videoName: string;
  attachments: { id: string; name: string; file: File | null }[];
}

interface CurriculumSection {
  id: string;
  title: string;
  lessons: CurriculumLesson[];
}

const EditCourse = () => {
  const { t, isRTL, language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  // Simulated course data (would come from API in real app)
  const [formData, setFormData] = useState({
    title: language === "ar" ? "معسكر تطوير الويب الكامل" : "Complete Web Development Bootcamp",
    description: language === "ar" 
      ? "دورة شاملة لتعلم تطوير الويب من الصفر حتى الاحتراف. تتضمن HTML, CSS, JavaScript, React, Node.js وأكثر."
      : "A comprehensive course to learn web development from scratch to professional level. Includes HTML, CSS, JavaScript, React, Node.js and more.",
    shortDescription: language === "ar" 
      ? "تعلم تطوير الويب من الصفر حتى الاحتراف"
      : "Learn web development from zero to hero",
    price: "99.99",
    discountPrice: "79.99",
    category: "development",
    level: "beginner",
    duration: "20 hours",
    thumbnail: null as File | null,
    thumbnailPreview: "",
  });

  const [curriculum, setCurriculum] = useState<CurriculumSection[]>([
    { 
      id: "1", 
      title: language === "ar" ? "مقدمة في تطوير الويب" : "Introduction to Web Development", 
      lessons: [
        { 
          id: "1-1", 
          title: language === "ar" ? "ترحيب ونظرة عامة" : "Welcome & Overview", 
          duration: "10:00",
          videoFile: null,
          videoName: "intro-video.mp4",
          attachments: [{ id: "a1", name: "course-outline.pdf", file: null }]
        },
        { 
          id: "1-2", 
          title: language === "ar" ? "إعداد بيئة العمل" : "Setting Up Your Environment", 
          duration: "15:00",
          videoFile: null,
          videoName: "",
          attachments: []
        }
      ] 
    },
    { 
      id: "2", 
      title: language === "ar" ? "أساسيات HTML" : "HTML Fundamentals", 
      lessons: [
        { 
          id: "2-1", 
          title: language === "ar" ? "هيكل صفحة HTML" : "HTML Page Structure", 
          duration: "20:00",
          videoFile: null,
          videoName: "html-basics.mp4",
          attachments: []
        }
      ] 
    }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, thumbnail: file, thumbnailPreview: previewUrl }));
    }
  };

  const handleVideoUpload = (sectionId: string, lessonId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCurriculum(prev => prev.map(s => {
        if (s.id === sectionId) {
          return {
            ...s,
            lessons: s.lessons.map(l => 
              l.id === lessonId ? { ...l, videoFile: file, videoName: file.name } : l
            )
          };
        }
        return s;
      }));
      toast({
        title: t("editCourse.videoUploaded"),
        description: file.name,
      });
    }
  };

  const removeVideo = (sectionId: string, lessonId: string) => {
    setCurriculum(prev => prev.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          lessons: s.lessons.map(l => 
            l.id === lessonId ? { ...l, videoFile: null, videoName: "" } : l
          )
        };
      }
      return s;
    }));
  };

  const handleAttachmentUpload = (sectionId: string, lessonId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newAttachments = Array.from(files).map((file, index) => ({
        id: `${lessonId}-att-${Date.now()}-${index}`,
        name: file.name,
        file: file
      }));

      setCurriculum(prev => prev.map(s => {
        if (s.id === sectionId) {
          return {
            ...s,
            lessons: s.lessons.map(l => 
              l.id === lessonId 
                ? { ...l, attachments: [...l.attachments, ...newAttachments] } 
                : l
            )
          };
        }
        return s;
      }));
    }
  };

  const removeAttachment = (sectionId: string, lessonId: string, attachmentId: string) => {
    setCurriculum(prev => prev.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          lessons: s.lessons.map(l => 
            l.id === lessonId 
              ? { ...l, attachments: l.attachments.filter(a => a.id !== attachmentId) } 
              : l
          )
        };
      }
      return s;
    }));
  };

  const addSection = () => {
    const newId = String(curriculum.length + 1);
    setCurriculum(prev => [...prev, { 
      id: newId, 
      title: "", 
      lessons: [{ id: `${newId}-1`, title: "", duration: "", videoFile: null, videoName: "", attachments: [] }] 
    }]);
  };

  const removeSection = (sectionId: string) => {
    if (curriculum.length > 1) {
      setCurriculum(prev => prev.filter(s => s.id !== sectionId));
    }
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    setCurriculum(prev => prev.map(s => 
      s.id === sectionId ? { ...s, title } : s
    ));
  };

  const addLesson = (sectionId: string) => {
    setCurriculum(prev => prev.map(s => {
      if (s.id === sectionId) {
        const newLessonId = `${sectionId}-${s.lessons.length + 1}`;
        return { 
          ...s, 
          lessons: [...s.lessons, { id: newLessonId, title: "", duration: "", videoFile: null, videoName: "", attachments: [] }] 
        };
      }
      return s;
    }));
  };

  const removeLesson = (sectionId: string, lessonId: string) => {
    setCurriculum(prev => prev.map(s => {
      if (s.id === sectionId && s.lessons.length > 1) {
        return { ...s, lessons: s.lessons.filter(l => l.id !== lessonId) };
      }
      return s;
    }));
  };

  const updateLesson = (sectionId: string, lessonId: string, field: "title" | "duration", value: string) => {
    setCurriculum(prev => prev.map(s => {
      if (s.id === sectionId) {
        return { 
          ...s, 
          lessons: s.lessons.map(l => 
            l.id === lessonId ? { ...l, [field]: value } : l
          ) 
        };
      }
      return s;
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: t("editCourse.successTitle"),
      description: t("editCourse.successMessage"),
    });

    setIsSubmitting(false);
    navigate("/dashboard");
  };

  const categories = [
    { value: "development", label: t("coursesPage.development") },
    { value: "data-science", label: t("coursesPage.dataScience") },
    { value: "design", label: t("coursesPage.design") },
    { value: "marketing", label: t("coursesPage.marketing") },
    { value: "it-security", label: t("coursesPage.itSecurity") },
  ];

  const levels = [
    { value: "beginner", label: t("coursesPage.beginner") },
    { value: "intermediate", label: t("coursesPage.intermediate") },
    { value: "advanced", label: t("coursesPage.advanced") },
  ];

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
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Link */}
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <BackIcon className="w-4 h-4" />
            {t("editCourse.backToDashboard")}
          </Link>

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t("editCourse.title")}
            </h1>
            <p className="text-muted-foreground">
              {t("editCourse.subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <section className="bg-card rounded-2xl border border-border/50 p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                {t("createCourse.basicInfo")}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">{t("createCourse.courseTitle")} *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder={t("createCourse.courseTitlePlaceholder")}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="shortDescription">{t("createCourse.shortDescription")} *</Label>
                  <Input
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    placeholder={t("createCourse.shortDescriptionPlaceholder")}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">{t("createCourse.fullDescription")} *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder={t("createCourse.fullDescriptionPlaceholder")}
                    required
                    rows={6}
                    className="mt-1"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">{t("createCourse.category")} *</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">{t("createCourse.selectCategory")}</option>
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="level">{t("createCourse.level")} *</Label>
                    <select
                      id="level"
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      required
                      className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">{t("createCourse.selectLevel")}</option>
                      {levels.map(lvl => (
                        <option key={lvl.value} value={lvl.value}>{lvl.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section className="bg-card rounded-2xl border border-border/50 p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                {t("createCourse.pricing")}
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">{t("createCourse.price")} *</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="99.99"
                      required
                      className="pl-7"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="discountPrice">{t("createCourse.discountPrice")}</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="discountPrice"
                      name="discountPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.discountPrice}
                      onChange={handleInputChange}
                      placeholder="79.99"
                      className="pl-7"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Duration & Media */}
            <section className="bg-card rounded-2xl border border-border/50 p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                {t("createCourse.durationMedia")}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="duration">{t("createCourse.estimatedDuration")} *</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder={t("createCourse.durationPlaceholder")}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>{t("createCourse.thumbnail")}</Label>
                  <div className="mt-1 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="hidden"
                      id="thumbnail"
                    />
                    <label htmlFor="thumbnail" className="cursor-pointer">
                      {formData.thumbnailPreview ? (
                        <img 
                          src={formData.thumbnailPreview} 
                          alt="Thumbnail preview" 
                          className="max-h-40 mx-auto rounded-lg object-cover"
                        />
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            {formData.thumbnail 
                              ? formData.thumbnail.name 
                              : t("createCourse.uploadThumbnail")}
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Curriculum with Video & File Upload */}
            <section className="bg-card rounded-2xl border border-border/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  {t("editCourse.curriculumMedia")}
                </h2>
                <Button type="button" variant="outline" size="sm" onClick={addSection}>
                  <Plus className="w-4 h-4 mr-1" />
                  {t("createCourse.addSection")}
                </Button>
              </div>
              
              <div className="space-y-6">
                {curriculum.map((section, sectionIndex) => (
                  <div key={section.id} className="bg-secondary/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm font-medium text-muted-foreground">
                        {t("createCourse.section")} {sectionIndex + 1}
                      </span>
                      <Input
                        value={section.title}
                        onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                        placeholder={t("createCourse.sectionTitlePlaceholder")}
                        className="flex-1"
                      />
                      {curriculum.length > 1 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeSection(section.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-4 ml-4">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="bg-card rounded-lg p-4 border border-border/50">
                          {/* Lesson Header */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs text-muted-foreground w-8">
                              {sectionIndex + 1}.{lessonIndex + 1}
                            </span>
                            <Input
                              value={lesson.title}
                              onChange={(e) => updateLesson(section.id, lesson.id, "title", e.target.value)}
                              placeholder={t("createCourse.lessonTitlePlaceholder")}
                              className="flex-1"
                            />
                            <Input
                              value={lesson.duration}
                              onChange={(e) => updateLesson(section.id, lesson.id, "duration", e.target.value)}
                              placeholder={t("createCourse.lessonDurationPlaceholder")}
                              className="w-24"
                            />
                            {section.lessons.length > 1 && (
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="icon"
                                onClick={() => removeLesson(section.id, lesson.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>

                          {/* Video Upload */}
                          <div className="mb-3">
                            <Label className="text-xs text-muted-foreground mb-2 block">
                              {t("editCourse.lessonVideo")}
                            </Label>
                            {lesson.videoName ? (
                              <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                                <Play className="w-4 h-4 text-primary" />
                                <span className="text-sm flex-1 truncate">{lesson.videoName}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => removeVideo(section.id, lesson.id)}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            ) : (
                              <div className="relative">
                                <input
                                  type="file"
                                  accept="video/*"
                                  onChange={(e) => handleVideoUpload(section.id, lesson.id, e)}
                                  className="hidden"
                                  id={`video-${lesson.id}`}
                                />
                                <label 
                                  htmlFor={`video-${lesson.id}`}
                                  className="flex items-center gap-2 p-2 border border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                                >
                                  <Video className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">
                                    {t("editCourse.uploadVideo")}
                                  </span>
                                </label>
                              </div>
                            )}
                          </div>

                          {/* Attachments */}
                          <div>
                            <Label className="text-xs text-muted-foreground mb-2 block">
                              {t("editCourse.attachments")}
                            </Label>
                            
                            {/* Existing Attachments */}
                            {lesson.attachments.length > 0 && (
                              <div className="space-y-1 mb-2">
                                {lesson.attachments.map((att) => (
                                  <div key={att.id} className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                                    <FileText className="w-4 h-4 text-primary" />
                                    <span className="text-sm flex-1 truncate">{att.name}</span>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => removeAttachment(section.id, lesson.id, att.id)}
                                    >
                                      <X className="w-3 h-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Add Attachment */}
                            <div className="relative">
                              <input
                                type="file"
                                multiple
                                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.rar"
                                onChange={(e) => handleAttachmentUpload(section.id, lesson.id, e)}
                                className="hidden"
                                id={`attachment-${lesson.id}`}
                              />
                              <label 
                                htmlFor={`attachment-${lesson.id}`}
                                className="flex items-center gap-2 p-2 border border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                              >
                                <File className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  {t("editCourse.addAttachment")}
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => addLesson(section.id)}
                        className="text-primary"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        {t("createCourse.addLesson")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Submit */}
            <div className="flex gap-4 justify-end">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/dashboard")}
              >
                {t("createCourse.cancel")}
              </Button>
              <Button 
                type="submit" 
                variant="hero"
                disabled={isSubmitting}
                className="min-w-[150px]"
              >
                {isSubmitting ? (
                  <>{t("editCourse.saving")}</>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {t("editCourse.saveChanges")}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditCourse;
