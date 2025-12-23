import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Award, 
  CheckCircle2,
  ArrowLeft,
  Heart,
  Share2,
  PlayCircle,
  FileText,
  Download
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Mock course data
const courseData = {
  id: "1",
  title: "Complete Web Development Bootcamp 2024",
  description: "Master HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and become a full-stack developer ready for the job market.",
  instructor: {
    name: "Dr. Sarah Mitchell",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    title: "Senior Software Engineer",
    bio: "Dr. Sarah Mitchell is a seasoned software engineer with over 15 years of experience in web development. She has worked at top tech companies including Google and Meta, and has taught over 500,000 students worldwide. Her teaching methodology focuses on practical, hands-on learning that prepares students for real-world challenges.",
    courses: 12,
    students: 150000,
    rating: 4.9
  },
  price: 89.99,
  originalPrice: 199.99,
  rating: 4.8,
  totalRatings: 12847,
  students: 45230,
  duration: "42 hours",
  lectures: 320,
  level: "All Levels",
  language: "English",
  lastUpdated: "December 2024",
  thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
  videoPreview: "https://www.w3schools.com/html/mov_bbb.mp4",
  features: [
    "42 hours of on-demand video",
    "320 lectures covering all topics",
    "15 real-world projects",
    "Downloadable resources",
    "Certificate of completion",
    "Lifetime access",
    "Mobile and TV access",
    "30-day money-back guarantee"
  ],
  requirements: [
    "No programming experience needed",
    "A computer with internet access",
    "Desire to learn and build projects"
  ],
  curriculum: [
    {
      title: "Introduction to Web Development",
      duration: "2h 30m",
      lectures: [
        { title: "Welcome to the Course", duration: "5:00", type: "video", free: true },
        { title: "How the Internet Works", duration: "15:00", type: "video", free: true },
        { title: "Setting Up Your Development Environment", duration: "20:00", type: "video", free: false },
        { title: "Course Resources", duration: "2:00", type: "resource", free: true }
      ]
    },
    {
      title: "HTML Fundamentals",
      duration: "4h 15m",
      lectures: [
        { title: "What is HTML?", duration: "10:00", type: "video", free: false },
        { title: "HTML Document Structure", duration: "18:00", type: "video", free: false },
        { title: "Working with Text Elements", duration: "25:00", type: "video", free: false },
        { title: "Links and Images", duration: "30:00", type: "video", free: false },
        { title: "HTML Practice Project", duration: "45:00", type: "video", free: false }
      ]
    },
    {
      title: "CSS Styling",
      duration: "6h 45m",
      lectures: [
        { title: "Introduction to CSS", duration: "12:00", type: "video", free: false },
        { title: "Selectors and Properties", duration: "28:00", type: "video", free: false },
        { title: "Box Model Deep Dive", duration: "35:00", type: "video", free: false },
        { title: "Flexbox Layout", duration: "45:00", type: "video", free: false },
        { title: "CSS Grid Mastery", duration: "50:00", type: "video", free: false },
        { title: "Responsive Design", duration: "40:00", type: "video", free: false }
      ]
    },
    {
      title: "JavaScript Essentials",
      duration: "8h 20m",
      lectures: [
        { title: "JavaScript Basics", duration: "20:00", type: "video", free: false },
        { title: "Variables and Data Types", duration: "30:00", type: "video", free: false },
        { title: "Functions and Scope", duration: "45:00", type: "video", free: false },
        { title: "DOM Manipulation", duration: "55:00", type: "video", free: false },
        { title: "Event Handling", duration: "40:00", type: "video", free: false },
        { title: "Async JavaScript", duration: "60:00", type: "video", free: false }
      ]
    },
    {
      title: "React Framework",
      duration: "10h 30m",
      lectures: [
        { title: "React Introduction", duration: "15:00", type: "video", free: false },
        { title: "Components and Props", duration: "40:00", type: "video", free: false },
        { title: "State Management", duration: "55:00", type: "video", free: false },
        { title: "Hooks Deep Dive", duration: "70:00", type: "video", free: false },
        { title: "Building a Complete App", duration: "120:00", type: "video", free: false }
      ]
    }
  ],
  reviews: [
    {
      id: 1,
      user: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      rating: 5,
      date: "2 weeks ago",
      comment: "This course completely transformed my career! I went from knowing nothing about coding to landing a junior developer position within 6 months. Sarah's teaching style is incredibly clear and engaging."
    },
    {
      id: 2,
      user: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      rating: 5,
      date: "1 month ago",
      comment: "Best investment I've ever made in my education. The projects are practical and relevant, and the community support is amazing. Highly recommend to anyone wanting to break into tech."
    },
    {
      id: 3,
      user: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      rating: 4,
      date: "1 month ago",
      comment: "Great comprehensive course covering all the essentials. Some sections could be more in-depth, but overall an excellent starting point for web development."
    },
    {
      id: 4,
      user: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      rating: 5,
      date: "2 months ago",
      comment: "The curriculum is well-structured and up-to-date with the latest industry practices. The React section alone is worth the price of the entire course!"
    }
  ]
};

const ratingDistribution = [
  { stars: 5, percentage: 78 },
  { stars: 4, percentage: 15 },
  { stars: 3, percentage: 5 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 }
];

const CourseDetail = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);

  const totalLectures = courseData.curriculum.reduce(
    (acc, section) => acc + section.lectures.length, 
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Video */}
      <section className="bg-gradient-to-b from-primary/10 to-background pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Link 
            to="/courses" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Bestseller</Badge>
                <Badge variant="outline">{courseData.level}</Badge>
                <Badge variant="outline">Updated {courseData.lastUpdated}</Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {courseData.title}
              </h1>
              
              <p className="text-lg text-muted-foreground">
                {courseData.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{courseData.rating}</span>
                  <span className="text-muted-foreground">({courseData.totalRatings.toLocaleString()} ratings)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {courseData.students.toLocaleString()} students
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={courseData.instructor.avatar} />
                  <AvatarFallback>{courseData.instructor.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">Created by</p>
                  <p className="font-medium text-foreground">{courseData.instructor.name}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {courseData.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {courseData.lectures} lectures
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  Certificate included
                </span>
              </div>
            </div>
            
            {/* Video Preview & Enrollment Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 overflow-hidden border-border/50 shadow-xl">
                <div className="relative aspect-video bg-muted">
                  {isPlaying ? (
                    <video 
                      src={courseData.videoPreview}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <img 
                        src={courseData.thumbnail} 
                        alt={courseData.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors group"
                      >
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-primary-foreground ml-1" />
                        </div>
                      </button>
                      <span className="absolute bottom-4 left-4 text-white text-sm font-medium">
                        Preview this course
                      </span>
                    </>
                  )}
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">${courseData.price}</span>
                    <span className="text-lg text-muted-foreground line-through">${courseData.originalPrice}</span>
                    <Badge variant="destructive" className="ml-2">
                      {Math.round((1 - courseData.price / courseData.originalPrice) * 100)}% off
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      Enroll Now
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      Add to Wishlist
                      <Heart className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  
                  <p className="text-center text-sm text-muted-foreground">
                    30-Day Money-Back Guarantee
                  </p>
                  
                  <div className="pt-4 border-t border-border space-y-3">
                    <h4 className="font-semibold text-foreground">This course includes:</h4>
                    <ul className="space-y-2">
                      {courseData.features.slice(0, 6).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button variant="ghost" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Course Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="lg:max-w-2xl space-y-12">
            
            {/* What You'll Learn */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">What you'll learn</h2>
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Build 15+ real-world web projects",
                      "Master HTML5, CSS3, and modern JavaScript",
                      "Create responsive websites from scratch",
                      "Learn React and build single-page applications",
                      "Understand backend development with Node.js",
                      "Work with databases like MongoDB",
                      "Deploy applications to the cloud",
                      "Write clean, maintainable code"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Requirements */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Requirements</h2>
              <ul className="space-y-3">
                {courseData.requirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Curriculum */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Course Curriculum</h2>
                <span className="text-sm text-muted-foreground">
                  {courseData.curriculum.length} sections • {totalLectures} lectures • {courseData.duration}
                </span>
              </div>
              
              <Accordion type="multiple" className="space-y-3">
                {courseData.curriculum.map((section, sectionIndex) => (
                  <AccordionItem 
                    key={sectionIndex} 
                    value={`section-${sectionIndex}`}
                    className="border border-border/50 rounded-lg px-4 data-[state=open]:bg-muted/30"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex flex-col items-start text-left">
                        <span className="font-semibold text-foreground">{section.title}</span>
                        <span className="text-sm text-muted-foreground">
                          {section.lectures.length} lectures • {section.duration}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 pb-4">
                        {section.lectures.map((lecture, lectureIndex) => (
                          <li 
                            key={lectureIndex}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              {lecture.type === "video" ? (
                                <PlayCircle className="w-4 h-4 text-muted-foreground" />
                              ) : lecture.type === "resource" ? (
                                <Download className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <FileText className="w-4 h-4 text-muted-foreground" />
                              )}
                              <span className="text-foreground">{lecture.title}</span>
                              {lecture.free && (
                                <Badge variant="secondary" className="text-xs">Preview</Badge>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">{lecture.duration}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            {/* Instructor */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Your Instructor</h2>
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={courseData.instructor.avatar} />
                      <AvatarFallback className="text-2xl">{courseData.instructor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{courseData.instructor.name}</h3>
                        <p className="text-muted-foreground">{courseData.instructor.title}</p>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          {courseData.instructor.rating} Instructor Rating
                        </span>
                        <span className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-muted-foreground" />
                          {courseData.instructor.courses} Courses
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          {courseData.instructor.students.toLocaleString()} Students
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {courseData.instructor.bio}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Reviews */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Student Reviews</h2>
              
              {/* Rating Summary */}
              <Card className="border-border/50 mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-foreground">{courseData.rating}</div>
                      <div className="flex justify-center my-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-5 h-5 ${star <= Math.round(courseData.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">Course Rating</p>
                    </div>
                    <div className="flex-1 space-y-2">
                      {ratingDistribution.map((item) => (
                        <div key={item.stars} className="flex items-center gap-3">
                          <div className="flex items-center gap-1 w-12">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-foreground">{item.stars}</span>
                          </div>
                          <Progress value={item.percentage} className="flex-1 h-2" />
                          <span className="text-sm text-muted-foreground w-12">{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Individual Reviews */}
              <div className="space-y-4">
                {courseData.reviews.map((review) => (
                  <Card key={review.id} className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>{review.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-foreground">{review.user}</h4>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-6">
                Show All Reviews
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
