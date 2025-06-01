
import React from "react";
import { useSwarm } from "@/context/SwarmContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OptimizationStats from "./OptimizationStats";
import ModelRecommendationCard from "./ModelRecommendationCard";
import ManualModelSelector from "./ManualModelSelector";
import { useModelOptimization } from "@/hooks/useModelOptimization";

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
  ).filter(Boolean) as any[] || [];

  const { optimizationRecommendations, totalCostSavings, avgCapabilityMatch } = useModelOptimization(
    campaignAgents, 
    models
  );

  if (!campaign) return null;

  const handleModelChange = (agentId: string, modelId: string) => {
    updateAgentModel(agentId, modelId);
  };

  const agentsToOptimize = optimizationRecommendations.filter(r => r.costSavings > 0).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>AI Model Optimizer - {campaign.name}</DialogTitle>
          <p className="text-muted-foreground">
            Optimize AI model assignments for maximum efficiency and cost savings
          </p>
        </DialogHeader>

        <OptimizationStats 
          totalCostSavings={totalCostSavings}
          agentsToOptimize={agentsToOptimize}
          totalAgents={campaignAgents.length}
          avgCapabilityMatch={avgCapabilityMatch}
        />

        <Tabs defaultValue="recommendations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="manual">Manual Selection</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-4">
            {optimizationRecommendations.map((rec) => (
              <ModelRecommendationCard
                key={rec.agent.id}
                agent={rec.agent}
                currentModel={rec.currentModel}
                recommendedModel={rec.recommendedModel!}
                costSavings={rec.costSavings}
                capabilityMatch={rec.capabilityMatch}
                onApplyRecommendation={handleModelChange}
              />
            ))}
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            {campaignAgents.map((agent) => (
              <ManualModelSelector
                key={agent.id}
                agent={agent}
                models={models}
                isModelCompatibleWithAgent={isModelCompatibleWithAgent}
                onModelChange={handleModelChange}
              />
            ))}
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
