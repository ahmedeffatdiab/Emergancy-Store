import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number | string;
  className?: string;
}

export default function StatCard({ title, value, className }: StatCardProps) {
  return (
    <div className={cn("rounded-lg p-4 shadow-sm", className)}>
      <h5 className="text-lg font-semibold">{title}</h5>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
