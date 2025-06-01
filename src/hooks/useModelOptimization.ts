
import { useMemo } from "react";
import { AgentConfig, AIModel } from "@/types";

interface OptimizationRecommendation {
  agent: AgentConfig;
  currentModel: AIModel;
  recommendedModel: AIModel | null;
  compatibleModels: AIModel[];
  costSavings: number;
  capabilityMatch: number;
}

export const useModelOptimization = (
  campaignAgents: AgentConfig[], 
  models: AIModel[]
) => {
  const optimizationRecommendations = useMemo(() => {
    return campaignAgents.map(agent => {
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
      const recommendedModel = sortedModels[0] || null;
      
      return {
        agent,
        currentModel,
        recommendedModel,
        compatibleModels: sortedModels,
        costSavings: recommendedModel ? currentModel.costPer1KTokens - recommendedModel.costPer1KTokens : 0,
        capabilityMatch: recommendedModel ? 
          agentCapabilities.filter(cap => recommendedModel.capabilities.includes(cap)).length / agentCapabilities.length * 100 : 0
      };
    }).filter((rec): rec is OptimizationRecommendation => rec.recommendedModel !== null);
  }, [campaignAgents, models]);

  const totalCostSavings = useMemo(() => {
    return optimizationRecommendations.reduce((sum, rec) => sum + (rec.costSavings > 0 ? rec.costSavings : 0), 0);
  }, [optimizationRecommendations]);

  const avgCapabilityMatch = useMemo(() => {
    if (optimizationRecommendations.length === 0) return 0;
    return optimizationRecommendations.reduce((sum, r) => sum + r.capabilityMatch, 0) / optimizationRecommendations.length;
  }, [optimizationRecommendations]);

  return {
    optimizationRecommendations,
    totalCostSavings,
    avgCapabilityMatch
  };
};
