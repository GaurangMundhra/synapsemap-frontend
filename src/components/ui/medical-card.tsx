import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Card } from "./card";

const medicalCardVariants = cva(
  "transition-all duration-300 hover:shadow-medical border-card-border",
  {
    variants: {
      variant: {
        default: "bg-card hover:-translate-y-1",
        gradient: "bg-gradient-to-br from-card to-accent/20 hover:-translate-y-1",
        outline: "border-2 border-primary/20 hover:border-primary/40 hover:shadow-medical-glow",
        compact: "p-4 hover:scale-[1.02]",
      },
      glow: {
        true: "shadow-medical-glow",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      glow: false,
    },
  }
);

export interface MedicalCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof medicalCardVariants> {}

const MedicalCard = ({ className, variant, glow, ...props }: MedicalCardProps) => {
  return (
    <Card
      className={cn(medicalCardVariants({ variant, glow, className }))}
      {...props}
    />
  );
};

export { MedicalCard, medicalCardVariants };