
import React, { useState } from "react";
import { useSwarm } from "@/context/SwarmContext";
import WorkflowCard from "@/components/dashboard/WorkflowCard";
import WorkflowDiagram from "@/components/dashboard/WorkflowDiagram";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Workflows = () => {
  const { workflows } = useSwarm();
  const [selectedWorkflow, setSelectedWorkflow] = useState(workflows[0]?.id);
  
  const enabledWorkflows = workflows.filter(workflow => workflow.enabled);
  const disabledWorkflows = workflows.filter(workflow => !workflow.enabled);
  const huginnWorkflows = workflows.filter(workflow => workflow.platform === "huginn");
  const n8nWorkflows = workflows.filter(workflow => workflow.platform === "n8n");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Workflows</h1>
        <p className="text-muted-foreground">
          Design and manage cross-agent workflows for your AI swarm
        </p>
      </div>
      
      <div className="flex justify-between">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All ({workflows.length})</TabsTrigger>
            <TabsTrigger value="enabled">Enabled ({enabledWorkflows.length})</TabsTrigger>
            <TabsTrigger value="disabled">Disabled ({disabledWorkflows.length})</TabsTrigger>
            <TabsTrigger value="huginn">Huginn ({huginnWorkflows.length})</TabsTrigger>
            <TabsTrigger value="n8n">n8n ({n8nWorkflows.length})</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button>Create Workflow</Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <div className="space-y-4">
            {workflows.map(workflow => (
              <div 
                key={workflow.id} 
                className="cursor-pointer"
                onClick={() => setSelectedWorkflow(workflow.id)}
              >
                <WorkflowCard workflow={workflow} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-6">
              {selectedWorkflow ? (
                <WorkflowDiagram workflowId={selectedWorkflow} />
              ) : (
                <div className="flex items-center justify-center h-40 text-muted-foreground">
                  Select a workflow to view its diagram
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Implementation Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Huginn Implementation</h3>
                <Badge>Ruby on Rails</Badge>
              </div>
              <p className="text-muted-foreground text-sm mt-2 mb-4">
                Complete setup guide for implementing workflows on Huginn platform
              </p>
              <Button variant="outline" className="w-full">View Guide</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">n8n Implementation</h3>
                <Badge>Node.js</Badge>
              </div>
              <p className="text-muted-foreground text-sm mt-2 mb-4">
                Step-by-step instructions for n8n workflow implementation
              </p>
              <Button variant="outline" className="w-full">View Guide</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Workflows;
