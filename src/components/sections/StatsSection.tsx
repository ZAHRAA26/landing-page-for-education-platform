const stats = [
  { value: "2M+", label: "Active Students" },
  { value: "500+", label: "Expert Courses" },
  { value: "150+", label: "Countries" },
  { value: "98%", label: "Success Rate" },
];

export const StatsSection = () => {
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
