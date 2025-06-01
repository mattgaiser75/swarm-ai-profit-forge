
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";
import { AgentConfig, AIModel } from "@/types";

interface ManualModelSelectorProps {
  agent: AgentConfig;
  models: AIModel[];
  isModelCompatibleWithAgent: (model: AIModel, agent: AgentConfig) => boolean;
  onModelChange: (agentId: string, modelId: string) => void;
}

const ManualModelSelector = ({
  agent,
  models,
  isModelCompatibleWithAgent,
  onModelChange
}: ManualModelSelectorProps) => {
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

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Select AI Model</label>
            <Select
              value={agent.model.id}
              onValueChange={(modelId) => onModelChange(agent.id, modelId)}
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
};

export default ManualModelSelector;
