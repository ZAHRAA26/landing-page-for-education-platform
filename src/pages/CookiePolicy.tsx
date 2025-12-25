import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Cookie, Settings, BarChart3, Target, Shield, HelpCircle } from "lucide-react";

const sections = [
  {
    icon: Cookie,
    title: "What Are Cookies?",
    content: `Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences, login status, and other information to provide a better user experience.

We use cookies to:
• Keep you signed in to your account
• Remember your preferences and settings
• Understand how you use our platform
• Improve our services based on user behavior
• Deliver relevant content and recommendations`
  },
  {
    icon: Settings,
    title: "Essential Cookies",
    content: `These cookies are necessary for the website to function properly and cannot be disabled.

They include:
• Authentication cookies that keep you logged in
• Security cookies that protect against fraud
• Session cookies that remember your preferences within a visit
• Load balancing cookies that ensure optimal performance

Without these cookies, some features of our platform may not work correctly.`
  },
  {
    icon: BarChart3,
    title: "Analytics Cookies",
    content: `We use analytics cookies to understand how visitors interact with our platform.

These cookies help us:
• Track page views and user journeys
• Measure the effectiveness of our content
• Identify popular courses and features
• Improve navigation and user experience
• Understand device and browser usage

We use services like Google Analytics to process this data. You can opt out of analytics cookies in your preferences.`
  },
  {
    icon: Target,
    title: "Marketing Cookies",
    content: `Marketing cookies are used to deliver relevant advertisements and track their effectiveness.

These cookies may:
• Show you personalized ads based on your interests
• Track ad performance across platforms
• Limit how often you see certain ads
• Measure the effectiveness of marketing campaigns

You can opt out of marketing cookies at any time through your cookie preferences.`
  },
  {
    icon: Shield,
    title: "Managing Cookies",
    content: `You have control over which cookies we use. You can manage your preferences in several ways:

Browser Settings:
• Most browsers allow you to block or delete cookies
• You can set your browser to notify you when cookies are set
• Check your browser's help section for specific instructions

Our Cookie Settings:
• Use our cookie preference center to manage consent
• Access it anytime from the footer of any page

Note: Blocking certain cookies may impact your experience on our platform.`
  },
  {
    icon: HelpCircle,
    title: "Third-Party Cookies",
    content: `Some cookies are set by third-party services that appear on our pages.

Third parties that may set cookies include:
• Payment processors (Stripe, PayPal)
• Video hosting services (Vimeo, YouTube)
• Social media platforms (Facebook, Twitter, LinkedIn)
• Analytics providers (Google Analytics, Mixpanel)

We don't control these third-party cookies. Please refer to their respective privacy policies for more information.`
  }
];

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Cookie className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Cookie Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              This policy explains how we use cookies and similar technologies to recognize you when you visit our platform.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: December 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      {section.title}
                    </h2>
                    <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Contact Section */}
            <div className="mt-16 p-8 bg-muted/50 rounded-2xl">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Questions About Cookies?
              </h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
              </p>
              <p className="text-foreground font-medium">
                privacy@edulearn.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
