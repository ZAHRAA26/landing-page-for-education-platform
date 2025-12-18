import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Software Developer",
    company: "Google",
    content: "EduLearn completely transformed my career. The courses are comprehensive, well-structured, and the instructors are genuinely passionate about teaching.",
    rating: 5,
    avatar: "A",
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "UX Designer",
    company: "Spotify",
    content: "I went from knowing nothing about design to landing my dream job. The hands-on projects and mentor feedback were invaluable.",
    rating: 5,
    avatar: "M",
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Data Analyst",
    company: "Amazon",
    content: "The data science curriculum here is top-notch. Real-world projects and industry-relevant skills helped me stand out in interviews.",
    rating: 5,
    avatar: "J",
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            What Our Students
            <span className="text-gradient"> Say</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of satisfied learners who have transformed their careers with our platform.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  index: number;
}

const TestimonialCard = ({
  name,
  role,
  company,
  content,
  rating,
  avatar,
  index,
}: TestimonialCardProps) => (
  <div
    className="relative p-6 lg:p-8 bg-card rounded-2xl border border-border/50 shadow-soft hover:shadow-card transition-all duration-300"
    style={{ animationDelay: `${index * 0.15}s` }}
  >
    {/* Quote Icon */}
    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
      <Quote className="w-5 h-5 text-primary" />
    </div>

    {/* Rating */}
    <div className="flex gap-1 mb-4">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-5 h-5 text-accent fill-accent" />
      ))}
    </div>

    {/* Content */}
    <p className="text-foreground leading-relaxed mb-6">"{content}"</p>

    {/* Author */}
    <div className="flex items-center gap-4 pt-4 border-t border-border">
      <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
        {avatar}
      </div>
      <div>
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">
          {role} at {company}
        </p>
      </div>
    </div>
  </div>
);
