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
  Bell,
  Settings,
  LogOut,
  User,
  TrendingUp,
  Calendar
} from "lucide-react";

const enrolledCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    progress: 65,
    nextLesson: "CSS Flexbox & Grid",
    image: "from-primary/30 to-accent/20",
  },
  {
    id: 2,
    title: "React & Next.js Advanced Course",
    instructor: "Alex Thompson",
    progress: 32,
    nextLesson: "Server Components",
    image: "from-accent/30 to-primary/20",
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    instructor: "Emma Williams",
    progress: 89,
    nextLesson: "Final Project",
    image: "from-primary/20 to-accent/30",
  },
];

const achievements = [
  { icon: "🎯", title: "First Course", description: "Enrolled in your first course" },
  { icon: "📚", title: "Bookworm", description: "Completed 5 lessons in one day" },
  { icon: "⭐", title: "Rising Star", description: "Earned your first certificate" },
];

const upcomingDeadlines = [
  { course: "Web Development", task: "JavaScript Quiz", date: "Dec 22" },
  { course: "UI/UX Design", task: "Final Project", date: "Dec 28" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"student" | "admin">("student");

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
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
              </button>
              <Link to="/settings" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Settings className="w-5 h-5" />
              </Link>
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                J
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border/50 p-4 hidden lg:block">
          <nav className="space-y-2">
            {/* Role Toggle */}
            <div className="bg-secondary rounded-lg p-1 mb-6">
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => setActiveTab("student")}
                  className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "student" 
                      ? "bg-card text-foreground shadow-soft" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Student
                </button>
                <button
                  onClick={() => setActiveTab("admin")}
                  className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "admin" 
                      ? "bg-card text-foreground shadow-soft" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            <SidebarLink icon={<BookOpen />} label="My Courses" active />
            <SidebarLink icon={<TrendingUp />} label="Progress" />
            <SidebarLink icon={<Award />} label="Certificates" />
            <SidebarLink icon={<Calendar />} label="Schedule" />
            <SidebarLink icon={<User />} label="Profile" />
            
            <div className="pt-4 border-t border-border mt-4">
              <Link 
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-6 lg:p-8">
          {activeTab === "student" ? (
            <StudentDashboard />
          ) : (
            <AdminDashboard />
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

const StudentDashboard = () => (
  <>
    {/* Welcome */}
    <div className="mb-8">
      <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
        Welcome back, John! 👋
      </h1>
      <p className="text-muted-foreground">
        Continue your learning journey. You're making great progress!
      </p>
    </div>

    {/* Stats */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard icon={<BookOpen />} value="3" label="Enrolled Courses" color="primary" />
      <StatCard icon={<Clock />} value="24h" label="Hours Learned" color="accent" />
      <StatCard icon={<Award />} value="2" label="Certificates" color="primary" />
      <StatCard icon={<TrendingUp />} value="62%" label="Avg. Progress" color="accent" />
    </div>

    {/* Continue Learning */}
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Continue Learning</h2>
        <Link to="/courses" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {enrolledCourses.map((course) => (
          <EnrolledCourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>

    <div className="grid lg:grid-cols-2 gap-6">
      {/* Achievements */}
      <section className="bg-card rounded-2xl border border-border/50 p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Recent Achievements</h2>
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
        <h2 className="text-lg font-bold text-foreground mb-4">Upcoming Deadlines</h2>
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

const AdminDashboard = () => (
  <>
    {/* Welcome */}
    <div className="mb-8">
      <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
        Admin Dashboard 🎛️
      </h1>
      <p className="text-muted-foreground">
        Manage courses, students, and platform analytics.
      </p>
    </div>

    {/* Stats */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard icon={<User />} value="12,458" label="Total Students" color="primary" />
      <StatCard icon={<BookOpen />} value="156" label="Total Courses" color="accent" />
      <StatCard icon={<TrendingUp />} value="$45.2k" label="Revenue" color="primary" />
      <StatCard icon={<Award />} value="892" label="Certificates Issued" color="accent" />
    </div>

    {/* Quick Actions */}
    <section className="mb-8">
      <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <span>Add New Course</span>
        </Button>
        <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
          <User className="w-6 h-6 text-primary" />
          <span>Manage Users</span>
        </Button>
        <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          <span>View Analytics</span>
        </Button>
        <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
          <Settings className="w-6 h-6 text-primary" />
          <span>Settings</span>
        </Button>
      </div>
    </section>

    {/* Recent Activity */}
    <section className="bg-card rounded-2xl border border-border/50 p-6">
      <h2 className="text-lg font-bold text-foreground mb-4">Recent Activity</h2>
      <div className="space-y-4">
        <ActivityItem 
          action="New enrollment" 
          detail="John Doe enrolled in 'Web Development Bootcamp'"
          time="2 min ago"
        />
        <ActivityItem 
          action="Course completed" 
          detail="Sarah Smith completed 'UI/UX Design Masterclass'"
          time="15 min ago"
        />
        <ActivityItem 
          action="New review" 
          detail="5-star review on 'React Advanced Course'"
          time="1 hour ago"
        />
        <ActivityItem 
          action="Certificate issued" 
          detail="Certificate issued to Mike Johnson"
          time="2 hours ago"
        />
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
  image 
}: {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  nextLesson: string;
  image: string;
}) => (
  <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-soft hover:shadow-card transition-all">
    <div className={`aspect-[3/1] bg-gradient-to-br ${image}`} />
    <div className="p-4">
      <h3 className="font-bold text-foreground mb-1 line-clamp-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-3">by {instructor}</p>
      
      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Progress</span>
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
          Next: <span className="text-foreground">{nextLesson}</span>
        </p>
        <Button size="sm" variant="hero">
          <Play className="w-4 h-4" />
          Continue
        </Button>
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
