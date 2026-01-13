import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  GraduationCap,
  Download,
  Share2,
  Eye,
  Award,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Certificate {
  id: string;
  courseTitle: string;
  instructor: string;
  completionDate: string;
  duration: string;
  studentName: string;
  certificateNumber: string;
}

const Certificates = () => {
  const { t, isRTL, language } = useLanguage();
  const { toast } = useToast();
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const ChevronIcon = isRTL ? ChevronRight : ChevronLeft;

  const certificates: Certificate[] = [
    {
      id: "1",
      courseTitle: language === "ar" ? "معسكر تطوير الويب الكامل" : "Complete Web Development Bootcamp",
      instructor: language === "ar" ? "سارة جونسون" : "Sarah Johnson",
      completionDate: language === "ar" ? "15 ديسمبر 2024" : "December 15, 2024",
      duration: language === "ar" ? "45 ساعة" : "45 hours",
      studentName: language === "ar" ? "جون سميث" : "John Smith",
      certificateNumber: "CERT-2024-WD-001",
    },
    {
      id: "2",
      courseTitle: language === "ar" ? "دورة UI/UX التصميم الشاملة" : "UI/UX Design Masterclass",
      instructor: language === "ar" ? "إيما ويليامز" : "Emma Williams",
      completionDate: language === "ar" ? "10 نوفمبر 2024" : "November 10, 2024",
      duration: language === "ar" ? "32 ساعة" : "32 hours",
      studentName: language === "ar" ? "جون سميث" : "John Smith",
      certificateNumber: "CERT-2024-UX-002",
    },
  ];

  const handleDownloadPDF = async (certificate: Certificate) => {
    if (!certificateRef.current) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${certificate.courseTitle.replace(/\s+/g, "_")}_Certificate.pdf`);

      toast({
        title: t("certificates.downloadSuccess"),
        description: t("certificates.downloadSuccessDesc"),
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: t("certificates.downloadError"),
        description: t("certificates.downloadErrorDesc"),
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async (certificate: Certificate) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t("certificates.shareTitle"),
          text: `${t("certificates.shareText")} ${certificate.courseTitle}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: t("certificates.linkCopied"),
        description: t("certificates.linkCopiedDesc"),
      });
    }
  };

  const openPreview = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsPreviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
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

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Back Link */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronIcon className="w-4 h-4" />
          {t("certificates.backToDashboard")}
        </Link>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t("certificates.title")}</h1>
          <p className="text-muted-foreground">{t("certificates.subtitle")}</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{certificates.length}</p>
                  <p className="text-sm text-muted-foreground">{t("certificates.totalCertificates")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">77h</p>
                  <p className="text-sm text-muted-foreground">{t("certificates.totalLearningHours")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {language === "ar" ? "ديسمبر 2024" : "Dec 2024"}
                  </p>
                  <p className="text-sm text-muted-foreground">{t("certificates.latestCertificate")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates List */}
        {certificates.length === 0 ? (
          <Card className="bg-card border-border/50">
            <CardContent className="p-12 text-center">
              <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">{t("certificates.noCertificates")}</h3>
              <p className="text-muted-foreground mb-4">{t("certificates.noCertificatesDesc")}</p>
              <Link to="/courses">
                <Button variant="hero">{t("certificates.browseCourses")}</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {certificates.map((certificate) => (
              <Card key={certificate.id} className="bg-card border-border/50 overflow-hidden hover:shadow-card transition-all">
                <div className="aspect-[16/10] bg-gradient-to-br from-primary/20 to-accent/20 relative p-6 flex items-center justify-center">
                  <div className="text-center">
                    <Award className="w-16 h-16 text-primary mx-auto mb-2" />
                    <h3 className="text-lg font-bold text-foreground">{certificate.courseTitle}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t("certificates.instructor")}</span>
                      <span className="text-foreground font-medium">{certificate.instructor}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t("certificates.completionDate")}</span>
                      <span className="text-foreground font-medium">{certificate.completionDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t("certificates.duration")}</span>
                      <span className="text-foreground font-medium">{certificate.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t("certificates.certificateId")}</span>
                      <span className="text-foreground font-mono text-xs">{certificate.certificateNumber}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="hero"
                      size="sm"
                      className="flex-1"
                      onClick={() => openPreview(certificate)}
                    >
                      <Eye className="w-4 h-4" />
                      {t("certificates.preview")}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare(certificate)}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Certificate Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("certificates.certificatePreview")}</DialogTitle>
          </DialogHeader>

          {selectedCertificate && (
            <>
              {/* Certificate Template */}
              <div
                ref={certificateRef}
                className="bg-white p-8 rounded-lg border-8 border-primary/20 relative overflow-hidden"
                style={{ aspectRatio: "297/210" }}
              >
                {/* Decorative corners */}
                <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-primary/30 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-primary/30 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-primary/30 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-primary/30 rounded-br-lg" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
                  {/* Logo */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gray-800">
                      Edu<span className="text-primary">Learn</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">
                    {t("certificates.certificateOfCompletion")}
                  </h1>
                  <p className="text-gray-500 mb-6">{t("certificates.thisIsToConfirm")}</p>

                  {/* Student Name */}
                  <h2 className="text-4xl font-serif font-bold text-primary mb-2">
                    {selectedCertificate.studentName}
                  </h2>
                  <p className="text-gray-500 mb-6">{t("certificates.hasCompleted")}</p>

                  {/* Course Name */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    "{selectedCertificate.courseTitle}"
                  </h3>

                  {/* Details */}
                  <div className="flex items-center gap-8 text-sm text-gray-600 mb-8">
                    <div>
                      <span className="font-medium">{t("certificates.instructor")}:</span>{" "}
                      {selectedCertificate.instructor}
                    </div>
                    <div>
                      <span className="font-medium">{t("certificates.duration")}:</span>{" "}
                      {selectedCertificate.duration}
                    </div>
                    <div>
                      <span className="font-medium">{t("certificates.date")}:</span>{" "}
                      {selectedCertificate.completionDate}
                    </div>
                  </div>

                  {/* Certificate ID */}
                  <p className="text-xs text-gray-400 font-mono">
                    {t("certificates.certificateId")}: {selectedCertificate.certificateNumber}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <Button
                  variant="hero"
                  className="flex-1"
                  onClick={() => handleDownloadPDF(selectedCertificate)}
                  disabled={isDownloading}
                >
                  <Download className="w-4 h-4" />
                  {isDownloading ? t("certificates.downloading") : t("certificates.downloadPDF")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare(selectedCertificate)}
                >
                  <Share2 className="w-4 h-4" />
                  {t("certificates.share")}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Certificates;
