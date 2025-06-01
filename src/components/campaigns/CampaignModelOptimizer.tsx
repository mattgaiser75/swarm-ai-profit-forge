
import React, { useState } from "react";
import { useSwarm } from "@/context/SwarmContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cpu, DollarSign, Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface CampaignModelOptimizerProps {
  campaignId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CampaignModelOptimizer = ({ campaignId, open, onOpenChange }: CampaignModelOptimizerProps) => {
  const { campaigns, agents, models, updateAgentModel, isModelCompatibleWithAgent } = useSwarm();
  
  const campaign = campaigns.find(c => c.id === campaignId);
  const campaignAgents = campaign?.assignedAgents.map((agentId: string) => 
    agents.find(a => a.id === agentId)
  ).filter(Boolean) || [];

  const [optimizationRecommendations, setOptimizationRecommendations] = useState<any[]>([]);

  if (!campaign) return null;

  const generateRecommendations = () => {
    const recommendations = campaignAgents.map(agent => {
      if (!agent) return null;
      
      const agentCapabilities = [...new Set(agent.tasks.flatMap(task => task.requiredCapabilities))];
      
      // Find models that have all required capabilities
      const compatibleModels = models.filter(model => 
        agentCapabilities.every(cap => model.capabilities.includes(cap))
      );

      // Sort by cost efficiency and capabilities
      const sortedModels = compatibleModels.sort((a, b) => {
        const aScore = a.capabilities.length / a.costPer1KTokens;
        const bScore = b.capabilities.length / b.costPer1KTokens;
        return bScore - aScore;
      });

      const currentModel = agent.model;
      const recommendedModel = sortedModels[0];
      
      return {
        agent,
        currentModel,
        recommendedModel,
        compatibleModels: sortedModels,
        costSavings: recommendedModel ? currentModel.costPer1KTokens - recommendedModel.costPer1KTokens : 0,
        capabilityMatch: recommendedModel ? 
          agentCapabilities.filter(cap => recommendedModel.capabilities.includes(cap)).length / agentCapabilities.length * 100 : 0
      };
    }).filter(Boolean);

    setOptimizationRecommendations(recommendations);
  };

  React.useEffect(() => {
    if (open) {
      generateRecommendations();
    }
  }, [open, campaignAgents]);

  const handleModelChange = (agentId: string, modelId: string) => {
    updateAgentModel(agentId, modelId);
    generateRecommendations(); // Refresh recommendations
  };

  const getTotalCostSavings = () => {
    return optimizationRecommendations.reduce((sum, rec) => sum + (rec.costSavings > 0 ? rec.costSavings : 0), 0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>AI Model Optimizer - {campaign.name}</DialogTitle>
          <p className="text-muted-foreground">
            Optimize AI model assignments for maximum efficiency and cost savings
          </p>
        </DialogHeader>

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
                ${getTotalCostSavings().toFixed(4)}
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
                {optimizationRecommendations.filter(r => r.costSavings > 0).length}
              </div>
              <p className="text-xs text-muted-foreground">Out of {campaignAgents.length}</p>
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
                {Math.round(optimizationRecommendations.reduce((sum, r) => sum + r.capabilityMatch, 0) / optimizationRecommendations.length || 0)}%
              </div>
              <p className="text-xs text-muted-foreground">Avg. capability match</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recommendations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="manual">Manual Selection</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-4">
            {optimizationRecommendations.map((rec) => (
              <Card key={rec.agent.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{rec.agent.name}</h3>
                      <p className="text-sm text-muted-foreground">{rec.agent.description}</p>
                    </div>
                    <Badge variant="outline">{rec.agent.type}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Current Model</span>
                        {rec.costSavings > 0 && (
                          <Badge variant="outline" className="text-red-600">
                            Higher Cost
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{rec.currentModel.name}</span>
                          <Badge variant="secondary">{rec.currentModel.provider}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Cost:</span>
                            <span>${rec.currentModel.costPer1KTokens}/1K tokens</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Context:</span>
                            <span>{rec.currentModel.contextWindow.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-md p-3 bg-green-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Recommended Model</span>
                        {rec.costSavings > 0 ? (
                          <Badge className="bg-green-600">
                            Save ${rec.costSavings.toFixed(4)}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-green-600">
                            Optimal
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{rec.recommendedModel?.name}</span>
                          <Badge variant="secondary">{rec.recommendedModel?.provider}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Cost:</span>
                            <span>${rec.recommendedModel?.costPer1KTokens}/1K tokens</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Match:</span>
                            <span>{Math.round(rec.capabilityMatch)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Required capabilities: {rec.agent.tasks.flatMap(t => t.requiredCapabilities).join(", ")}
                    </div>
                    {rec.costSavings > 0 && (
                      <Button 
                        size="sm"
                        onClick={() => handleModelChange(rec.agent.id, rec.recommendedModel.id)}
                      >
                        Apply Recommendation
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            {campaignAgents.map((agent) => {
              if (!agent) return null;
              return (
                <Card key={agent.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{agent.name}</h3>
                        <p className="text-sm text-muted-foreground">{agent.description}</p>
                      </div>
                      <Badge variant="outline">{agent.type}</Badge>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Select AI Model</label>
                        <Select
                          value={agent.model.id}
                          onValueChange={(modelId) => handleModelChange(agent.id, modelId)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {models.map((model) => {
                              const isCompatible = isModelCompatibleWithAgent(model, agent);
                              return (
                                <SelectItem 
                                  key={model.id} 
                                  value={model.id}
                                  disabled={!isCompatible}
                                >
                                  <div className="flex items-center justify-between w-full">
                                    <span>{model.name}</span>
                                    <div className="flex items-center gap-2 ml-4">
                                      <Badge variant="outline">{model.provider}</Badge>
                                      <span className="text-xs">${model.costPer1KTokens}</span>
                                      {!isCompatible && <AlertTriangle className="h-3 w-3 text-amber-500" />}
                                    </div>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        <p>Required capabilities: {agent.tasks.flatMap(t => t.requiredCapabilities).join(", ")}</p>
                        <p>Current model capabilities: {agent.model.capabilities.join(", ")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignModelOptimizer;
