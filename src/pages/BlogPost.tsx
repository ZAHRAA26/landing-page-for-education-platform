import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Heart,
  Twitter,
  Linkedin,
  Facebook
} from "lucide-react";

const articles = [
  {
    id: "1",
    title: "10 Essential Skills Every Developer Should Master in 2024",
    excerpt: "Discover the most in-demand programming skills that will help you stay ahead in the tech industry and advance your career.",
    category: "Career",
    author: {
      name: "Sarah Johnson",
      role: "Senior Tech Writer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    date: "Dec 20, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop",
    content: `
      <p>The tech industry is constantly evolving, and staying relevant means continuously updating your skill set. In 2024, developers face new challenges and opportunities that require a diverse range of abilities.</p>
      
      <h2>1. Cloud Computing & DevOps</h2>
      <p>Understanding cloud platforms like AWS, Azure, and Google Cloud is no longer optional. Combined with DevOps practices, these skills enable faster deployment cycles and more reliable applications.</p>
      
      <h2>2. AI & Machine Learning Integration</h2>
      <p>Even if you're not a data scientist, understanding how to integrate AI tools and APIs into applications is becoming essential. From chatbots to recommendation systems, AI is everywhere.</p>
      
      <h2>3. Cybersecurity Fundamentals</h2>
      <p>With increasing cyber threats, every developer needs to understand security best practices. This includes secure coding, authentication systems, and data protection.</p>
      
      <h2>4. API Design & Development</h2>
      <p>RESTful APIs, GraphQL, and microservices architecture are fundamental to modern software development. Mastering these enables building scalable, maintainable systems.</p>
      
      <h2>5. Modern JavaScript Frameworks</h2>
      <p>React, Vue, and Angular continue to dominate frontend development. Deep knowledge of at least one framework, along with TypeScript, is crucial.</p>
      
      <h2>6. Database Management</h2>
      <p>Both SQL and NoSQL databases have their place. Understanding when to use PostgreSQL vs MongoDB, and how to optimize queries, is invaluable.</p>
      
      <h2>7. Version Control & Collaboration</h2>
      <p>Git proficiency goes beyond basic commits. Understanding branching strategies, code reviews, and CI/CD pipelines is essential for team collaboration.</p>
      
      <h2>8. Testing & Quality Assurance</h2>
      <p>Unit testing, integration testing, and end-to-end testing ensure code quality. TDD and BDD methodologies are increasingly valued.</p>
      
      <h2>9. Soft Skills & Communication</h2>
      <p>Technical skills alone won't get you far. Clear communication, teamwork, and the ability to explain complex concepts simply are equally important.</p>
      
      <h2>10. Continuous Learning Mindset</h2>
      <p>Perhaps the most important skill is the ability to learn and adapt. The tech landscape changes rapidly, and developers must stay curious and embrace new technologies.</p>
      
      <h2>Conclusion</h2>
      <p>Mastering these skills takes time and dedication, but the investment pays off in career growth and job satisfaction. Start with your weakest areas and build from there.</p>
    `
  },
  {
    id: "2",
    title: "How to Build Your First Machine Learning Model",
    excerpt: "A beginner-friendly guide to understanding machine learning concepts and building your first predictive model from scratch.",
    category: "AI & ML",
    author: {
      name: "Dr. Michael Chen",
      role: "AI Research Lead",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    },
    date: "Dec 18, 2024",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop",
    content: `
      <p>Machine learning might seem intimidating, but with the right approach, anyone can build their first model. This guide will walk you through the fundamentals.</p>
      
      <h2>Understanding the Basics</h2>
      <p>Machine learning is about teaching computers to learn from data. Instead of explicit programming, we provide examples and let algorithms find patterns.</p>
      
      <h2>Choosing Your First Project</h2>
      <p>Start simple. Classification problems like spam detection or image recognition are great starting points. They have clear objectives and plenty of available datasets.</p>
      
      <h2>Setting Up Your Environment</h2>
      <p>Python is the go-to language for ML. Install Python, Jupyter Notebook, and key libraries like NumPy, Pandas, and Scikit-learn to get started.</p>
      
      <h2>Data Preparation</h2>
      <p>Data quality determines model quality. Learn to clean data, handle missing values, and perform feature engineering. This step often takes the most time.</p>
      
      <h2>Training Your Model</h2>
      <p>Choose a simple algorithm like linear regression or decision trees. Split your data into training and testing sets, then train your model on the training data.</p>
      
      <h2>Evaluation & Iteration</h2>
      <p>Test your model on unseen data. Use metrics like accuracy, precision, and recall to evaluate performance. Iterate and improve based on results.</p>
      
      <h2>Conclusion</h2>
      <p>Building your first ML model is a milestone. Keep experimenting, learn from failures, and gradually tackle more complex problems.</p>
    `
  },
  {
    id: "3",
    title: "The Future of Remote Learning: Trends to Watch",
    excerpt: "Explore emerging trends in online education and how technology is reshaping the way we learn and teach.",
    category: "Education",
    author: {
      name: "Emily Rodriguez",
      role: "Education Specialist",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    date: "Dec 15, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop",
    content: `
      <p>Remote learning has transformed from a necessity to a preferred choice for millions. Let's explore the trends shaping its future.</p>
      
      <h2>AI-Powered Personalization</h2>
      <p>Adaptive learning platforms use AI to customize content based on individual progress, learning style, and pace. This creates truly personalized education experiences.</p>
      
      <h2>Immersive Technologies</h2>
      <p>VR and AR are making remote learning more engaging. From virtual labs to historical recreations, immersive tech brings subjects to life.</p>
      
      <h2>Microlearning</h2>
      <p>Short, focused lessons fit busy schedules. Bite-sized content delivered through apps makes learning accessible anytime, anywhere.</p>
      
      <h2>Social Learning</h2>
      <p>Online communities, peer collaboration, and live sessions address the isolation often associated with remote learning.</p>
      
      <h2>Conclusion</h2>
      <p>The future of education is flexible, personalized, and technology-enhanced. Embrace these trends to stay ahead.</p>
    `
  },
  {
    id: "4",
    title: "Mastering React: Advanced Patterns and Best Practices",
    excerpt: "Level up your React skills with advanced component patterns, performance optimization techniques, and modern hooks.",
    category: "Development",
    author: {
      name: "Alex Thompson",
      role: "Frontend Architect",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    date: "Dec 12, 2024",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
    content: `
      <p>React has matured significantly, and mastering advanced patterns separates good developers from great ones.</p>
      
      <h2>Compound Components</h2>
      <p>This pattern allows components to work together while maintaining flexibility. Think of how select and option elements work in HTML.</p>
      
      <h2>Render Props</h2>
      <p>Share code between components using a prop whose value is a function. This enables powerful composition patterns.</p>
      
      <h2>Custom Hooks</h2>
      <p>Extract and reuse stateful logic across components. Well-designed custom hooks make code cleaner and more maintainable.</p>
      
      <h2>Performance Optimization</h2>
      <p>Learn when to use useMemo, useCallback, and React.memo. Understand the virtual DOM and avoid unnecessary re-renders.</p>
      
      <h2>Conclusion</h2>
      <p>These patterns take time to master but dramatically improve code quality and developer experience.</p>
    `
  },
  {
    id: "5",
    title: "Why Soft Skills Matter More Than Ever in Tech",
    excerpt: "Technical skills get you hired, but soft skills help you thrive. Learn how to develop communication, leadership, and teamwork.",
    category: "Career",
    author: {
      name: "Jessica Park",
      role: "Career Coach",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop"
    },
    date: "Dec 10, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=600&fit=crop",
    content: `
      <p>In an industry obsessed with technical skills, soft skills often determine career success.</p>
      
      <h2>Communication</h2>
      <p>Clear communication bridges the gap between technical and non-technical stakeholders. It's essential for project success.</p>
      
      <h2>Emotional Intelligence</h2>
      <p>Understanding and managing emotions—yours and others'—creates better working relationships and team dynamics.</p>
      
      <h2>Problem-Solving</h2>
      <p>Beyond coding, the ability to approach problems creatively and systematically is invaluable.</p>
      
      <h2>Conclusion</h2>
      <p>Invest in soft skills alongside technical ones. They're the multiplier that accelerates your career.</p>
    `
  },
  {
    id: "6",
    title: "Introduction to Cloud Computing for Beginners",
    excerpt: "Understanding cloud infrastructure, services, and how to leverage AWS, Azure, and Google Cloud for your projects.",
    category: "Cloud",
    author: {
      name: "David Kim",
      role: "Cloud Solutions Architect",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    },
    date: "Dec 8, 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    content: `
      <p>Cloud computing has revolutionized how we build and deploy applications. Here's your introduction to this essential technology.</p>
      
      <h2>What is Cloud Computing?</h2>
      <p>Cloud computing delivers computing services—servers, storage, databases, networking—over the internet, offering faster innovation and flexible resources.</p>
      
      <h2>Types of Cloud Services</h2>
      <p>Understand IaaS, PaaS, and SaaS. Each offers different levels of control and responsibility.</p>
      
      <h2>Major Cloud Providers</h2>
      <p>AWS leads the market, but Azure and Google Cloud offer compelling alternatives. Each has strengths in different areas.</p>
      
      <h2>Getting Started</h2>
      <p>Most providers offer free tiers. Start with simple projects like hosting a website or setting up a database.</p>
      
      <h2>Conclusion</h2>
      <p>Cloud skills are essential for modern developers. Start learning today and open new career opportunities.</p>
    `
  }
];

const relatedArticles = [
  {
    id: "4",
    title: "Mastering React: Advanced Patterns",
    category: "Development",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop"
  },
  {
    id: "5",
    title: "Why Soft Skills Matter in Tech",
    category: "Career",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=200&fit=crop"
  },
  {
    id: "6",
    title: "Introduction to Cloud Computing",
    category: "Cloud",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop"
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const article = articles.find(a => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-16 px-4 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article not found</h1>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-24 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          <Badge variant="secondary" className="mb-4">{article.category}</Badge>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">{article.excerpt}</p>
          
          {/* Author & Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={article.author.avatar} alt={article.author.name} />
                <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{article.author.name}</p>
                <p className="text-sm text-muted-foreground">{article.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3 mb-8">
            <Button variant="outline" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              Like
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-4 mb-12">
        <div className="container mx-auto max-w-4xl">
          <div className="aspect-video rounded-2xl overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Article Content */}
            <article 
              className="prose prose-lg max-w-none 
                prose-headings:text-foreground prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Share */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Share this article</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Facebook className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Related Articles */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedArticles.filter(a => a.id !== id).slice(0, 3).map((related) => (
                      <Link 
                        key={related.id} 
                        to={`/blog/${related.id}`}
                        className="flex gap-3 group"
                      >
                        <img 
                          src={related.image} 
                          alt={related.title}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {related.title}
                          </p>
                          <span className="text-xs text-muted-foreground">{related.readTime}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
