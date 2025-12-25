import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Search, 
  Star, 
  Clock, 
  Users, 
  Filter,
  ChevronDown
} from "lucide-react";

const allCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    category: "Development",
    instructor: "Sarah Johnson",
    rating: 4.9,
    students: 12500,
    duration: "48 hours",
    price: 89,
    originalPrice: 199,
    image: "from-primary/30 to-accent/20",
    badge: "Bestseller",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Data Science & Machine Learning",
    category: "Data Science",
    instructor: "Michael Chen",
    rating: 4.8,
    students: 8900,
    duration: "52 hours",
    price: 99,
    originalPrice: 249,
    image: "from-accent/30 to-primary/20",
    badge: "Hot",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    category: "Design",
    instructor: "Emma Williams",
    rating: 4.9,
    students: 6700,
    duration: "36 hours",
    price: 79,
    originalPrice: 179,
    image: "from-primary/20 to-accent/30",
    badge: "New",
    level: "Beginner",
  },
  {
    id: 4,
    title: "Digital Marketing Strategy",
    category: "Marketing",
    instructor: "David Brown",
    rating: 4.7,
    students: 5400,
    duration: "28 hours",
    price: 69,
    originalPrice: 149,
    image: "from-accent/20 to-primary/30",
    level: "Beginner",
  },
  {
    id: 5,
    title: "React & Next.js Advanced Course",
    category: "Development",
    instructor: "Alex Thompson",
    rating: 4.9,
    students: 7800,
    duration: "42 hours",
    price: 109,
    originalPrice: 229,
    image: "from-primary/25 to-accent/25",
    badge: "Popular",
    level: "Advanced",
  },
  {
    id: 6,
    title: "Python for Beginners",
    category: "Development",
    instructor: "Lisa Park",
    rating: 4.8,
    students: 15200,
    duration: "32 hours",
    price: 59,
    originalPrice: 129,
    image: "from-accent/25 to-primary/25",
    level: "Beginner",
  },
  {
    id: 7,
    title: "Mobile App Development with Flutter",
    category: "Development",
    instructor: "James Wilson",
    rating: 4.7,
    students: 4300,
    duration: "45 hours",
    price: 89,
    originalPrice: 189,
    image: "from-primary/30 to-accent/15",
    level: "Intermediate",
  },
  {
    id: 8,
    title: "Cybersecurity Fundamentals",
    category: "IT & Security",
    instructor: "Robert Martinez",
    rating: 4.8,
    students: 3900,
    duration: "38 hours",
    price: 99,
    originalPrice: 219,
    image: "from-accent/15 to-primary/30",
    badge: "New",
    level: "Beginner",
  },
];

const categories = ["All", "Development", "Data Science", "Design", "Marketing", "IT & Security"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 49 },
  { label: "$50 - $79", min: 50, max: 79 },
  { label: "$80 - $99", min: 80, max: 99 },
  { label: "$100+", min: 100, max: Infinity },
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All Levels" || course.level === selectedLevel;
    const priceRange = priceRanges.find(p => p.label === selectedPriceRange);
    const matchesPrice = priceRange ? course.price >= priceRange.min && course.price <= priceRange.max : true;
    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 lg:pt-32 pb-12 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Explore Our <span className="text-gradient">Courses</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover hundreds of courses taught by expert instructors
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search courses or instructors..."
                className="pl-12 pr-4 h-14 text-base rounded-xl shadow-soft"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Courses */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-10 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-10 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {priceRanges.map((range) => (
                    <option key={range.label} value={range.label}>{range.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing <span className="font-semibold text-foreground">{filteredCourses.length}</span> courses
          </p>

          {/* Courses Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No courses found</p>
              <Button variant="outline" onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedLevel("All Levels");
                setSelectedPriceRange("All Prices");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

interface CourseCardProps {
  id: number;
  title: string;
  category: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  price: number;
  originalPrice: number;
  image: string;
  badge?: string;
  level: string;
}

const CourseCard = ({
  id,
  title,
  category,
  instructor,
  rating,
  students,
  duration,
  price,
  originalPrice,
  image,
  badge,
  level,
}: CourseCardProps) => (
  <Link 
    to={`/courses/${id}`}
    className="group bg-card rounded-2xl border border-border/50 overflow-hidden shadow-soft hover:shadow-card hover:-translate-y-2 transition-all duration-300"
  >
    {/* Image */}
    <div className={`relative aspect-[4/3] bg-gradient-to-br ${image}`}>
      {badge && (
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
          {badge}
        </span>
      )}
      <span className="absolute top-3 right-3 px-2 py-1 rounded bg-background/80 backdrop-blur-sm text-xs font-medium">
        {level}
      </span>
      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
    </div>

    {/* Content */}
    <div className="p-5">
      <span className="text-xs font-medium text-primary uppercase tracking-wide">
        {category}
      </span>
      <h3 className="text-lg font-bold text-foreground mt-2 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
        {title}
      </h3>

      <p className="text-sm text-muted-foreground mb-4">by {instructor}</p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-accent fill-accent" />
          <span className="font-medium text-foreground">{rating}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{students.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-foreground">${price}</span>
          <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>
        </div>
        <Button size="sm" variant="default">
          Enroll
        </Button>
      </div>
    </div>
  </Link>
);

export default Courses;
