import { motion } from "framer-motion";
import { 
  Activity, 
  ArrowUpRight, 
  CheckCircle, 
  Database,
  Heart,
  Shield,
  TrendingUp 
} from "lucide-react";
import { MedicalCard } from "@/components/ui/medical-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total Mappings",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Database,
  },
  {
    title: "API Health",
    value: "99.9%",
    change: "+0.1%",
    trend: "up",
    icon: Activity,
  },
  {
    title: "FHIR Compliance",
    value: "100%",
    change: "0%",
    trend: "stable",
    icon: Shield,
  },
  {
    title: "Processing Speed",
    value: "142ms",
    change: "-8ms",
    trend: "up",
    icon: TrendingUp,
  },
];

const recentActivity = [
  {
    id: 1,
    action: "NAMASTE code N001 mapped to ICD-11",
    time: "2 minutes ago",
    status: "success" as const,
  },
  {
    id: 2,
    action: "API health check completed",
    time: "5 minutes ago", 
    status: "online" as const,
  },
  {
    id: 3,
    action: "FHIR bundle exported successfully",
    time: "12 minutes ago",
    status: "success" as const,
  },
  {
    id: 4,
    action: "System backup completed",
    time: "1 hour ago",
    status: "online" as const,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              NAMASTE to ICD-11 mapping system overview
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status="online" pulse>
              System Online
            </StatusBadge>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 text-success rounded-full text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              FHIR Compliant
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MedicalCard variant="gradient" className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-success" />
                  {stat.change} from last hour
                </div>
              </CardContent>
            </MedicalCard>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <MedicalCard className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">API Endpoints</span>
                  <StatusBadge status="online">All Active</StatusBadge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Database</span>
                  <StatusBadge status="online">Connected</StatusBadge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">FHIR Validation</span>
                  <StatusBadge status="online">Passing</StatusBadge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Code Mapping</span>
                  <StatusBadge status="online">Active</StatusBadge>
                </div>
              </div>
            </CardContent>
          </MedicalCard>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <MedicalCard className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg border border-card-border hover:bg-accent/50 transition-colors"
                  >
                    <div className={`
                      w-2 h-2 rounded-full mt-2 flex-shrink-0
                      ${activity.status === "success" ? "bg-success" : "bg-primary"}
                    `} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </MedicalCard>
        </motion.div>
      </div>
    </div>
  );
}