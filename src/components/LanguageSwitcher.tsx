import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2 font-medium"
    >
      <Globe className="w-4 h-4" />
      {language === "en" ? "العربية" : "English"}
    </Button>
  );
};
