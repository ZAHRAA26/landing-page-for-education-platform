import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  ArrowLeft,
  ArrowRight,
  Trophy,
  Target,
  Clock,
  TrendingUp,
  Award,
  CheckCircle2,
  XCircle,
  BarChart3,
  Calendar,
  Download,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StudentReport = () => {
  const { t, isRTL, language } = useLanguage();
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const [timeRange, setTimeRange] = useState("all");
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = useCallback(async () => {
    if (!reportRef.current) return;
    
    setIsExporting(true);
    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      const fileName = language === 'ar' ? 'تقرير_الأداء.pdf' : 'performance_report.pdf';
      pdf.save(fileName);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setIsExporting(false);
    }
  }, [language]);

  // Sample quiz data
  const quizHistory = [
    {
      id: 1,
      name: language === "ar" ? "اختبار أساسيات JavaScript" : "JavaScript Fundamentals Quiz",
      course: language === "ar" ? "معسكر تطوير الويب" : "Web Dev Bootcamp",
      date: "2024-01-15",
      score: 85,
      totalQuestions: 10,
      correctAnswers: 8,
      timeTaken: 12,
      passed: true,
    },
    {
      id: 2,
      name: language === "ar" ? "اختبار React المتقدم" : "Advanced React Quiz",
      course: language === "ar" ? "معسكر تطوير الويب" : "Web Dev Bootcamp",
      date: "2024-01-20",
      score: 70,
      totalQuestions: 10,
      correctAnswers: 7,
      timeTaken: 14,
      passed: true,
    },
    {
      id: 3,
      name: language === "ar" ? "اختبار CSS Grid" : "CSS Grid Quiz",
      course: language === "ar" ? "معسكر تطوير الويب" : "Web Dev Bootcamp",
      date: "2024-01-25",
      score: 90,
      totalQuestions: 10,
      correctAnswers: 9,
      timeTaken: 10,
      passed: true,
    },
    {
      id: 4,
      name: language === "ar" ? "اختبار Node.js" : "Node.js Quiz",
      course: language === "ar" ? "معسكر تطوير الويب" : "Web Dev Bootcamp",
      date: "2024-02-01",
      score: 60,
      totalQuestions: 10,
      correctAnswers: 6,
      timeTaken: 15,
      passed: false,
    },
    {
      id: 5,
      name: language === "ar" ? "اختبار TypeScript" : "TypeScript Quiz",
      course: language === "ar" ? "معسكر تطوير الويب" : "Web Dev Bootcamp",
      date: "2024-02-10",
      score: 95,
      totalQuestions: 10,
      correctAnswers: 9,
      timeTaken: 11,
      passed: true,
    },
    {
      id: 6,
      name: language === "ar" ? "اختبار قواعد البيانات" : "Database Quiz",
      course: language === "ar" ? "علوم البيانات" : "Data Science",
      date: "2024-02-15",
      score: 80,
      totalQuestions: 10,
      correctAnswers: 8,
      timeTaken: 13,
      passed: true,
    },
  ];

  // Performance over time data
  const performanceData = [
    { month: language === "ar" ? "يناير" : "Jan", score: 78, quizzes: 3 },
    { month: language === "ar" ? "فبراير" : "Feb", score: 82, quizzes: 3 },
    { month: language === "ar" ? "مارس" : "Mar", score: 85, quizzes: 4 },
    { month: language === "ar" ? "أبريل" : "Apr", score: 88, quizzes: 2 },
    { month: language === "ar" ? "مايو" : "May", score: 91, quizzes: 5 },
    { month: language === "ar" ? "يونيو" : "Jun", score: 87, quizzes: 3 },
  ];

  // Subject performance data
  const subjectData = [
    { subject: language === "ar" ? "JavaScript" : "JavaScript", score: 85, fullMark: 100 },
    { subject: language === "ar" ? "React" : "React", score: 78, fullMark: 100 },
    { subject: language === "ar" ? "CSS" : "CSS", score: 92, fullMark: 100 },
    { subject: language === "ar" ? "Node.js" : "Node.js", score: 70, fullMark: 100 },
    { subject: language === "ar" ? "TypeScript" : "TypeScript", score: 88, fullMark: 100 },
    { subject: language === "ar" ? "قواعد البيانات" : "Database", score: 80, fullMark: 100 },
  ];

  // Score distribution data
  const scoreDistribution = [
    { range: "90-100", count: 2, color: "hsl(var(--chart-1))" },
    { range: "80-89", count: 2, color: "hsl(var(--chart-2))" },
    { range: "70-79", count: 1, color: "hsl(var(--chart-3))" },
    { range: "60-69", count: 1, color: "hsl(var(--chart-4))" },
    { range: "0-59", count: 0, color: "hsl(var(--chart-5))" },
  ];

  // Calculate statistics
  const totalQuizzes = quizHistory.length;
  const passedQuizzes = quizHistory.filter((q) => q.passed).length;
  const averageScore = Math.round(
    quizHistory.reduce((acc, q) => acc + q.score, 0) / totalQuizzes
  );
  const averageTime = Math.round(
    quizHistory.reduce((acc, q) => acc + q.timeTaken, 0) / totalQuizzes
  );
  const bestScore = Math.max(...quizHistory.map((q) => q.score));
  const passRate = Math.round((passedQuizzes / totalQuizzes) * 100);

  const chartConfig = {
    score: {
      label: t("report.score"),
      color: "hsl(var(--chart-1))",
    },
    quizzes: {
      label: t("report.quizzes"),
      color: "hsl(var(--chart-2))",
    },
  };

  const stats = [
    {
      icon: BarChart3,
      label: t("report.totalQuizzes"),
      value: totalQuizzes,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Trophy,
      label: t("report.passedQuizzes"),
      value: passedQuizzes,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Target,
      label: t("report.averageScore"),
      value: `${averageScore}%`,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Clock,
      label: t("report.averageTime"),
      value: `${averageTime} ${t("report.min")}`,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: Award,
      label: t("report.bestScore"),
      value: `${bestScore}%`,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: TrendingUp,
      label: t("report.passRate"),
      value: `${passRate}%`,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
              >
                <BackArrow className="w-4 h-4" />
                {t("report.backToDashboard")}
              </Link>
              <h1 className="text-3xl font-bold text-foreground">
                {t("report.title")}
              </h1>
              <p className="text-muted-foreground mt-1">
                {t("report.subtitle")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="flex items-center gap-2"
              >
                {isExporting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {t("report.exportPDF")}
              </Button>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("report.selectPeriod")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("report.allTime")}</SelectItem>
                  <SelectItem value="month">{t("report.lastMonth")}</SelectItem>
                  <SelectItem value="week">{t("report.lastWeek")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Report Content for PDF Export */}
          <div ref={reportRef}>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div
                    className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center mx-auto mb-3`}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Section */}
          <Tabs defaultValue="performance" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
              <TabsTrigger value="performance">
                {t("report.performanceTab")}
              </TabsTrigger>
              <TabsTrigger value="subjects">
                {t("report.subjectsTab")}
              </TabsTrigger>
              <TabsTrigger value="distribution">
                {t("report.distributionTab")}
              </TabsTrigger>
              <TabsTrigger value="history">
                {t("report.historyTab")}
              </TabsTrigger>
            </TabsList>

            {/* Performance Over Time */}
            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>{t("report.performanceOverTime")}</CardTitle>
                  <CardDescription>
                    {t("report.performanceDesc")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="score"
                          stroke="hsl(var(--chart-1))"
                          fill="hsl(var(--chart-1))"
                          fillOpacity={0.3}
                          name={t("report.score")}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subjects Performance */}
            <TabsContent value="subjects">
              <Card>
                <CardHeader>
                  <CardTitle>{t("report.subjectPerformance")}</CardTitle>
                  <CardDescription>
                    {t("report.subjectDesc")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <ChartContainer config={chartConfig} className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={subjectData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis domain={[0, 100]} />
                          <Radar
                            name={t("report.score")}
                            dataKey="score"
                            stroke="hsl(var(--chart-1))"
                            fill="hsl(var(--chart-1))"
                            fillOpacity={0.5}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                    <div className="space-y-4">
                      {subjectData.map((subject, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{subject.subject}</span>
                            <span className="text-muted-foreground">
                              {subject.score}%
                            </span>
                          </div>
                          <Progress value={subject.score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Score Distribution */}
            <TabsContent value="distribution">
              <Card>
                <CardHeader>
                  <CardTitle>{t("report.scoreDistribution")}</CardTitle>
                  <CardDescription>
                    {t("report.distributionDesc")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <ChartContainer config={chartConfig} className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={scoreDistribution.filter((d) => d.count > 0)}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="count"
                            label={({ range, count }) => `${range}: ${count}`}
                          >
                            {scoreDistribution
                              .filter((d) => d.count > 0)
                              .map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                    <ChartContainer config={chartConfig} className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={scoreDistribution} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="range" type="category" width={80} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="count" name={t("report.quizzes")}>
                            {scoreDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Quiz History Table */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>{t("report.quizHistory")}</CardTitle>
                  <CardDescription>
                    {t("report.historyDesc")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("report.quizName")}</TableHead>
                        <TableHead>{t("report.course")}</TableHead>
                        <TableHead>{t("report.date")}</TableHead>
                        <TableHead className="text-center">
                          {t("report.score")}
                        </TableHead>
                        <TableHead className="text-center">
                          {t("report.questions")}
                        </TableHead>
                        <TableHead className="text-center">
                          {t("report.time")}
                        </TableHead>
                        <TableHead className="text-center">
                          {t("report.status")}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quizHistory.map((quiz) => (
                        <TableRow key={quiz.id}>
                          <TableCell className="font-medium">
                            {quiz.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {quiz.course}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {quiz.date}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <span
                              className={`font-bold ${
                                quiz.score >= 80
                                  ? "text-green-500"
                                  : quiz.score >= 70
                                  ? "text-yellow-500"
                                  : "text-red-500"
                              }`}
                            >
                              {quiz.score}%
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-muted-foreground">
                              {quiz.correctAnswers}/{quiz.totalQuestions}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              {quiz.timeTaken} {t("report.min")}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            {quiz.passed ? (
                              <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                {t("report.passed")}
                              </Badge>
                            ) : (
                              <Badge variant="destructive" className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
                                <XCircle className="w-3 h-3 mr-1" />
                                {t("report.failed")}
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Improvement Tips */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                {t("report.improvementTips")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    {t("report.tip1Title")}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t("report.tip1Desc")}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">
                    {t("report.tip2Title")}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t("report.tip2Desc")}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
                    {t("report.tip3Title")}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t("report.tip3Desc")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentReport;
