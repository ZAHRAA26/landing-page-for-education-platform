import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Smartphone, 
  Download, 
  Wifi, 
  Bell, 
  PlayCircle, 
  BookMarked,
  Star,
  CheckCircle2
} from "lucide-react";

const features = [
  {
    icon: Download,
    title: "Offline Learning",
    description: "Download courses and learn anywhere, even without internet"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Stay on track with personalized learning reminders"
  },
  {
    icon: PlayCircle,
    title: "Background Play",
    description: "Listen to courses while multitasking on your phone"
  },
  {
    icon: BookMarked,
    title: "Bookmarks & Notes",
    description: "Save important moments and take notes on the go"
  },
  {
    icon: Wifi,
    title: "Sync Across Devices",
    description: "Start on mobile, continue on desktop seamlessly"
  },
  {
    icon: Star,
    title: "Personalized Feed",
    description: "Get course recommendations based on your interests"
  }
];

const reviews = [
  {
    name: "Alex M.",
    rating: 5,
    review: "Perfect for my commute! I've learned so much during my daily train rides.",
    platform: "iOS"
  },
  {
    name: "Sarah K.",
    rating: 5,
    review: "The offline feature is a game-changer. I can learn even when traveling.",
    platform: "Android"
  },
  {
    name: "Michael R.",
    rating: 5,
    review: "Smooth interface and great video quality. Highly recommend!",
    platform: "iOS"
  }
];

const MobileApp = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/10 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <Smartphone className="w-4 h-4" />
                Available on iOS & Android
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Learn Anywhere with the{" "}
                <span className="text-primary">EduLearn App</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Take your learning on the go. Download courses, learn offline, and track your progress from your pocket.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2 h-14 px-6">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Download for iOS
                </Button>
                <Button size="lg" variant="outline" className="gap-2 h-14 px-6">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                  </svg>
                  Download for Android
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="font-medium">4.9</span>
                </div>
                <span>|</span>
                <span>2M+ Downloads</span>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="relative w-72 h-[580px] bg-foreground rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-2xl font-bold text-foreground mb-2">EduLearn</p>
                    <p className="text-muted-foreground">Mobile App Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Everything You Need, On the Go
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our mobile app is designed to make learning as easy as possible, wherever you are
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                How to Get Started
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Download", description: "Get the app from App Store or Google Play" },
                { step: "2", title: "Sign In", description: "Use your existing EduLearn account or create one" },
                { step: "3", title: "Start Learning", description: "Access all your courses from your pocket" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Join millions of happy learners on mobile
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="p-6 bg-card border border-border rounded-2xl"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4">"{review.review}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{review.name}</span>
                  <span className="text-sm text-muted-foreground">{review.platform}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Learn on the Go?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Download the EduLearn app today and start your learning journey anywhere, anytime.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="gap-2 h-14 px-6">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                App Store
              </Button>
              <Button size="lg" variant="secondary" className="gap-2 h-14 px-6">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                Google Play
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MobileApp;
