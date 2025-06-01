
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AgentConfig, AIModel } from "@/types";

interface ModelRecommendationCardProps {
  agent: AgentConfig;
  currentModel: AIModel;
  recommendedModel: AIModel;
  costSavings: number;
  capabilityMatch: number;
  onApplyRecommendation: (agentId: string, modelId: string) => void;
}

const ModelRecommendationCard = ({
  agent,
  currentModel,
  recommendedModel,
  costSavings,
  capabilityMatch,
  onApplyRecommendation
}: ModelRecommendationCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold">{agent.name}</h3>
            <p className="text-sm text-muted-foreground">{agent.description}</p>
          </div>
          <Badge variant="outline">{agent.type}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Current Model</span>
              {costSavings > 0 && (
                <Badge variant="outline" className="text-red-600">
                  Higher Cost
                </Badge>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{currentModel.name}</span>
                <Badge variant="secondary">{currentModel.provider}</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Cost:</span>
                  <span>${currentModel.costPer1KTokens}/1K tokens</span>
                </div>
                <div className="flex justify-between">
                  <span>Context:</span>
                  <span>{currentModel.contextWindow.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-md p-3 bg-green-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Recommended Model</span>
              {costSavings > 0 ? (
                <Badge className="bg-green-600">
                  Save ${costSavings.toFixed(4)}
                </Badge>
              ) : (
                <Badge variant="outline" className="text-green-600">
                  Optimal
                </Badge>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{recommendedModel.name}</span>
                <Badge variant="secondary">{recommendedModel.provider}</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Cost:</span>
                  <span>${recommendedModel.costPer1KTokens}/1K tokens</span>
                </div>
                <div className="flex justify-between">
                  <span>Match:</span>
                  <span>{Math.round(capabilityMatch)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Required capabilities: {agent.tasks.flatMap(t => t.requiredCapabilities).join(", ")}
          </div>
          {costSavings > 0 && (
            <Button 
              size="sm"
              onClick={() => onApplyRecommendation(agent.id, recommendedModel.id)}
            >
              Apply Recommendation
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelRecommendationCard;
