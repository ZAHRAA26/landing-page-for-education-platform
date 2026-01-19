import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  GraduationCap, 
  BookOpen, 
  Clock, 
  Award, 
  Play,
  ChevronRight,
  ChevronLeft,
  Bell,
  Settings,
  LogOut,
  User,
  TrendingUp,
  Calendar,
  Upload,
  MessageSquare,
  DollarSign,
  BarChart3,
  Users,
  Eye,
  Mail,
  FileBarChart
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import NotificationDropdown, { Notification } from "@/components/NotificationDropdown";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"student" | "teacher" | "admin">("student");
  const { t, isRTL, language } = useLanguage();
  const { user, logout } = useAuth();

  const enrolledCourses = [
    {
      id: 1,
      title: language === "ar" ? "معسكر تطوير الويب الكامل" : "Complete Web Development Bootcamp",
      instructor: language === "ar" ? "سارة جونسون" : "Sarah Johnson",
      progress: 65,
      nextLesson: language === "ar" ? "CSS Flexbox و Grid" : "CSS Flexbox & Grid",
      image: "from-primary/30 to-accent/20",
    },
    {
      id: 2,
      title: language === "ar" ? "دورة React و Next.js المتقدمة" : "React & Next.js Advanced Course",
      instructor: language === "ar" ? "أليكس طومسون" : "Alex Thompson",
      progress: 32,
      nextLesson: language === "ar" ? "مكونات الخادم" : "Server Components",
      image: "from-accent/30 to-primary/20",
    },
    {
      id: 3,
      title: language === "ar" ? "دورة UI/UX التصميم الشاملة" : "UI/UX Design Masterclass",
      instructor: language === "ar" ? "إيما ويليامز" : "Emma Williams",
      progress: 89,
      nextLesson: language === "ar" ? "المشروع النهائي" : "Final Project",
      image: "from-primary/20 to-accent/30",
    },
  ];

  const achievements = [
    { icon: "🎯", title: t("dashboard.firstCourse"), description: t("dashboard.firstCourseDesc") },
    { icon: "📚", title: t("dashboard.bookworm"), description: t("dashboard.bookwormDesc") },
    { icon: "⭐", title: t("dashboard.risingStar"), description: t("dashboard.risingStarDesc") },
  ];

  const upcomingDeadlines = [
    { 
      course: language === "ar" ? "تطوير الويب" : "Web Development", 
      task: language === "ar" ? "اختبار JavaScript" : "JavaScript Quiz", 
      date: language === "ar" ? "22 ديسمبر" : "Dec 22" 
    },
    { 
      course: language === "ar" ? "تصميم UI/UX" : "UI/UX Design", 
      task: language === "ar" ? "المشروع النهائي" : "Final Project", 
      date: language === "ar" ? "28 ديسمبر" : "Dec 28" 
    },
  ];

  const recentActivity = [
    {
      action: language === "ar" ? "تسجيل جديد" : "New enrollment",
      detail: language === "ar" ? "سجل أحمد في 'معسكر تطوير الويب'" : "John Doe enrolled in 'Web Development Bootcamp'",
      time: language === "ar" ? "منذ دقيقتين" : "2 min ago"
    },
    {
      action: language === "ar" ? "إكمال دورة" : "Course completed",
      detail: language === "ar" ? "أكملت سارة دورة 'UI/UX التصميم الشاملة'" : "Sarah Smith completed 'UI/UX Design Masterclass'",
      time: language === "ar" ? "منذ 15 دقيقة" : "15 min ago"
    },
    {
      action: language === "ar" ? "تقييم جديد" : "New review",
      detail: language === "ar" ? "تقييم 5 نجوم على 'دورة React المتقدمة'" : "5-star review on 'React Advanced Course'",
      time: language === "ar" ? "منذ ساعة" : "1 hour ago"
    },
    {
      action: language === "ar" ? "شهادة صادرة" : "Certificate issued",
      detail: language === "ar" ? "تم إصدار شهادة لمحمد أحمد" : "Certificate issued to Mike Johnson",
      time: language === "ar" ? "منذ ساعتين" : "2 hours ago"
    }
  ];

  // Notifications state
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "enrollment",
      title: language === "ar" ? "طالب جديد مسجل" : "New Student Enrolled",
      message: language === "ar" 
        ? "سجل أحمد محمد في دورة 'معسكر تطوير الويب الكامل'" 
        : "John Smith enrolled in 'Complete Web Development Bootcamp'",
      time: language === "ar" ? "منذ 5 دقائق" : "5 min ago",
      read: false,
    },
    {
      id: 2,
      type: "question",
      title: language === "ar" ? "سؤال جديد" : "New Question",
      message: language === "ar" 
        ? "سارة أحمد سألت: كيف أنشئ API في Node.js؟" 
        : "Emily Davis asked: How do I create an API in Node.js?",
      time: language === "ar" ? "منذ 20 دقيقة" : "20 min ago",
      read: false,
    },
    {
      id: 3,
      type: "review",
      title: language === "ar" ? "تقييم جديد" : "New Review",
      message: language === "ar" 
        ? "حصلت دورتك على تقييم 5 نجوم" 
        : "Your course received a 5-star review",
      time: language === "ar" ? "منذ ساعة" : "1 hour ago",
      read: false,
    },
    {
      id: 4,
      type: "milestone",
      title: language === "ar" ? "إنجاز جديد!" : "New Milestone!",
      message: language === "ar" 
        ? "تجاوز عدد طلابك 1000 طالب! 🎉" 
        : "You've reached 1,000 students! 🎉",
      time: language === "ar" ? "منذ 3 ساعات" : "3 hours ago",
      read: true,
    },
  ]);

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const userInitial = user?.name?.[0]?.toUpperCase() ?? (language === "ar" ? "أ" : "U");

  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;

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

            <div className="flex items-center gap-4">
              <NotificationDropdown
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
              />
              <Link to="/settings" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Settings className="w-5 h-5" />
              </Link>
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                {userInitial}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside className={`fixed ${isRTL ? 'right-0' : 'left-0'} top-16 bottom-0 w-64 bg-card border-${isRTL ? 'l' : 'r'} border-border/50 p-4 hidden lg:block`}>
          <nav className="space-y-2">
            {/* Role Toggle */}
            <div className="bg-secondary rounded-lg p-1 mb-6">
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => setActiveTab("student")}
                  className={`py-2 px-2 rounded-md text-xs font-medium transition-colors ${
                    activeTab === "student" 
                      ? "bg-card text-foreground shadow-soft" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t("dashboard.student")}
                </button>
                <button
                  onClick={() => setActiveTab("teacher")}
                  className={`py-2 px-2 rounded-md text-xs font-medium transition-colors ${
                    activeTab === "teacher" 
                      ? "bg-card text-foreground shadow-soft" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t("dashboard.teacher")}
                </button>
                <button
                  onClick={() => setActiveTab("admin")}
                  className={`py-2 px-2 rounded-md text-xs font-medium transition-colors ${
                    activeTab === "admin" 
                      ? "bg-card text-foreground shadow-soft" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t("dashboard.admin")}
                </button>
              </div>
            </div>

            <SidebarLink icon={<BookOpen />} label={t("dashboard.myCourses")} active />
            <SidebarLink icon={<TrendingUp />} label={t("dashboard.progress")} />
            <Link to="/certificates">
              <SidebarLink icon={<Award />} label={t("dashboard.certificates")} />
            </Link>
            <Link to="/student-report">
              <SidebarLink icon={<FileBarChart />} label={t("dashboard.performanceReport")} />
            </Link>
            <SidebarLink icon={<Calendar />} label={t("dashboard.schedule")} />
            <SidebarLink icon={<User />} label={t("dashboard.profile")} />
            
            <div className="pt-4 border-t border-border mt-4">
              <button
                onClick={logout}
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">{t("dashboard.logout")}</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 ${isRTL ? 'lg:mr-64' : 'lg:ml-64'} p-6 lg:p-8`}>
          {activeTab === "student" && (
            <StudentDashboard 
              t={t} 
              isRTL={isRTL} 
              enrolledCourses={enrolledCourses}
              achievements={achievements}
              upcomingDeadlines={upcomingDeadlines}
              ChevronIcon={ChevronIcon}
            />
          )}
          {activeTab === "teacher" && (
            <TeacherDashboard 
              t={t} 
              language={language}
            />
          )}
          {activeTab === "admin" && (
            <AdminDashboard 
              t={t} 
              recentActivity={recentActivity}
            />
          )}
        </main>
      </div>
    </div>
  );
};

const SidebarLink = ({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) => (
  <a
    href="#"
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active 
        ? "bg-primary/10 text-primary font-medium" 
        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
    }`}
  >
    {icon}
    <span>{label}</span>
  </a>
);

interface StudentDashboardProps {
  t: (key: string) => string;
  isRTL: boolean;
  enrolledCourses: Array<{
    id: number;
    title: string;
    instructor: string;
    progress: number;
    nextLesson: string;
    image: string;
  }>;
  achievements: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  upcomingDeadlines: Array<{
    course: string;
    task: string;
    date: string;
  }>;
  ChevronIcon: React.ComponentType<{ className?: string }>;
}

const StudentDashboard = ({ t, isRTL, enrolledCourses, achievements, upcomingDeadlines, ChevronIcon }: StudentDashboardProps) => (
  <>
    {/* Welcome */}
    <div className="mb-8">
      <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
        {t("dashboard.welcomeBack")}
      </h1>
      <p className="text-muted-foreground">
        {t("dashboard.continueJourney")}
      </p>
    </div>

    {/* Stats */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard icon={<BookOpen />} value="3" label={t("dashboard.enrolledCourses")} color="primary" />
      <StatCard icon={<Clock />} value="24h" label={t("dashboard.hoursLearned")} color="accent" />
      <StatCard icon={<Award />} value="2" label={t("dashboard.certificates")} color="primary" />
      <StatCard icon={<TrendingUp />} value="62%" label={t("dashboard.avgProgress")} color="accent" />
    </div>

    {/* Continue Learning */}
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">{t("dashboard.continueLearning")}</h2>
        <Link to="/courses" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
          {t("dashboard.viewAll")} <ChevronIcon className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {enrolledCourses.map((course) => (
          <EnrolledCourseCard key={course.id} {...course} t={t} />
        ))}
      </div>
    </section>

    <div className="grid lg:grid-cols-2 gap-6">
      {/* Achievements */}
      <section className="bg-card rounded-2xl border border-border/50 p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">{t("dashboard.recentAchievements")}</h2>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-secondary/50 rounded-xl">
              <span className="text-2xl">{achievement.icon}</span>
              <div>
                <p className="font-semibold text-foreground">{achievement.title}</p>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Deadlines */}
      <section className="bg-card rounded-2xl border border-border/50 p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">{t("dashboard.upcomingDeadlines")}</h2>
        <div className="space-y-3">
          {upcomingDeadlines.map((deadline, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
              <div>
                <p className="font-semibold text-foreground">{deadline.task}</p>
                <p className="text-sm text-muted-foreground">{deadline.course}</p>
              </div>
              <span className="text-sm font-medium text-accent">{deadline.date}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  </>
);

interface TeacherDashboardProps {
  t: (key: string) => string;
  language: string;
}

const TeacherDashboard = ({ t, language }: TeacherDashboardProps) => {
  const teacherCourses = [
    {
      id: 1,
      title: language === "ar" ? "معسكر تطوير الويب الكامل" : "Complete Web Development Bootcamp",
      students: 1234,
      rating: 4.8,
      revenue: "$12,450",
      image: "from-primary/30 to-accent/20",
    },
    {
      id: 2,
      title: language === "ar" ? "دورة React و Next.js المتقدمة" : "React & Next.js Advanced Course",
      students: 856,
      rating: 4.9,
      revenue: "$8,920",
      image: "from-accent/30 to-primary/20",
    },
    {
      id: 3,
      title: language === "ar" ? "أساسيات JavaScript للمبتدئين" : "JavaScript Fundamentals for Beginners",
      students: 2341,
      rating: 4.7,
      revenue: "$18,750",
      image: "from-primary/20 to-accent/30",
    },
  ];

  const recentEnrollments = [
    {
      student: language === "ar" ? "أحمد محمد" : "John Smith",
      course: language === "ar" ? "تطوير الويب" : "Web Development",
      time: language === "ar" ? "منذ 5 دقائق" : "5 min ago",
    },
    {
      student: language === "ar" ? "سارة أحمد" : "Emily Davis",
      course: language === "ar" ? "React المتقدم" : "React Advanced",
      time: language === "ar" ? "منذ 20 دقيقة" : "20 min ago",
    },
    {
      student: language === "ar" ? "محمد علي" : "Michael Brown",
      course: language === "ar" ? "JavaScript للمبتدئين" : "JavaScript Basics",
      time: language === "ar" ? "منذ ساعة" : "1 hour ago",
    },
  ];

  const pendingQuestions = [
    {
      student: language === "ar" ? "فاطمة حسن" : "Sarah Wilson",
      question: language === "ar" ? "كيف أنشئ API في Node.js؟" : "How do I create an API in Node.js?",
      course: language === "ar" ? "تطوير الويب" : "Web Development",
    },
    {
      student: language === "ar" ? "عمر خالد" : "Tom Anderson",
      question: language === "ar" ? "ما الفرق بين useState و useReducer؟" : "What's the difference between useState and useReducer?",
      course: language === "ar" ? "React المتقدم" : "React Advanced",
    },
  ];

  return (
    <>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
          {t("dashboard.teacherDashboard")}
        </h1>
        <p className="text-muted-foreground">
          {t("dashboard.teacherDescription")}
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<BookOpen />} value="3" label={t("dashboard.myCoursesTaught")} color="primary" />
        <StatCard icon={<User />} value="4,431" label={t("dashboard.totalStudentsEnrolled")} color="accent" />
        <StatCard icon={<TrendingUp />} value="$40,120" label={t("dashboard.courseRevenue")} color="primary" />
        <StatCard icon={<Award />} value="4.8" label={t("dashboard.avgRating")} color="accent" />
      </div>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-4">{t("dashboard.quickActions")}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <Link to="/create-course">
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 w-full">
              <BookOpen className="w-6 h-6 text-primary" />
              <span>{t("dashboard.createCourse")}</span>
            </Button>
          </Link>
          <Link to="/student-management">
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 w-full">
              <Users className="w-6 h-6 text-primary" />
              <span>{t("dashboard.manageStudents")}</span>
            </Button>
          </Link>
          <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
            <Upload className="w-6 h-6 text-primary" />
            <span>{t("dashboard.uploadContent")}</span>
          </Button>
          <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
            <MessageSquare className="w-6 h-6 text-primary" />
            <span>{t("dashboard.respondToQuestions")}</span>
          </Button>
          <Link to="/messages">
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 w-full">
              <Mail className="w-6 h-6 text-primary" />
              <span>{t("dashboard.messages")}</span>
            </Button>
          </Link>
          <Link to="/teacher-analytics">
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 w-full">
              <BarChart3 className="w-6 h-6 text-primary" />
              <span>{t("dashboard.viewAnalyticsPage")}</span>
            </Button>
          </Link>
          <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
            <DollarSign className="w-6 h-6 text-primary" />
            <span>{t("dashboard.withdrawFunds")}</span>
          </Button>
        </div>
      </section>

      {/* My Courses */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-4">{t("dashboard.manageCourses")}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teacherCourses.map((course) => (
            <div key={course.id} className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-soft">
              <div className={`aspect-[3/1] bg-gradient-to-br ${course.image}`} />
              <div className="p-4">
                <h3 className="font-bold text-foreground mb-2 line-clamp-1">{course.title}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" /> {course.students} {t("courseDetail.students")}
                  </span>
                  <span className="flex items-center gap-1">
                    ⭐ {course.rating}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">{course.revenue}</span>
                  <div className="flex gap-2">
                    <Link to={`/course-preview/${course.id}`}>
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link to={`/edit-course/${course.id}`}>
                      <Button size="sm" variant="outline">{t("dashboard.editCourse")}</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Enrollments */}
        <section className="bg-card rounded-2xl border border-border/50 p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">{t("dashboard.recentEnrollments")}</h2>
          <div className="space-y-3">
            {recentEnrollments.map((enrollment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {enrollment.student.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{enrollment.student}</p>
                    <p className="text-sm text-muted-foreground">{enrollment.course}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{enrollment.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pending Questions */}
        <section className="bg-card rounded-2xl border border-border/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">{t("dashboard.pendingQuestions")}</h2>
            <span className="bg-accent/10 text-accent text-xs font-medium px-2 py-1 rounded-full">
              {pendingQuestions.length}
            </span>
          </div>
          <div className="space-y-3">
            {pendingQuestions.map((item, index) => (
              <div key={index} className="p-3 bg-secondary/50 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-foreground">{item.student}</p>
                  <span className="text-xs text-muted-foreground">{item.course}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{item.question}</p>
                <Button size="sm" variant="hero" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  {t("dashboard.respondToQuestions")}
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

interface AdminDashboardProps {
  t: (key: string) => string;
  recentActivity: Array<{
    action: string;
    detail: string;
    time: string;
  }>;
}

const AdminDashboard = ({ t, recentActivity }: AdminDashboardProps) => (
  <>
    {/* Welcome */}
    <div className="mb-8">
      <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
        {t("dashboard.adminDashboard")}
      </h1>
      <p className="text-muted-foreground">
        {t("dashboard.manageDescription")}
      </p>
    </div>

    {/* Stats */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard icon={<User />} value="12,458" label={t("dashboard.totalStudents")} color="primary" />
      <StatCard icon={<BookOpen />} value="156" label={t("dashboard.totalCourses")} color="accent" />
      <StatCard icon={<TrendingUp />} value="$45.2k" label={t("dashboard.revenue")} color="primary" />
      <StatCard icon={<Award />} value="892" label={t("dashboard.certificatesIssued")} color="accent" />
    </div>

    {/* Quick Actions */}
    <section className="mb-8">
      <h2 className="text-xl font-bold text-foreground mb-4">{t("dashboard.quickActions")}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <span>{t("dashboard.addNewCourse")}</span>
        </Button>
        <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
          <User className="w-6 h-6 text-primary" />
          <span>{t("dashboard.manageUsers")}</span>
        </Button>
        <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          <span>{t("dashboard.viewAnalytics")}</span>
        </Button>
        <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
          <Settings className="w-6 h-6 text-primary" />
          <span>{t("dashboard.settings")}</span>
        </Button>
      </div>
    </section>

    {/* Recent Activity */}
    <section className="bg-card rounded-2xl border border-border/50 p-6">
      <h2 className="text-lg font-bold text-foreground mb-4">{t("dashboard.recentActivity")}</h2>
      <div className="space-y-4">
        {recentActivity.map((item, index) => (
          <ActivityItem 
            key={index}
            action={item.action} 
            detail={item.detail}
            time={item.time}
          />
        ))}
      </div>
    </section>
  </>
);

const StatCard = ({ 
  icon, 
  value, 
  label, 
  color 
}: { 
  icon: React.ReactNode; 
  value: string; 
  label: string; 
  color: "primary" | "accent";
}) => (
  <div className="bg-card rounded-2xl border border-border/50 p-5 shadow-soft">
    <div className={`w-12 h-12 rounded-xl ${color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"} flex items-center justify-center mb-3`}>
      {icon}
    </div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

const EnrolledCourseCard = ({ 
  id, 
  title, 
  instructor, 
  progress, 
  nextLesson, 
  image,
  t
}: {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  nextLesson: string;
  image: string;
  t: (key: string) => string;
}) => (
  <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-soft hover:shadow-card transition-all">
    <div className={`aspect-[3/1] bg-gradient-to-br ${image}`} />
    <div className="p-4">
      <h3 className="font-bold text-foreground mb-1 line-clamp-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-3">{t("dashboard.by")} {instructor}</p>
      
      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">{t("dashboard.progress")}</span>
          <span className="font-medium text-foreground">{progress}%</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full gradient-primary rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {t("dashboard.next")} <span className="text-foreground">{nextLesson}</span>
        </p>
        <div className="flex gap-2">
          <Link to={`/course-progress/${id}`}>
            <Button size="sm" variant="outline">
              {t("progress.trackProgress")}
            </Button>
          </Link>
          <Button size="sm" variant="hero">
            <Play className="w-4 h-4" />
            {t("dashboard.continue")}
          </Button>
        </div>
      </div>
    </div>
  </div>
);

const ActivityItem = ({ action, detail, time }: { action: string; detail: string; time: string }) => (
  <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl">
    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
    <div className="flex-1">
      <p className="font-medium text-foreground">{action}</p>
      <p className="text-sm text-muted-foreground">{detail}</p>
    </div>
    <span className="text-xs text-muted-foreground whitespace-nowrap">{time}</span>
  </div>
);

export default Dashboard;