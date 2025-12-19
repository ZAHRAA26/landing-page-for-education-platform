import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Clock, Users, ArrowRight } from "lucide-react";

const courses = [
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
  },
];

export const CoursesSection = () => {
  return (
    <section id="courses" className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Popular Courses
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Explore Our Top
              <span className="text-gradient"> Courses</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Hand-picked courses by our experts to help you start your learning journey.
            </p>
          </div>
          <Button variant="outline" size="lg" className="self-start lg:self-auto" asChild>
            <Link to="/courses">
              View All Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Courses Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface CourseCardProps {
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
}

const CourseCard = ({
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
}: CourseCardProps) => (
  <div className="group bg-card rounded-2xl border border-border/50 overflow-hidden shadow-soft hover:shadow-card hover:-translate-y-2 transition-all duration-300">
    {/* Image */}
    <div className={`relative aspect-[4/3] bg-gradient-to-br ${image}`}>
      {badge && (
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
          {badge}
        </span>
      )}
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
  </div>
);
