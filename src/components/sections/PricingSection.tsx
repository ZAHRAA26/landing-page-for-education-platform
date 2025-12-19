import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for getting started",
    features: [
      "Access to 10 free courses",
      "Basic learning paths",
      "Community forum access",
      "Mobile app access",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: 29,
    description: "Best for serious learners",
    features: [
      "Access to 200+ courses",
      "Personalized learning paths",
      "Certificate of completion",
      "Priority support",
      "Offline downloads",
      "Project reviews",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Team",
    price: 49,
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team management dashboard",
      "Progress tracking & analytics",
      "Custom learning paths",
      "Dedicated account manager",
      "API access",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Pricing Plans
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent
            <span className="text-gradient"> Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the plan that fits your learning goals. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface PricingCardProps {
  name: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

const PricingCard = ({
  name,
  price,
  description,
  features,
  cta,
  popular,
}: PricingCardProps) => (
  <div
    className={`relative p-6 lg:p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
      popular
        ? "bg-card border-primary shadow-card scale-105"
        : "bg-card border-border/50 shadow-soft hover:shadow-card"
    }`}
  >
    {popular && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
        Most Popular
      </span>
    )}

    <div className="text-center mb-6">
      <h3 className="text-xl font-bold text-foreground mb-2">{name}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-4xl font-extrabold text-foreground">${price}</span>
        <span className="text-muted-foreground">/month</span>
      </div>
    </div>

    <ul className="space-y-3 mb-8">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Check className="w-3 h-3 text-primary" />
          </div>
          <span className="text-sm text-muted-foreground">{feature}</span>
        </li>
      ))}
    </ul>

    <Button
      variant={popular ? "hero" : "outline"}
      className="w-full"
      size="lg"
    >
      {cta}
    </Button>
  </div>
);
