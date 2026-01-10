import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  BookOpen, 
  Star,
  Eye,
  Clock
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  ResponsiveContainer
} from "recharts";

const TeacherAnalytics = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("30");

  // Sample data for charts
  const revenueData = [
    { month: language === 'ar' ? 'يناير' : 'Jan', revenue: 1200, students: 45 },
    { month: language === 'ar' ? 'فبراير' : 'Feb', revenue: 1800, students: 62 },
    { month: language === 'ar' ? 'مارس' : 'Mar', revenue: 2400, students: 78 },
    { month: language === 'ar' ? 'أبريل' : 'Apr', revenue: 2100, students: 71 },
    { month: language === 'ar' ? 'مايو' : 'May', revenue: 2800, students: 89 },
    { month: language === 'ar' ? 'يونيو' : 'Jun', revenue: 3200, students: 105 },
  ];

  const coursePerformance = [
    { 
      name: language === 'ar' ? 'أساسيات البرمجة' : 'Programming Basics', 
      students: 156, 
      rating: 4.8, 
      revenue: 4680,
      completion: 78
    },
    { 
      name: language === 'ar' ? 'تطوير الويب' : 'Web Development', 
      students: 98, 
      rating: 4.6, 
      revenue: 2940,
      completion: 65
    },
    { 
      name: language === 'ar' ? 'تطبيقات الموبايل' : 'Mobile Apps', 
      students: 67, 
      rating: 4.9, 
      revenue: 2010,
      completion: 82
    },
  ];

  const engagementData = [
    { day: language === 'ar' ? 'السبت' : 'Sat', views: 120, completions: 45 },
    { day: language === 'ar' ? 'الأحد' : 'Sun', views: 180, completions: 67 },
    { day: language === 'ar' ? 'الإثنين' : 'Mon', views: 250, completions: 89 },
    { day: language === 'ar' ? 'الثلاثاء' : 'Tue', views: 220, completions: 78 },
    { day: language === 'ar' ? 'الأربعاء' : 'Wed', views: 280, completions: 95 },
    { day: language === 'ar' ? 'الخميس' : 'Thu', views: 200, completions: 72 },
    { day: language === 'ar' ? 'الجمعة' : 'Fri', views: 150, completions: 55 },
  ];

  const studentDistribution = [
    { name: language === 'ar' ? 'مبتدئ' : 'Beginner', value: 45, color: 'hsl(var(--chart-1))' },
    { name: language === 'ar' ? 'متوسط' : 'Intermediate', value: 35, color: 'hsl(var(--chart-2))' },
    { name: language === 'ar' ? 'متقدم' : 'Advanced', value: 20, color: 'hsl(var(--chart-3))' },
  ];

  const chartConfig = {
    revenue: {
      label: t('analytics.revenue'),
      color: "hsl(var(--chart-1))",
    },
    students: {
      label: t('analytics.students'),
      color: "hsl(var(--chart-2))",
    },
    views: {
      label: t('analytics.views'),
      color: "hsl(var(--chart-3))",
    },
    completions: {
      label: t('analytics.completions'),
      color: "hsl(var(--chart-4))",
    },
  };

  const stats = [
    {
      title: t('analytics.totalRevenue'),
      value: "$13,550",
      change: "+23%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: t('analytics.totalStudents'),
      value: "321",
      change: "+18%",
      trend: "up",
      icon: Users,
    },
    {
      title: t('analytics.avgRating'),
      value: "4.7",
      change: "+0.2",
      trend: "up",
      icon: Star,
    },
    {
      title: t('analytics.courseViews'),
      value: "1,420",
      change: "-5%",
      trend: "down",
      icon: Eye,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className={`h-5 w-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{t('analytics.title')}</h1>
                <p className="text-muted-foreground">{t('analytics.subtitle')}</p>
              </div>
            </div>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('analytics.selectPeriod')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">{t('analytics.last7Days')}</SelectItem>
                <SelectItem value="30">{t('analytics.last30Days')}</SelectItem>
                <SelectItem value="90">{t('analytics.last90Days')}</SelectItem>
                <SelectItem value="365">{t('analytics.lastYear')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <div className={`flex items-center gap-1 mt-1 text-sm ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span>{stat.change}</span>
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <Tabs defaultValue="revenue" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="revenue">{t('analytics.revenueTab')}</TabsTrigger>
              <TabsTrigger value="students">{t('analytics.studentsTab')}</TabsTrigger>
              <TabsTrigger value="engagement">{t('analytics.engagementTab')}</TabsTrigger>
              <TabsTrigger value="courses">{t('analytics.coursesTab')}</TabsTrigger>
            </TabsList>

            {/* Revenue Tab */}
            <TabsContent value="revenue" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('analytics.revenueOverTime')}</CardTitle>
                  <CardDescription>{t('analytics.revenueDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="hsl(var(--chart-1))" 
                        fill="hsl(var(--chart-1))" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Students Tab */}
            <TabsContent value="students" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('analytics.studentGrowth')}</CardTitle>
                    <CardDescription>{t('analytics.studentGrowthDesc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="students" 
                          stroke="hsl(var(--chart-2))" 
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--chart-2))" }}
                        />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t('analytics.studentDistribution')}</CardTitle>
                    <CardDescription>{t('analytics.studentDistDesc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                      <PieChart>
                        <Pie
                          data={studentDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {studentDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Engagement Tab */}
            <TabsContent value="engagement" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('analytics.weeklyEngagement')}</CardTitle>
                  <CardDescription>{t('analytics.engagementDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <BarChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="views" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="completions" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('analytics.coursePerformance')}</CardTitle>
                  <CardDescription>{t('analytics.coursePerformanceDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {coursePerformance.map((course, index) => (
                      <div 
                        key={index}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4 mb-3 md:mb-0">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{course.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="h-3 w-3" />
                              <span>{course.students} {t('analytics.students')}</span>
                              <span>•</span>
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{course.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">{t('analytics.revenue')}</p>
                            <p className="font-semibold text-green-600">${course.revenue}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">{t('analytics.completion')}</p>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${course.completion}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{course.completion}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TeacherAnalytics;
