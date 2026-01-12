import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileEdit, Clock, CheckCircle, Eye } from "lucide-react";

export type CourseStatus = "draft" | "review" | "published";

interface CourseStatusBadgeProps {
  status: CourseStatus;
  size?: "sm" | "md";
}

const CourseStatusBadge = ({ status, size = "md" }: CourseStatusBadgeProps) => {
  const { t } = useLanguage();

  const statusConfig = {
    draft: {
      label: t("courseStatus.draft"),
      icon: FileEdit,
      className: "bg-muted text-muted-foreground border-muted-foreground/20",
    },
    review: {
      label: t("courseStatus.review"),
      icon: Clock,
      className: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
    },
    published: {
      label: t("courseStatus.published"),
      icon: CheckCircle,
      className: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant="outline" 
      className={`${config.className} ${size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"}`}
    >
      <Icon className={`${size === "sm" ? "w-3 h-3" : "w-4 h-4"} ${size === "sm" ? "mr-1" : "mr-1.5"}`} />
      {config.label}
    </Badge>
  );
};

export default CourseStatusBadge;
