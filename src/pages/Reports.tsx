import { motion } from "framer-motion";
import { 
  Download, 
  FileOutput, 
  FileText, 
  Database,
  Calendar,
  Filter,
  TrendingUp
} from "lucide-react";
import { MedicalCard } from "@/components/ui/medical-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const reportTypes = [
  {
    id: 1,
    title: "Code Mapping Report",
    description: "Complete NAMASTE to ICD-11 mapping analysis",
    format: "CSV / Excel",
    lastGenerated: "2 hours ago",
    size: "2.4 MB",
    records: "2,847",
    icon: Database,
    status: "ready" as const,
  },
  {
    id: 2,
    title: "FHIR Bundle Export",
    description: "FHIR R4 compliant bundle with all mappings",
    format: "JSON / XML",
    lastGenerated: "4 hours ago",
    size: "15.7 MB",
    records: "2,847",
    icon: FileOutput,
    status: "ready" as const,
  },
  {
    id: 3,
    title: "API Performance Report",
    description: "Endpoint performance and health metrics",
    format: "PDF / CSV",
    lastGenerated: "1 day ago",
    size: "1.2 MB",
    records: "15,847",
    icon: TrendingUp,
    status: "pending" as const,
  },
  {
    id: 4,
    title: "Compliance Audit",
    description: "FHIR compliance and validation results",
    format: "PDF",
    lastGenerated: "3 days ago", 
    size: "3.1 MB",
    records: "2,847",
    icon: FileText,
    status: "ready" as const,
  },
];

const quickExports = [
  {
    title: "Today's Mappings",
    count: "147",
    format: "CSV",
  },
  {
    title: "This Week's Data",
    count: "1,023",
    format: "Excel",
  },
  {
    title: "All Verified Codes",
    count: "2,401",
    format: "FHIR Bundle",
  },
  {
    title: "Error Reports",
    count: "23",
    format: "PDF",
  },
];

export default function Reports() {
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
            <h1 className="text-3xl font-bold text-foreground">Reports & Export</h1>
            <p className="text-muted-foreground">
              Generate reports and export data in various formats
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Quick Export
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Quick Export Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickExports.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MedicalCard variant="compact" className="hover-lift cursor-pointer">
              <CardContent className="text-center space-y-3">
                <div className="text-2xl font-bold text-primary">
                  {item.count}
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    {item.title}
                  </h3>
                  <Badge variant="secondary" className="mt-1">
                    {item.format}
                  </Badge>
                </div>
                <Button size="sm" className="w-full">
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
              </CardContent>
            </MedicalCard>
          </motion.div>
        ))}
      </div>

      {/* Report Generation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <MedicalCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileOutput className="h-5 w-5 text-primary" />
              Custom Report Generator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Date Range
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Data Type
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mappings">Code Mappings</SelectItem>
                    <SelectItem value="api">API Metrics</SelectItem>
                    <SelectItem value="compliance">Compliance Data</SelectItem>
                    <SelectItem value="all">All Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Format
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="xml">XML</SelectItem>
                    <SelectItem value="fhir">FHIR Bundle</SelectItem>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  &nbsp;
                </label>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </MedicalCard>
      </motion.div>

      {/* Available Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <MedicalCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Available Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportTypes.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-card-border rounded-lg hover:bg-accent/30 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <report.icon className="h-5 w-5 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-medium text-foreground">
                          {report.title}
                        </h4>
                        <StatusBadge status={report.status === "ready" ? "online" : "warning"}>
                          {report.status}
                        </StatusBadge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {report.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{report.format}</span>
                        <span>•</span>
                        <span>{report.records} records</span>
                        <span>•</span>
                        <span>{report.size}</span>
                        <span>•</span>
                        <span>Last: {report.lastGenerated}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                    <Button size="sm" disabled={report.status !== "ready"}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </MedicalCard>
      </motion.div>

      {/* Export History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <MedicalCard>
          <CardHeader>
            <CardTitle>Recent Exports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "code_mappings_2024.csv", size: "2.4 MB", time: "2 hours ago", status: "completed" },
                { name: "fhir_bundle_full.json", size: "15.7 MB", time: "4 hours ago", status: "completed" },
                { name: "api_metrics_weekly.pdf", size: "1.2 MB", time: "1 day ago", status: "completed" },
                { name: "compliance_audit.pdf", size: "3.1 MB", time: "3 days ago", status: "completed" },
              ].map((export_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-card-border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-foreground">
                        {export_.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {export_.size} • {export_.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status="online">
                      {export_.status}
                    </StatusBadge>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </MedicalCard>
      </motion.div>
    </div>
  );
}