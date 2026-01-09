import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Save
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface CurriculumSection {
  id: string;
  title: string;
  lessons: { id: string; title: string; duration: string }[];
}

const CreateCourse = () => {
  const { t, isRTL, language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    price: "",
    discountPrice: "",
    category: "",
    level: "",
    duration: "",
    thumbnail: null as File | null,
  });

  const [curriculum, setCurriculum] = useState<CurriculumSection[]>([
    { id: "1", title: "", lessons: [{ id: "1-1", title: "", duration: "" }] }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, thumbnail: file }));
    }
  };

  const addSection = () => {
    const newId = String(curriculum.length + 1);
    setCurriculum(prev => [...prev, { 
      id: newId, 
      title: "", 
      lessons: [{ id: `${newId}-1`, title: "", duration: "" }] 
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
        return { ...s, lessons: [...s.lessons, { id: newLessonId, title: "", duration: "" }] };
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
      title: t("createCourse.successTitle"),
      description: t("createCourse.successMessage"),
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
            {t("createCourse.backToDashboard")}
          </Link>

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t("createCourse.title")}
            </h1>
            <p className="text-muted-foreground">
              {t("createCourse.subtitle")}
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
                      onChange={handleFileChange}
                      className="hidden"
                      id="thumbnail"
                    />
                    <label htmlFor="thumbnail" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {formData.thumbnail 
                          ? formData.thumbnail.name 
                          : t("createCourse.uploadThumbnail")}
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Curriculum */}
            <section className="bg-card rounded-2xl border border-border/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  {t("createCourse.curriculum")}
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

                    <div className="space-y-3 ml-4">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="flex items-center gap-2">
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
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                {t("createCourse.cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    {t("createCourse.creating")}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {t("createCourse.createCourse")}
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

export default CreateCourse;
