
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { AgentConfig } from "@/types";
import { useSwarm } from "@/context/SwarmContext";
import {
  Users,
  FileText,
  Database,
  Activity,
  Settings
} from "lucide-react";

interface AgentCardProps {
  agent: AgentConfig;
}

const getAgentIcon = (type: string) => {
  switch (type) {
    case "market-research":
      return <Activity className="h-5 w-5 text-primary" />;
    case "content-creation":
      return <FileText className="h-5 w-5 text-primary" />;
    case "customer-relations":
      return <Users className="h-5 w-5 text-primary" />;
    case "freelance-management":
      return <Activity className="h-5 w-5 text-primary" />;
    case "analytics-reports":
      return <Database className="h-5 w-5 text-primary" />;
    case "admin-management":
      return <Settings className="h-5 w-5 text-primary" />;
    default:
      return <Activity className="h-5 w-5 text-primary" />;
  }
};

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const { toggleAgentStatus } = useSwarm();
  
  const activeTasks = agent.tasks.filter(task => task.enabled).length;
  const totalTasks = agent.tasks.length;

  return (
    <Card className="agent-card h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          {getAgentIcon(agent.type)}
          <CardTitle className="text-lg font-medium">{agent.name}</CardTitle>
        </div>
        <Switch 
          checked={agent.enabled} 
          onCheckedChange={() => toggleAgentStatus(agent.id)}
        />
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          {agent.description}
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="font-medium">{activeTasks}/{totalTasks}</span> tasks active
          </div>
          <Badge variant={agent.enabled ? "default" : "outline"}>
            {agent.enabled ? "Running" : "Disabled"}
          </Badge>
        </div>
        
        <div className="mt-4 flex items-center text-xs text-muted-foreground">
          <span className="font-medium mr-1">Model:</span> {agent.model.name}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
