
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Workflow } from "@/types";

interface WorkflowCardProps {
  workflow: Workflow;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow }) => {
  return (
    <Card className="agent-card h-full cursor-pointer hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{workflow.name}</CardTitle>
          <Badge variant={workflow.platform === "n8n" ? "default" : "secondary"}>
            {workflow.platform}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          {workflow.description}
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <span className="font-medium">{workflow.steps.length}</span>
            <span className="ml-1 text-muted-foreground">steps</span>
          </div>
          <Badge variant={workflow.enabled ? "outline" : "secondary"}>
            {workflow.enabled ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowCard;
