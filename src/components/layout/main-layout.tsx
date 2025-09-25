import { motion } from "framer-motion";
import { MedicalSidebar } from "./medical-sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <MedicalSidebar />
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex-1 overflow-auto"
      >
        <div className="p-6">
          {children}
        </div>
      </motion.main>
    </div>
  );
}