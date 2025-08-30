import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  isPageHeader?: boolean;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  centered = false, 
  className,
  isPageHeader = true
}: SectionHeaderProps) {
  return (
    <div className={cn(
      isPageHeader ? "space-y-2 mt-20 md:mt-20 mb-10" : "space-y-2 mb-10",
      centered && "text-center",
      className
    )}>
      <h2 className={cn("font-bold tracking-tight", isPageHeader ? "text-4xl md:text-5xl dark:text-primary text-slate-700" : "text-3xl md:text-4xl")}>{title}</h2>
      {subtitle && (
        <p className={cn("text-lg md:text-xl text-muted-foreground max-w-2xl", centered ? "mx-auto" : "")}>{subtitle}</p>
      )}
    </div>
  );
}
