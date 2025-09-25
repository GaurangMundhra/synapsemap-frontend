import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200",
  {
    variants: {
      status: {
        online: "bg-success text-success-foreground shadow-sm",
        offline: "bg-destructive text-destructive-foreground shadow-sm",
        warning: "bg-warning text-warning-foreground shadow-sm",
        pending: "bg-muted text-muted-foreground shadow-sm",
      },
      pulse: {
        true: "animate-medical-pulse",
        false: "",
      }
    },
    defaultVariants: {
      status: "pending",
      pulse: false,
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  status: "online" | "offline" | "warning" | "pending";
  children: React.ReactNode;
}

const StatusBadge = ({ className, status, pulse, children, ...props }: StatusBadgeProps) => {
  return (
    <div
      className={cn(statusBadgeVariants({ status, pulse, className }))}
      {...props}
    >
      <div className={cn(
        "w-2 h-2 rounded-full",
        status === "online" && "bg-success-foreground",
        status === "offline" && "bg-destructive-foreground", 
        status === "warning" && "bg-warning-foreground",
        status === "pending" && "bg-muted-foreground"
      )} />
      {children}
    </div>
  );
};

export { StatusBadge, statusBadgeVariants };