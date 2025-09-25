import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, Search, FileText, ExternalLink } from "lucide-react";
import { MedicalCard } from "@/components/ui/medical-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockMappings = [
  {
    id: 1,
    namasteCode: "N001.23",
    namasteDesc: "Vata Dosha Imbalance - Neurological",
    icdCode: "F44.9", 
    icdDesc: "Dissociative disorder, unspecified",
    confidence: 92,
    category: "Mental Health",
    status: "verified" as const,
  },
  {
    id: 2,
    namasteCode: "N002.45",
    namasteDesc: "Pitta Dosha Excess - Digestive",
    icdCode: "K30",
    icdDesc: "Functional dyspepsia", 
    confidence: 88,
    category: "Digestive",
    status: "pending" as const,
  },
  {
    id: 3,
    namasteCode: "N003.67",
    namasteDesc: "Kapha Dosha Stagnation - Respiratory",
    icdCode: "J44.1",
    icdDesc: "Chronic obstructive pulmonary disease with acute exacerbation",
    confidence: 85,
    category: "Respiratory",
    status: "verified" as const,
  },
];

export default function CodeMapping() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMapping, setSelectedMapping] = useState<number | null>(null);

  const filteredMappings = mockMappings.filter(mapping =>
    mapping.namasteCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mapping.namasteDesc.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-3xl font-bold text-foreground">Code Mapping</h1>
            <p className="text-muted-foreground">
              Search and map NAMASTE codes to ICD-11 classifications
            </p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status="online">Mapping Service</StatusBadge>
          </div>
        </div>
      </motion.div>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <MedicalCard variant="gradient" className="hover-medical">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Search className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Search NAMASTE Codes</h3>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter NAMASTE code or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base border-2 focus:border-primary transition-colors"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">Vata Disorders</Badge>
                <Badge variant="secondary">Pitta Conditions</Badge>
                <Badge variant="secondary">Kapha Imbalances</Badge>
                <Badge variant="secondary">Tridosha</Badge>
              </div>
            </div>
          </CardContent>
        </MedicalCard>
      </motion.div>

      {/* Mapping Results */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Mapping Results ({filteredMappings.length})
        </h2>
        
        <div className="grid gap-4">
          {filteredMappings.map((mapping, index) => (
            <motion.div
              key={mapping.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <MedicalCard 
                variant={selectedMapping === mapping.id ? "outline" : "default"}
                className="cursor-pointer hover-lift"
                onClick={() => setSelectedMapping(
                  selectedMapping === mapping.id ? null : mapping.id
                )}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-4">
                      {/* NAMASTE to ICD Mapping */}
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                            <div className="text-xs font-medium text-primary mb-1">
                              NAMASTE CODE
                            </div>
                            <div className="font-mono text-sm font-bold text-foreground">
                              {mapping.namasteCode}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {mapping.namasteDesc}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <ArrowLeftRight className="h-6 w-6 text-primary" />
                          <div className="text-xs text-muted-foreground mt-1">
                            {mapping.confidence}%
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="bg-medical-blue-light border border-medical-blue/20 rounded-lg p-4">
                            <div className="text-xs font-medium text-medical-blue mb-1">
                              ICD-11 CODE
                            </div>
                            <div className="font-mono text-sm font-bold text-foreground">
                              {mapping.icdCode}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {mapping.icdDesc}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Metadata */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant={mapping.category === "Mental Health" ? "default" : "secondary"}>
                            {mapping.category}
                          </Badge>
                          <StatusBadge 
                            status={mapping.status === "verified" ? "online" : "warning"}
                          >
                            {mapping.status === "verified" ? "Verified" : "Pending Review"}
                          </StatusBadge>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View ICD-11
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </MedicalCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <MedicalCard>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 flex-wrap">
              <Button variant="outline">
                Import NAMASTE Codes
              </Button>
              <Button variant="outline">
                Export Mappings
              </Button>
              <Button variant="outline">
                Bulk Validation
              </Button>
              <Button>
                New Mapping
              </Button>
            </div>
          </CardContent>
        </MedicalCard>
      </motion.div>
    </div>
  );
}