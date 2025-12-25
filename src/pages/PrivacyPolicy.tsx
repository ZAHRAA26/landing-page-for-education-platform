import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield, Lock, Eye, FileText, Users, Globe } from "lucide-react";

const sections = [
  {
    icon: FileText,
    title: "Information We Collect",
    content: `We collect information you provide directly to us, such as when you create an account, enroll in a course, make a purchase, or contact us for support. This includes:
    
    • Personal information (name, email address, phone number)
    • Payment information (processed securely through our payment providers)
    • Course progress and completion data
    • Communications with instructors and other students
    • Feedback and survey responses`
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    content: `We use the information we collect to:
    
    • Provide, maintain, and improve our services
    • Process transactions and send related information
    • Send you technical notices, updates, and support messages
    • Respond to your comments, questions, and requests
    • Personalize your learning experience
    • Monitor and analyze trends, usage, and activities`
  },
  {
    icon: Users,
    title: "Information Sharing",
    content: `We do not sell, trade, or otherwise transfer your personal information to outside parties except:
    
    • With your consent
    • To instructors for courses you're enrolled in
    • To service providers who assist in our operations
    • To comply with legal obligations
    • To protect our rights and prevent fraud`
  },
  {
    icon: Lock,
    title: "Data Security",
    content: `We implement appropriate technical and organizational measures to protect your personal information:
    
    • Encryption of data in transit and at rest
    • Regular security assessments and audits
    • Access controls and authentication
    • Secure data centers with 24/7 monitoring
    • Employee training on data protection`
  },
  {
    icon: Globe,
    title: "Your Rights",
    content: `You have the right to:
    
    • Access your personal information
    • Correct inaccurate data
    • Request deletion of your data
    • Object to processing of your data
    • Export your data in a portable format
    • Withdraw consent at any time`
  },
  {
    icon: Shield,
    title: "Cookies & Tracking",
    content: `We use cookies and similar tracking technologies to:
    
    • Remember your preferences and settings
    • Understand how you use our platform
    • Deliver relevant content and advertisements
    • Analyze and improve our services
    
    You can control cookies through your browser settings.`
  }
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
                Questions About Privacy?
              </h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact our Data Protection Officer at:
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

export default PrivacyPolicy;
