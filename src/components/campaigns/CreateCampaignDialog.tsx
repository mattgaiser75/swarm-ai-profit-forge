
import React, { useState } from "react";
import { useSwarm } from "@/context/SwarmContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

interface CreateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateCampaignDialog = ({ open, onOpenChange }: CreateCampaignDialogProps) => {
  const { agents } = useSwarm();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    goal: "",
    managerName: "",
    startDate: "",
    endDate: "",
    selectedAgents: [] as string[]
  });

  const handleAgentToggle = (agentId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedAgents: prev.selectedAgents.includes(agentId)
        ? prev.selectedAgents.filter(id => id !== agentId)
        : [...prev.selectedAgents, agentId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating campaign:", formData);
    // Here you would typically call a function to create the campaign
    onOpenChange(false);
    setFormData({
      name: "",
      description: "",
      goal: "",
      managerName: "",
      startDate: "",
      endDate: "",
      selectedAgents: []
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter campaign name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the campaign objectives and strategy"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="goal">Campaign Goal</Label>
              <Textarea
                id="goal"
                value={formData.goal}
                onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value }))}
                placeholder="Define specific, measurable goals for this campaign"
                rows={2}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="manager">Campaign Manager</Label>
              <Input
                id="manager"
                value={formData.managerName}
                onChange={(e) => setFormData(prev => ({ ...prev, managerName: e.target.value }))}
                placeholder="Name of the campaign manager"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="endDate">End Date (Optional)</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label className="text-base font-medium mb-3 block">
              Assign Agents to Campaign ({formData.selectedAgents.length} selected)
            </Label>
            <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
              {agents.map((agent) => (
                <Card key={agent.id} className="cursor-pointer hover:bg-muted/50">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={formData.selectedAgents.includes(agent.id)}
                        onCheckedChange={() => handleAgentToggle(agent.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{agent.name}</h4>
                          <span className={`px-2 py-1 rounded-md text-xs ${
                            agent.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {agent.enabled ? 'Available' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{agent.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {agent.tasks.length} tasks • {agent.type}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Campaign
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaignDialog;
