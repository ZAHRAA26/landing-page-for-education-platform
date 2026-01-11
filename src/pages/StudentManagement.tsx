import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  Search,
  Mail,
  Eye,
  TrendingUp,
  Clock,
  Award,
  Users,
  Filter,
  Send,
  X,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: number;
  name: string;
  email: string;
  avatar: string;
  enrolledCourses: number;
  completedCourses: number;
  avgProgress: number;
  lastActive: string;
  joinDate: string;
  totalHours: number;
  certificates: number;
}

interface StudentCourse {
  id: number;
  title: string;
  progress: number;
  lastAccessed: string;
  status: "in_progress" | "completed" | "not_started";
}

const StudentManagement = () => {
  const { t, isRTL, language } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [messageStudent, setMessageStudent] = useState<Student | null>(null);
  const [messageSubject, setMessageSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");

  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  const students: Student[] = [
    {
      id: 1,
      name: language === "ar" ? "أحمد محمد" : "John Smith",
      email: "john.smith@example.com",
      avatar: "J",
      enrolledCourses: 3,
      completedCourses: 1,
      avgProgress: 65,
      lastActive: language === "ar" ? "منذ ساعتين" : "2 hours ago",
      joinDate: language === "ar" ? "15 يناير 2024" : "Jan 15, 2024",
      totalHours: 48,
      certificates: 1,
    },
    {
      id: 2,
      name: language === "ar" ? "سارة أحمد" : "Emily Davis",
      email: "emily.davis@example.com",
      avatar: "E",
      enrolledCourses: 2,
      completedCourses: 2,
      avgProgress: 100,
      lastActive: language === "ar" ? "منذ 30 دقيقة" : "30 min ago",
      joinDate: language === "ar" ? "3 فبراير 2024" : "Feb 3, 2024",
      totalHours: 72,
      certificates: 2,
    },
    {
      id: 3,
      name: language === "ar" ? "محمد علي" : "Michael Brown",
      email: "michael.brown@example.com",
      avatar: "M",
      enrolledCourses: 4,
      completedCourses: 0,
      avgProgress: 32,
      lastActive: language === "ar" ? "منذ يومين" : "2 days ago",
      joinDate: language === "ar" ? "20 مارس 2024" : "Mar 20, 2024",
      totalHours: 24,
      certificates: 0,
    },
    {
      id: 4,
      name: language === "ar" ? "فاطمة حسن" : "Sarah Wilson",
      email: "sarah.wilson@example.com",
      avatar: "S",
      enrolledCourses: 1,
      completedCourses: 0,
      avgProgress: 89,
      lastActive: language === "ar" ? "منذ 5 ساعات" : "5 hours ago",
      joinDate: language === "ar" ? "10 أبريل 2024" : "Apr 10, 2024",
      totalHours: 36,
      certificates: 0,
    },
    {
      id: 5,
      name: language === "ar" ? "عمر خالد" : "Tom Anderson",
      email: "tom.anderson@example.com",
      avatar: "T",
      enrolledCourses: 2,
      completedCourses: 1,
      avgProgress: 75,
      lastActive: language === "ar" ? "منذ ساعة" : "1 hour ago",
      joinDate: language === "ar" ? "5 مايو 2024" : "May 5, 2024",
      totalHours: 52,
      certificates: 1,
    },
  ];

  const studentCourses: StudentCourse[] = [
    {
      id: 1,
      title: language === "ar" ? "معسكر تطوير الويب الكامل" : "Complete Web Development Bootcamp",
      progress: 65,
      lastAccessed: language === "ar" ? "منذ ساعتين" : "2 hours ago",
      status: "in_progress",
    },
    {
      id: 2,
      title: language === "ar" ? "دورة React و Next.js المتقدمة" : "React & Next.js Advanced Course",
      progress: 32,
      lastAccessed: language === "ar" ? "منذ يوم" : "1 day ago",
      status: "in_progress",
    },
    {
      id: 3,
      title: language === "ar" ? "أساسيات JavaScript للمبتدئين" : "JavaScript Fundamentals for Beginners",
      progress: 100,
      lastAccessed: language === "ar" ? "منذ أسبوع" : "1 week ago",
      status: "completed",
    },
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === "all") return matchesSearch;
    if (filterStatus === "active") return matchesSearch && student.avgProgress > 0;
    if (filterStatus === "inactive") return matchesSearch && student.avgProgress === 0;
    return matchesSearch;
  });

  const handleSendMessage = () => {
    if (!messageSubject.trim() || !messageContent.trim()) {
      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description: language === "ar" ? "يرجى ملء جميع الحقول" : "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: t("studentManagement.messageSent"),
      description: t("studentManagement.messageSuccess"),
    });
    setMessageDialogOpen(false);
    setMessageSubject("");
    setMessageContent("");
    setMessageStudent(null);
  };

  const getStatusBadge = (status: StudentCourse["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-600 border-green-500/30">{t("studentManagement.completed")}</Badge>;
      case "in_progress":
        return <Badge className="bg-primary/20 text-primary border-primary/30">{t("studentManagement.inProgress")}</Badge>;
      case "not_started":
        return <Badge variant="secondary">{t("studentManagement.notStarted")}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
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

      <main className="container mx-auto px-4 py-8">
        {/* Back Button & Title */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowIcon className="w-4 h-4" />
            {t("studentManagement.backToDashboard")}
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">{t("studentManagement.title")}</h1>
          <p className="text-muted-foreground">{t("studentManagement.subtitle")}</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl border border-border/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{students.length}</p>
                <p className="text-sm text-muted-foreground">{t("studentManagement.totalStudents")}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round(students.reduce((acc, s) => acc + s.avgProgress, 0) / students.length)}%
                </p>
                <p className="text-sm text-muted-foreground">{t("studentManagement.avgProgress")}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {students.reduce((acc, s) => acc + s.totalHours, 0)}h
                </p>
                <p className="text-sm text-muted-foreground">{t("studentManagement.totalHours")}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {students.reduce((acc, s) => acc + s.certificates, 0)}
                </p>
                <p className="text-sm text-muted-foreground">{t("studentManagement.certificatesIssued")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-card rounded-xl border border-border/50 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground`} />
              <Input
                placeholder={t("studentManagement.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${isRTL ? 'pr-10' : 'pl-10'}`}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
              >
                <Filter className="w-4 h-4 mr-1" />
                {t("studentManagement.all")}
              </Button>
              <Button
                variant={filterStatus === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("active")}
              >
                {t("studentManagement.active")}
              </Button>
              <Button
                variant={filterStatus === "inactive" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("inactive")}
              >
                {t("studentManagement.inactive")}
              </Button>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("studentManagement.student")}</TableHead>
                <TableHead>{t("studentManagement.courses")}</TableHead>
                <TableHead>{t("studentManagement.progress")}</TableHead>
                <TableHead>{t("studentManagement.lastActive")}</TableHead>
                <TableHead className="text-center">{t("studentManagement.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                        {student.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-foreground">
                      {student.completedCourses}/{student.enrolledCourses}
                    </div>
                    <p className="text-xs text-muted-foreground">{t("studentManagement.completed")}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={student.avgProgress} className="w-24 h-2" />
                      <span className="text-sm font-medium text-foreground">{student.avgProgress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-foreground">{student.lastActive}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedStudent(student)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                                {student.avatar}
                              </div>
                              <div>
                                <p className="text-xl">{student.name}</p>
                                <p className="text-sm font-normal text-muted-foreground">{student.email}</p>
                              </div>
                            </DialogTitle>
                            <DialogDescription>
                              {t("studentManagement.joinedOn")}: {student.joinDate}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="grid grid-cols-3 gap-4 py-4">
                            <div className="text-center p-4 bg-secondary/50 rounded-xl">
                              <p className="text-2xl font-bold text-foreground">{student.totalHours}h</p>
                              <p className="text-sm text-muted-foreground">{t("studentManagement.learningTime")}</p>
                            </div>
                            <div className="text-center p-4 bg-secondary/50 rounded-xl">
                              <p className="text-2xl font-bold text-foreground">{student.certificates}</p>
                              <p className="text-sm text-muted-foreground">{t("studentManagement.certificates")}</p>
                            </div>
                            <div className="text-center p-4 bg-secondary/50 rounded-xl">
                              <p className="text-2xl font-bold text-foreground">{student.avgProgress}%</p>
                              <p className="text-sm text-muted-foreground">{t("studentManagement.avgProgress")}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-foreground mb-3">{t("studentManagement.enrolledCourses")}</h4>
                            <div className="space-y-3">
                              {studentCourses.map((course) => (
                                <div key={course.id} className="p-4 bg-secondary/30 rounded-xl">
                                  <div className="flex items-center justify-between mb-2">
                                    <p className="font-medium text-foreground">{course.title}</p>
                                    {getStatusBadge(course.status)}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Progress value={course.progress} className="flex-1 h-2" />
                                    <span className="text-sm text-muted-foreground">{course.progress}%</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-2">
                                    {t("studentManagement.lastAccessed")}: {course.lastAccessed}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setMessageStudent(student);
                          setMessageDialogOpen(true);
                        }}
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Message Dialog */}
        <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                {t("studentManagement.sendMessage")}
              </DialogTitle>
              <DialogDescription>
                {t("studentManagement.sendMessageTo")}: {messageStudent?.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  {t("studentManagement.subject")}
                </label>
                <Input
                  placeholder={t("studentManagement.subjectPlaceholder")}
                  value={messageSubject}
                  onChange={(e) => setMessageSubject(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  {t("studentManagement.message")}
                </label>
                <Textarea
                  placeholder={t("studentManagement.messagePlaceholder")}
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  rows={5}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setMessageDialogOpen(false)}>
                <X className="w-4 h-4 mr-1" />
                {t("studentManagement.cancel")}
              </Button>
              <Button onClick={handleSendMessage}>
                <Send className="w-4 h-4 mr-1" />
                {t("studentManagement.send")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default StudentManagement;
