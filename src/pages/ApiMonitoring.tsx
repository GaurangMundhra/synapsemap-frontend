import { motion } from "framer-motion";
import { Activity, CheckCircle, AlertTriangle, XCircle, Clock, Zap } from "lucide-react";
import { MedicalCard } from "@/components/ui/medical-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const apiEndpoints = [
  {
    id: 1,
    name: "NAMASTE Code Lookup",
    endpoint: "/api/v1/namaste/lookup",
    status: "online" as const,
    responseTime: "142ms",
    uptime: "99.9%",
    lastCheck: "30 seconds ago",
    method: "GET",
  },
  {
    id: 2,
    name: "ICD-11 Mapping",
    endpoint: "/api/v1/icd11/map",
    status: "online" as const,
    responseTime: "89ms",
    uptime: "99.7%",
    lastCheck: "45 seconds ago",
    method: "POST",
  },
  {
    id: 3,
    name: "FHIR Bundle Export",
    endpoint: "/api/v1/fhir/export",
    status: "warning" as const,
    responseTime: "2.1s",
    uptime: "98.2%",
    lastCheck: "2 minutes ago",
    method: "POST",
  },
  {
    id: 4,
    name: "Validation Service",
    endpoint: "/api/v1/validate",
    status: "online" as const,
    responseTime: "67ms",
    uptime: "99.8%",
    lastCheck: "1 minute ago",
    method: "POST",
  },
  {
    id: 5,
    name: "Health Check",
    endpoint: "/api/v1/health",
    status: "offline" as const,
    responseTime: "timeout",
    uptime: "0%",
    lastCheck: "5 minutes ago",
    method: "GET",
  },
];

const systemMetrics = [
  {
    title: "Total Requests",
    value: "15,847",
    change: "+23%",
    icon: Activity,
    status: "success" as const,
  },
  {
    title: "Avg Response Time",
    value: "156ms",
    change: "-12ms",
    icon: Zap,
    status: "success" as const,
  },
  {
    title: "Success Rate",
    value: "99.2%",
    change: "+0.3%",
    icon: CheckCircle,
    status: "success" as const,
  },
  {
    title: "Active Endpoints", 
    value: "4/5",
    change: "-1",
    icon: Clock,
    status: "warning" as const,
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "online":
      return <CheckCircle className="h-4 w-4 text-success" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-warning" />;
    case "offline":
      return <XCircle className="h-4 w-4 text-destructive" />;
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />;
  }
};

const getMethodBadge = (method: string) => {
  const variants = {
    GET: "bg-blue-100 text-blue-800 border-blue-200",
    POST: "bg-green-100 text-green-800 border-green-200",
    PUT: "bg-yellow-100 text-yellow-800 border-yellow-200",
    DELETE: "bg-red-100 text-red-800 border-red-200",
  };
  
  return (
    <span className={`px-2 py-1 text-xs font-mono rounded border ${variants[method as keyof typeof variants] || variants.GET}`}>
      {method}
    </span>
  );
};

export default function ApiMonitoring() {
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
            <h1 className="text-3xl font-bold text-foreground">API Monitoring</h1>
            <p className="text-muted-foreground">
              Real-time health check and endpoint monitoring
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status="online" pulse>
              Monitoring Active
            </StatusBadge>
            <Button>Run Health Check</Button>
          </div>
        </div>
      </motion.div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MedicalCard variant="gradient" className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {metric.value}
                </div>
                <div className={`flex items-center text-xs ${
                  metric.status === "success" ? "text-success" : "text-warning"
                }`}>
                  {metric.change} from last hour
                </div>
              </CardContent>
            </MedicalCard>
          </motion.div>
        ))}
      </div>

      {/* API Endpoints Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <MedicalCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              API Endpoints Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {apiEndpoints.map((endpoint, index) => (
                <motion.div
                  key={endpoint.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-card-border rounded-lg hover:bg-accent/30 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(endpoint.status)}
                      <StatusBadge status={endpoint.status}>
                        {endpoint.status.toUpperCase()}
                      </StatusBadge>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-medium text-foreground">
                          {endpoint.name}
                        </h4>
                        {getMethodBadge(endpoint.method)}
                      </div>
                      <p className="text-sm text-muted-foreground font-mono">
                        {endpoint.endpoint}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="text-foreground font-medium">
                        {endpoint.responseTime}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        Response
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-foreground font-medium">
                        {endpoint.uptime}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        Uptime
                      </div>
                    </div>
                    
                    <div className="text-center min-w-[100px]">
                      <div className="text-muted-foreground text-xs">
                        {endpoint.lastCheck}
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      Test
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </MedicalCard>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <MedicalCard>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 flex-wrap">
              <Button variant="outline">
                Run Full Test Suite
              </Button>
              <Button variant="outline">
                View Logs
              </Button>
              <Button variant="outline">
                Export Report
              </Button>
              <Button>
                Configure Alerts
              </Button>
            </div>
          </CardContent>
        </MedicalCard>
      </motion.div>
    </div>
  );
}