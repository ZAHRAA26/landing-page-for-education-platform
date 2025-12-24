import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Clock, User, ArrowRight } from "lucide-react";
import { useState } from "react";

const articles = [
  {
    id: "1",
    title: "10 Essential Skills Every Developer Should Master in 2024",
    excerpt: "Discover the most in-demand programming skills that will help you stay ahead in the tech industry and advance your career.",
    category: "Career",
    author: "Sarah Johnson",
    date: "Dec 20, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    featured: true
  },
  {
    id: "2",
    title: "How to Build Your First Machine Learning Model",
    excerpt: "A beginner-friendly guide to understanding machine learning concepts and building your first predictive model from scratch.",
    category: "AI & ML",
    author: "Dr. Michael Chen",
    date: "Dec 18, 2024",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
    featured: true
  },
  {
    id: "3",
    title: "The Future of Remote Learning: Trends to Watch",
    excerpt: "Explore emerging trends in online education and how technology is reshaping the way we learn and teach.",
    category: "Education",
    author: "Emily Rodriguez",
    date: "Dec 15, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    featured: false
  },
  {
    id: "4",
    title: "Mastering React: Advanced Patterns and Best Practices",
    excerpt: "Level up your React skills with advanced component patterns, performance optimization techniques, and modern hooks.",
    category: "Development",
    author: "Alex Thompson",
    date: "Dec 12, 2024",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    featured: false
  },
  {
    id: "5",
    title: "Why Soft Skills Matter More Than Ever in Tech",
    excerpt: "Technical skills get you hired, but soft skills help you thrive. Learn how to develop communication, leadership, and teamwork.",
    category: "Career",
    author: "Jessica Park",
    date: "Dec 10, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop",
    featured: false
  },
  {
    id: "6",
    title: "Introduction to Cloud Computing for Beginners",
    excerpt: "Understanding cloud infrastructure, services, and how to leverage AWS, Azure, and Google Cloud for your projects.",
    category: "Cloud",
    author: "David Kim",
    date: "Dec 8, 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    featured: false
  }
];

const categories = ["All", "Career", "Development", "AI & ML", "Education", "Cloud"];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = filteredArticles.filter(a => a.featured);
  const regularArticles = filteredArticles.filter(a => !a.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Our Blog
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Insights & <span className="gradient-text">Resources</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Stay updated with the latest trends in education, technology, and career development 
            through our expert-written articles.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-4 px-4 border-b border-border/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-foreground mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Link key={article.id} to={`/blog/${article.id}`}>
                  <Card className="overflow-hidden border-border/50 hover:shadow-card transition-all duration-300 group h-full">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-3">{article.category}</Badge>
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {article.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {article.date}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
          </h2>
          {regularArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <Link key={article.id} to={`/blog/${article.id}`}>
                  <Card className="overflow-hidden border-border/50 hover:shadow-card transition-all duration-300 group h-full">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-5">
                      <Badge variant="secondary" className="mb-2 text-xs">{article.category}</Badge>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="gradient-primary p-8 md:p-12 text-center border-0">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
              Get the latest articles, tutorials, and learning tips delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary" className="shrink-0">
                Subscribe <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
