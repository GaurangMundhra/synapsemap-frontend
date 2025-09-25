import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Activity,
  FileOutput,
  Stethoscope,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Code Mapping", href: "/mapping", icon: ArrowLeftRight },
  { name: "API Monitoring", href: "/monitoring", icon: Activity },
  { name: "Reports & Export", href: "/reports", icon: FileOutput },
];

interface MedicalSidebarProps {
  className?: string;
}

export function MedicalSidebar({ className }: MedicalSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "flex h-screen bg-card border-r border-card-border",
        isCollapsed ? "w-16" : "w-64",
        "transition-all duration-300 ease-in-out",
        className
      )}
    >
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-card-border">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-foreground">MedTech</h1>
                <p className="text-xs text-muted-foreground">NAMASTE-ICD</p>
              </div>
            </motion.div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-accent"
          >
            {isCollapsed ? (
              <Menu className="w-4 h-4" />
            ) : (
              <X className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <NavLink
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="p-4 border-t border-card-border"
          >
            <div className="text-xs text-muted-foreground">
              <p>FHIR Compliant</p>
              <p className="text-primary font-medium">v1.0.0</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}