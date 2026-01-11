import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  Bell,
  UserPlus,
  MessageCircle,
  Award,
  TrendingUp,
  Check,
  Trash2,
  Filter,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: number;
  type: "enrollment" | "question" | "review" | "milestone";
  title: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
  course?: string;
}

const Notifications = () => {
  const { t, isRTL, language } = useLanguage();
  const { toast } = useToast();
  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  const initialNotifications: Notification[] = [
    {
      id: 1,
      type: "enrollment",
      title: language === "ar" ? "طالب جديد مسجل" : "New Student Enrolled",
      message: language === "ar" 
        ? "سجل أحمد محمد في دورة 'معسكر تطوير الويب الكامل'" 
        : "John Smith enrolled in 'Complete Web Development Bootcamp'",
      time: language === "ar" ? "منذ 5 دقائق" : "5 minutes ago",
      date: language === "ar" ? "اليوم" : "Today",
      read: false,
      course: language === "ar" ? "معسكر تطوير الويب" : "Web Development Bootcamp",
    },
    {
      id: 2,
      type: "question",
      title: language === "ar" ? "سؤال جديد" : "New Question",
      message: language === "ar" 
        ? "سارة أحمد سألت: كيف أنشئ API في Node.js؟" 
        : "Emily Davis asked: How do I create an API in Node.js?",
      time: language === "ar" ? "منذ 20 دقيقة" : "20 minutes ago",
      date: language === "ar" ? "اليوم" : "Today",
      read: false,
      course: language === "ar" ? "دورة React المتقدمة" : "React Advanced Course",
    },
    {
      id: 3,
      type: "review",
      title: language === "ar" ? "تقييم جديد" : "New Review",
      message: language === "ar" 
        ? "حصلت دورتك على تقييم 5 نجوم من محمد علي" 
        : "Your course received a 5-star review from Michael Brown",
      time: language === "ar" ? "منذ ساعة" : "1 hour ago",
      date: language === "ar" ? "اليوم" : "Today",
      read: false,
      course: language === "ar" ? "أساسيات JavaScript" : "JavaScript Fundamentals",
    },
    {
      id: 4,
      type: "milestone",
      title: language === "ar" ? "إنجاز جديد!" : "New Milestone!",
      message: language === "ar" 
        ? "تجاوز عدد طلابك 1000 طالب! 🎉" 
        : "You've reached 1,000 students! 🎉",
      time: language === "ar" ? "منذ 3 ساعات" : "3 hours ago",
      date: language === "ar" ? "اليوم" : "Today",
      read: true,
    },
    {
      id: 5,
      type: "enrollment",
      title: language === "ar" ? "طالب جديد مسجل" : "New Student Enrolled",
      message: language === "ar" 
        ? "سجلت فاطمة حسن في دورة 'React و Next.js المتقدمة'" 
        : "Sarah Wilson enrolled in 'React & Next.js Advanced Course'",
      time: language === "ar" ? "منذ 5 ساعات" : "5 hours ago",
      date: language === "ar" ? "اليوم" : "Today",
      read: true,
      course: language === "ar" ? "React المتقدمة" : "React Advanced",
    },
    {
      id: 6,
      type: "question",
      title: language === "ar" ? "سؤال جديد" : "New Question",
      message: language === "ar" 
        ? "عمر خالد سأل: ما الفرق بين useState و useReducer؟" 
        : "Tom Anderson asked: What's the difference between useState and useReducer?",
      time: language === "ar" ? "أمس" : "Yesterday",
      date: language === "ar" ? "أمس" : "Yesterday",
      read: true,
      course: language === "ar" ? "دورة React المتقدمة" : "React Advanced Course",
    },
    {
      id: 7,
      type: "enrollment",
      title: language === "ar" ? "تسجيلات متعددة" : "Multiple Enrollments",
      message: language === "ar" 
        ? "سجل 5 طلاب جدد في دوراتك اليوم" 
        : "5 new students enrolled in your courses today",
      time: language === "ar" ? "أمس" : "Yesterday",
      date: language === "ar" ? "أمس" : "Yesterday",
      read: true,
    },
    {
      id: 8,
      type: "review",
      title: language === "ar" ? "تقييم إيجابي" : "Positive Review",
      message: language === "ar" 
        ? "حصلت على تقييم 4.5 نجوم مع تعليق إيجابي" 
        : "You received a 4.5-star rating with a positive comment",
      time: language === "ar" ? "منذ يومين" : "2 days ago",
      date: language === "ar" ? "هذا الأسبوع" : "This Week",
      read: true,
      course: language === "ar" ? "معسكر تطوير الويب" : "Web Development Bootcamp",
    },
  ];

  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "enrollment":
        return <UserPlus className="w-5 h-5 text-green-500" />;
      case "question":
        return <MessageCircle className="w-5 h-5 text-primary" />;
      case "review":
        return <Award className="w-5 h-5 text-yellow-500" />;
      case "milestone":
        return <TrendingUp className="w-5 h-5 text-accent" />;
    }
  };

  const getTypeLabel = (type: Notification["type"]) => {
    switch (type) {
      case "enrollment":
        return t("notifications.newEnrollment");
      case "question":
        return t("notifications.newQuestion");
      case "review":
        return t("notifications.newReview");
      case "milestone":
        return t("notifications.milestone");
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !n.read;
    return n.type === activeTab;
  });

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast({
      title: t("notifications.allMarkedRead"),
      description: t("notifications.allMarkedReadDesc"),
    });
  };

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast({
      title: t("notifications.deleted"),
      description: t("notifications.deletedDesc"),
    });
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast({
      title: t("notifications.clearedAll"),
      description: t("notifications.clearedAllDesc"),
    });
  };

  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce((acc, notification) => {
    const date = notification.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(notification);
    return acc;
  }, {} as Record<string, Notification[]>);

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
            {t("notifications.backToDashboard")}
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <Bell className="w-8 h-8 text-primary" />
                {t("notifications.title")}
                {unreadCount > 0 && (
                  <Badge className="bg-accent text-accent-foreground">
                    {unreadCount} {t("notifications.unread")}
                  </Badge>
                )}
              </h1>
              <p className="text-muted-foreground">{t("notifications.subtitle")}</p>
            </div>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button variant="outline" onClick={handleMarkAllAsRead}>
                  <Check className="w-4 h-4 mr-2" />
                  {t("notifications.markAllRead")}
                </Button>
              )}
              {notifications.length > 0 && (
                <Button variant="outline" onClick={handleClearAll}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t("notifications.clearAll")}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              {t("notifications.all")}
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              {t("notifications.unreadTab")}
            </TabsTrigger>
            <TabsTrigger value="enrollment" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              {t("notifications.enrollments")}
            </TabsTrigger>
            <TabsTrigger value="question" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              {t("notifications.questions")}
            </TabsTrigger>
            <TabsTrigger value="review" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              {t("notifications.reviews")}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Notifications List */}
        <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Bell className="w-16 h-16 mb-4 opacity-30" />
              <p className="text-lg font-medium">{t("notifications.noNotifications")}</p>
              <p className="text-sm">{t("notifications.noNotificationsDesc")}</p>
            </div>
          ) : (
            Object.entries(groupedNotifications).map(([date, items]) => (
              <div key={date}>
                <div className="px-6 py-3 bg-secondary/50 border-b border-border">
                  <h3 className="text-sm font-semibold text-muted-foreground">{date}</h3>
                </div>
                <div className="divide-y divide-border">
                  {items.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-6 hover:bg-secondary/30 transition-colors ${
                        !notification.read ? "bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{getTypeLabel(notification.type)}</Badge>
                              {!notification.read && (
                                <Badge className="bg-accent/20 text-accent border-accent/30">
                                  {t("notifications.new")}
                                </Badge>
                              )}
                              {notification.course && (
                                <Badge variant="outline" className="text-xs">
                                  {notification.course}
                                </Badge>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">{notification.time}</span>
                          </div>
                          <h4 className="text-foreground font-medium mb-1">{notification.title}</h4>
                          <p className="text-muted-foreground text-sm">{notification.message}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleMarkAsRead(notification.id)}
                              title={t("notifications.markAsRead")}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(notification.id)}
                            title={t("notifications.delete")}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
