
import React, { useState } from "react";
import { useSwarm } from "@/context/SwarmContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Plus, Goal, Users, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import CreateGoalDialog from "@/components/tasks/CreateGoalDialog";

const Tasks = () => {
  const { agents } = useSwarm();
  const [showCreateGoal, setShowCreateGoal] = useState(false);

  // Get all tasks from all agents
  const allTasks = agents.flatMap(agent => 
    agent.tasks.map(task => ({ ...task, agentId: agent.id, agentName: agent.name }))
  );

  const activeTasks = allTasks.filter(task => task.enabled);
  const inactiveTasks = allTasks.filter(task => !task.enabled);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tasks & Goals</h1>
          <p className="text-muted-foreground">
            Manage tasks across your AI swarm and create new goals
          </p>
        </div>
        <Button onClick={() => setShowCreateGoal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              Total Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allTasks.length}</div>
            <p className="text-xs text-muted-foreground">Across all agents</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Goal className="h-4 w-4 mr-2" />
              Active Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeTasks.length}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Active Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.filter(a => a.enabled).length}</div>
            <p className="text-xs text-muted-foreground">Out of {agents.length} total</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tasks ({allTasks.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeTasks.length})</TabsTrigger>
          <TabsTrigger value="inactive">Inactive ({inactiveTasks.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {allTasks.map((task) => (
            <Card key={`${task.agentId}-${task.id}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{task.name}</h3>
                      <Badge variant="outline">{task.agentName}</Badge>
                      <Badge variant={task.enabled ? "default" : "secondary"}>
                        {task.enabled ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {task.requiredCapabilities.map((capability, idx) => (
                        <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs">
                          {capability}
                        </span>
                      ))}
                    </div>
                    {task.schedule && (
                      <p className="text-xs text-muted-foreground mt-2">Schedule: {task.schedule}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={task.enabled} />
                    <Link to={`/agents/${task.agentId}`}>
                      <Button variant="outline" size="sm">View Agent</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {activeTasks.map((task) => (
            <Card key={`${task.agentId}-${task.id}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{task.name}</h3>
                      <Badge variant="outline">{task.agentName}</Badge>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {task.requiredCapabilities.map((capability, idx) => (
                        <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs">
                          {capability}
                        </span>
                      ))}
                    </div>
                    {task.schedule && (
                      <p className="text-xs text-muted-foreground mt-2">Schedule: {task.schedule}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={task.enabled} />
                    <Link to={`/agents/${task.agentId}`}>
                      <Button variant="outline" size="sm">View Agent</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          {inactiveTasks.map((task) => (
            <Card key={`${task.agentId}-${task.id}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{task.name}</h3>
                      <Badge variant="outline">{task.agentName}</Badge>
                      <Badge variant="secondary">Inactive</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {task.requiredCapabilities.map((capability, idx) => (
                        <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs">
                          {capability}
                        </span>
                      ))}
                    </div>
                    {task.schedule && (
                      <p className="text-xs text-muted-foreground mt-2">Schedule: {task.schedule}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={task.enabled} />
                    <Link to={`/agents/${task.agentId}`}>
                      <Button variant="outline" size="sm">View Agent</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <CreateGoalDialog 
        open={showCreateGoal} 
        onOpenChange={setShowCreateGoal}
      />
    </div>
  );
};

export default Tasks;
