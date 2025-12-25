import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Scale, BookOpen, CreditCard, AlertTriangle, FileCheck, Gavel } from "lucide-react";

const sections = [
  {
    icon: BookOpen,
    title: "1. Use of Services",
    content: `By accessing or using EduLearn, you agree to these Terms. You must be at least 16 years old to use our services.

You agree to:
• Provide accurate and complete information when creating an account
• Maintain the security of your account credentials
• Notify us immediately of any unauthorized access
• Use our platform only for lawful purposes
• Respect the intellectual property rights of others`
  },
  {
    icon: CreditCard,
    title: "2. Payments & Refunds",
    content: `Course Purchases:
• All prices are displayed in USD unless otherwise stated
• Payment is required before accessing paid content
• We accept major credit cards and PayPal

Refund Policy:
• 30-day money-back guarantee for most courses
• Refunds are processed within 5-10 business days
• Refunds may be denied if significant course content has been accessed
• Subscription refunds are prorated based on usage`
  },
  {
    icon: FileCheck,
    title: "3. Content & Intellectual Property",
    content: `Our Content:
• All course materials, videos, and resources are owned by EduLearn or our instructors
• You may not copy, distribute, or create derivative works without permission
• Course access is for personal, non-commercial use only

Your Content:
• You retain ownership of content you create (assignments, projects, comments)
• You grant us a license to use your content for educational purposes
• You are responsible for ensuring your content doesn't violate any laws`
  },
  {
    icon: AlertTriangle,
    title: "4. Prohibited Conduct",
    content: `You may not:
• Share your account or course access with others
• Download or redistribute course materials
• Use automated systems to access our platform
• Post harmful, offensive, or misleading content
• Harass instructors or other students
• Attempt to circumvent our security measures
• Use our platform for spam or commercial solicitation

Violations may result in account suspension or termination.`
  },
  {
    icon: Scale,
    title: "5. Disclaimers & Limitations",
    content: `Service Availability:
• We strive for 99.9% uptime but cannot guarantee uninterrupted access
• We may modify or discontinue features with reasonable notice

Educational Content:
• Course content is for educational purposes only
• We don't guarantee specific outcomes or employment
• Professional advice should be sought for specific situations

Limitation of Liability:
• Our liability is limited to the amount you paid for the service
• We are not liable for indirect, incidental, or consequential damages`
  },
  {
    icon: Gavel,
    title: "6. Dispute Resolution",
    content: `Governing Law:
• These Terms are governed by the laws of the State of California
• Any disputes will be resolved in the courts of San Francisco, CA

Arbitration:
• Most disputes will be resolved through binding arbitration
• Class action lawsuits are waived except where prohibited by law
• Small claims court remains available for qualifying disputes

Changes to Terms:
• We may update these Terms with 30 days notice
• Continued use constitutes acceptance of updated Terms`
  }
];

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Scale className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground">
              Please read these terms carefully before using our platform. By using EduLearn, you agree to be bound by these terms.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Effective Date: December 2024
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
                Questions About These Terms?
              </h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact our legal team at:
              </p>
              <p className="text-foreground font-medium">
                legal@edulearn.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;
