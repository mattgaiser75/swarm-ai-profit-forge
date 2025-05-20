
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSwarm } from "@/context/SwarmContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronRight } from "lucide-react";
import ModelSelector from "@/components/agents/ModelSelector";

const AgentDetail = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const { agents, toggleAgentStatus } = useSwarm();
  const navigate = useNavigate();
  
  const agent = agents.find(a => a.id === agentId);
  
  if (!agent) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-xl font-semibold mb-4">Agent not found</h2>
        <Button variant="outline" onClick={() => navigate('/agents')}>
          Back to Agents
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => navigate('/agents')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold mb-1">{agent.name}</h1>
          <p className="text-muted-foreground">{agent.description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Agent Status</CardTitle>
                <Switch 
                  checked={agent.enabled} 
                  onCheckedChange={() => toggleAgentStatus(agent.id)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-2">
                    <div className={`w-2 h-2 rounded-full ${agent.enabled ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="ml-2 font-medium">
                      {agent.enabled ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {agent.enabled 
                      ? 'This agent is currently running and processing tasks.' 
                      : 'This agent is disabled and not processing any tasks.'}
                  </p>
                </div>

                <div className="pt-2 border-t">
                  <h3 className="text-sm font-medium mb-2">Tasks</h3>
                  <div className="flex justify-between items-center text-sm">
                    <span>Active Tasks</span>
                    <span className="font-medium">
                      {agent.tasks.filter(t => t.enabled).length}/{agent.tasks.length}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <h3 className="text-sm font-medium mb-2">Activity</h3>
                  <div className="text-xs text-muted-foreground">
                    <div className="flex justify-between mb-1">
                      <span>Last execution</span>
                      <span>2 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next scheduled run</span>
                      <span>4 hours from now</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Model Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <ModelSelector agent={agent} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Required Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {/* Get unique capabilities across all tasks */}
                {[...new Set(agent.tasks.flatMap(task => task.requiredCapabilities))].map((capability, idx) => (
                  <Badge key={idx} variant="outline" className="mr-1 mb-1">
                    {capability}
                  </Badge>
                ))}
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p>
                  These capabilities are required by one or more tasks 
                  assigned to this agent.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Agent Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All Tasks ({agent.tasks.length})</TabsTrigger>
                  <TabsTrigger value="active">
                    Active ({agent.tasks.filter(t => t.enabled).length})
                  </TabsTrigger>
                  <TabsTrigger value="inactive">
                    Inactive ({agent.tasks.filter(t => !t.enabled).length})
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4 space-y-4">
                  {agent.tasks.map((task, idx) => (
                    <div key={idx} className="border rounded-md overflow-hidden">
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <h3 className="font-medium">{task.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {task.description}
                          </p>
                        </div>
                        <Switch checked={task.enabled} />
                      </div>
                      <div className="bg-muted/30 px-4 py-2 text-xs flex justify-between items-center">
                        <div className="flex flex-wrap gap-1">
                          {task.requiredCapabilities.map((cap, capIdx) => (
                            <span key={capIdx} className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                              {cap}
                            </span>
                          ))}
                        </div>
                        {task.schedule && (
                          <span className="text-muted-foreground">
                            Schedule: {task.schedule}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="active" className="mt-4 space-y-4">
                  {agent.tasks.filter(t => t.enabled).map((task, idx) => (
                    <div key={idx} className="border rounded-md overflow-hidden">
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <h3 className="font-medium">{task.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {task.description}
                          </p>
                        </div>
                        <Switch checked={task.enabled} />
                      </div>
                      <div className="bg-muted/30 px-4 py-2 text-xs flex justify-between items-center">
                        <div className="flex flex-wrap gap-1">
                          {task.requiredCapabilities.map((cap, capIdx) => (
                            <span key={capIdx} className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                              {cap}
                            </span>
                          ))}
                        </div>
                        {task.schedule && (
                          <span className="text-muted-foreground">
                            Schedule: {task.schedule}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="inactive" className="mt-4 space-y-4">
                  {agent.tasks.filter(t => !t.enabled).map((task, idx) => (
                    <div key={idx} className="border rounded-md overflow-hidden">
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <h3 className="font-medium">{task.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {task.description}
                          </p>
                        </div>
                        <Switch checked={task.enabled} />
                      </div>
                      <div className="bg-muted/30 px-4 py-2 text-xs flex justify-between items-center">
                        <div className="flex flex-wrap gap-1">
                          {task.requiredCapabilities.map((cap, capIdx) => (
                            <span key={capIdx} className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                              {cap}
                            </span>
                          ))}
                        </div>
                        {task.schedule && (
                          <span className="text-muted-foreground">
                            Schedule: {task.schedule}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Associated Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/20 cursor-pointer">
                    <div>
                      <h3 className="font-medium">Content Marketing Workflow</h3>
                      <p className="text-xs text-muted-foreground">2 tasks from this agent</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/20 cursor-pointer">
                    <div>
                      <h3 className="font-medium">Affiliate Marketing Workflow</h3>
                      <p className="text-xs text-muted-foreground">1 task from this agent</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Data Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/20 cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <span className="text-green-600 font-bold">M</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Market Research Database</h3>
                        <p className="text-xs text-muted-foreground">MongoDB</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50">Connected</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/20 cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <span className="text-purple-600 font-bold">V</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Content Knowledge Base</h3>
                        <p className="text-xs text-muted-foreground">Vector DB</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50">Connected</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
