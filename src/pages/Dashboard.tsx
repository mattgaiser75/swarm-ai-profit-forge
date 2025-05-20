
import React from "react";
import { useSwarm } from "@/context/SwarmContext";
import AgentCard from "@/components/dashboard/AgentCard";
import StatsCard from "@/components/dashboard/StatsCard";
import WorkflowCard from "@/components/dashboard/WorkflowCard";
import WorkflowDiagram from "@/components/dashboard/WorkflowDiagram";
import { Activity, FileText, Check, Database } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { agents, workflows, dataSources } = useSwarm();
  
  const enabledAgents = agents.filter(agent => agent.enabled);
  const enabledWorkflows = workflows.filter(workflow => workflow.enabled);
  const connectedDataSources = dataSources.filter(ds => ds.connected);

  // Choose the main workflow to display
  const mainWorkflow = workflows[0];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI Swarm Control</h1>
        <p className="text-muted-foreground">
          Manage and monitor your autonomous AI agent swarm deployment
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Active Agents" 
          value={enabledAgents.length} 
          description={`${agents.length} total agents`}
          icon={<Users size={16} />}
          trend="neutral"
        />
        <StatsCard 
          title="Active Workflows" 
          value={enabledWorkflows.length} 
          description={`${workflows.length} total workflows`}
          icon={<Activity size={16} />}
          trend="up"
          trendValue="+1 this week"
        />
        <StatsCard 
          title="Tasks Completed" 
          value={248} 
          description="Last 30 days"
          icon={<Check size={16} />}
          trend="up"
          trendValue="+12% from last month"
        />
        <StatsCard 
          title="Connected Data Sources" 
          value={`${connectedDataSources.length}/${dataSources.length}`} 
          description="Data storage connections"
          icon={<Database size={16} />}
        />
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Agents Overview</h2>
          <Link to="/agents" className="text-primary text-sm hover:underline">
            View all agents
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.slice(0, 6).map(agent => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Main Workflow</h2>
            <Link to="/workflows" className="text-primary text-sm hover:underline">
              View all workflows
            </Link>
          </div>
          <WorkflowDiagram workflowId={mainWorkflow.id} />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Active Workflows</h2>
          </div>
          <div className="space-y-4">
            {enabledWorkflows.map(workflow => (
              <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
