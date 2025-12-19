import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap } from "lucide-react";

const navLinks = [
  { label: "Courses", href: "/courses" },
  { label: "Features", href: "/#features" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Pricing", href: "/#pricing" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const getHref = (href: string) => {
    if (href.startsWith("/#") && isHomePage) {
      return href.replace("/", "");
    }
    return href;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft group-hover:shadow-glow transition-shadow duration-300">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Edu<span className="text-primary">Learn</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.href.startsWith("/") && !link.href.includes("#") ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-muted-foreground hover:text-foreground font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={getHref(link.href)}
                  className="text-muted-foreground hover:text-foreground font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="default" asChild>
              <Link to="/auth">Log In</Link>
            </Button>
            <Button variant="hero" size="default" asChild>
              <Link to="/auth">Get Started Free</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.href.startsWith("/") && !link.href.includes("#") ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground font-medium py-2 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={getHref(link.href)}
                    className="text-muted-foreground hover:text-foreground font-medium py-2 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost" className="w-full justify-center" asChild>
                  <Link to="/auth" onClick={() => setIsOpen(false)}>Log In</Link>
                </Button>
                <Button variant="hero" className="w-full justify-center" asChild>
                  <Link to="/auth" onClick={() => setIsOpen(false)}>Get Started Free</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
