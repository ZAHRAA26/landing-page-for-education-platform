import { useLanguage } from "@/contexts/LanguageContext";

export const StatsSection = () => {
  const { t } = useLanguage();

  const stats = [
    { value: "2M+", label: t("stats.students") },
    { value: "500+", label: t("stats.courses") },
    { value: "150+", label: t("stats.countries") },
    { value: "98%", label: t("stats.success") },
  ];

  return (
    <section className="py-16 lg:py-20 gradient-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <p className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-2">
                {stat.value}
              </p>
              <p className="text-primary-foreground/80 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
