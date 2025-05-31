
import React, { useState } from "react";
import { useSwarm } from "@/context/SwarmContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CreateGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateGoalDialog: React.FC<CreateGoalDialogProps> = ({ open, onOpenChange }) => {
  const { agents } = useSwarm();
  const [goalName, setGoalName] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [schedule, setSchedule] = useState("");
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([]);

  // Common capabilities based on existing agent tasks
  const commonCapabilities = [
    "market-analysis",
    "content-generation",
    "social-media",
    "data-processing",
    "web-scraping",
    "email-automation",
    "reporting",
    "customer-service",
    "seo-optimization",
    "competitor-analysis"
  ];

  const handleCapabilityChange = (capability: string, checked: boolean) => {
    if (checked) {
      setSelectedCapabilities([...selectedCapabilities, capability]);
    } else {
      setSelectedCapabilities(selectedCapabilities.filter(cap => cap !== capability));
    }
  };

  const handleCreateGoal = () => {
    console.log("Creating goal:", {
      goalName,
      goalDescription,
      selectedAgent,
      taskName,
      taskDescription,
      schedule,
      selectedCapabilities
    });
    
    // Here you would typically create the goal and task
    // For now, we'll just log it and close the dialog
    
    // Reset form
    setGoalName("");
    setGoalDescription("");
    setSelectedAgent("");
    setTaskName("");
    setTaskDescription("");
    setSchedule("");
    setSelectedCapabilities([]);
    
    onOpenChange(false);
  };

  const selectedAgentData = agents.find(agent => agent.id === selectedAgent);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Goal & Assign Task</DialogTitle>
          <DialogDescription>
            Set a new goal for your AI swarm and assign a task to an agent to achieve it.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Goal Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Goal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal-name">Goal Name</Label>
                <Input
                  id="goal-name"
                  placeholder="e.g., Increase social media engagement"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal-description">Goal Description</Label>
                <Textarea
                  id="goal-description"
                  placeholder="Describe what you want to achieve with this goal..."
                  value={goalDescription}
                  onChange={(e) => setGoalDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Agent Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Agent Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agent-select">Select Agent</Label>
                <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an agent for this task" />
                  </SelectTrigger>
                  <SelectContent>
                    {agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        <div className="flex items-center space-x-2">
                          <span>{agent.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {agent.type}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedAgentData && (
                <div className="p-3 bg-muted/30 rounded-md">
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Agent:</strong> {selectedAgentData.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Current Tasks:</strong> {selectedAgentData.tasks.length} 
                    ({selectedAgentData.tasks.filter(t => t.enabled).length} active)
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Task Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Task Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="task-name">Task Name</Label>
                <Input
                  id="task-name"
                  placeholder="e.g., Daily social media content creation"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-description">Task Description</Label>
                <Textarea
                  id="task-description"
                  placeholder="Describe the specific task the agent should perform..."
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule">Schedule (Optional)</Label>
                <Input
                  id="schedule"
                  placeholder="e.g., Daily at 9 AM, Weekly on Mondays"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Required Capabilities */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Required Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {commonCapabilities.map((capability) => (
                  <div key={capability} className="flex items-center space-x-2">
                    <Checkbox
                      id={capability}
                      checked={selectedCapabilities.includes(capability)}
                      onCheckedChange={(checked) => 
                        handleCapabilityChange(capability, checked as boolean)
                      }
                    />
                    <Label htmlFor={capability} className="text-sm font-normal">
                      {capability}
                    </Label>
                  </div>
                ))}
              </div>
              {selectedCapabilities.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Selected capabilities:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedCapabilities.map((cap) => (
                      <Badge key={cap} variant="outline">
                        {cap}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreateGoal}
            disabled={!goalName || !selectedAgent || !taskName}
          >
            Create Goal & Assign Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGoalDialog;
