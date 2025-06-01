
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Cpu, CheckCircle } from "lucide-react";

interface OptimizationStatsProps {
  totalCostSavings: number;
  agentsToOptimize: number;
  totalAgents: number;
  avgCapabilityMatch: number;
}

const OptimizationStats = ({ 
  totalCostSavings, 
  agentsToOptimize, 
  totalAgents, 
  avgCapabilityMatch 
}: OptimizationStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            Potential Savings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            ${totalCostSavings.toFixed(4)}
          </div>
          <p className="text-xs text-muted-foreground">Per 1K tokens</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Cpu className="h-4 w-4 mr-2" />
            Agents to Optimize
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {agentsToOptimize}
          </div>
          <p className="text-xs text-muted-foreground">Out of {totalAgents}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Compatibility
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.round(avgCapabilityMatch)}%
          </div>
          <p className="text-xs text-muted-foreground">Avg. capability match</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OptimizationStats;
