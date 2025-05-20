
import React from "react";
import { useSwarm } from "@/context/SwarmContext";
import { AgentConfig, AIModel } from "@/types";
import { Check, AlertTriangle } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";

interface ModelSelectorProps {
  agent: AgentConfig;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ agent }) => {
  const { models, updateAgentModel, isModelCompatibleWithAgent } = useSwarm();

  const handleModelChange = (modelId: string) => {
    updateAgentModel(agent.id, modelId);
  };

  // Group models by provider
  const modelsByProvider = models.reduce<Record<string, AIModel[]>>((acc, model) => {
    const provider = model.provider;
    if (!acc[provider]) {
      acc[provider] = [];
    }
    acc[provider].push(model);
    return acc;
  }, {});

  const getProviderLabel = (provider: string) => {
    switch (provider) {
      case "mistral":
        return "Mistral AI";
      case "google":
        return "Google AI";
      case "openai":
        return "OpenAI (Fallback)";
      default:
        return provider.charAt(0).toUpperCase() + provider.slice(1);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">AI Model</label>
        <div className="text-xs text-muted-foreground">
          Current: {agent.model.name}
        </div>
      </div>

      <Select 
        value={agent.model.id}
        onValueChange={handleModelChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(modelsByProvider).map(([provider, providerModels]) => (
            <div key={provider}>
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                {getProviderLabel(provider)}
              </div>
              {providerModels.map((model) => {
                const isCompatible = isModelCompatibleWithAgent(model, agent);
                return (
                  <SelectItem 
                    key={model.id} 
                    value={model.id}
                    disabled={!isCompatible}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{model.name}</span>
                      {!isCompatible ? (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      ) : (
                        model.id === agent.model.id && (
                          <Check className="h-4 w-4 text-primary" />
                        )
                      )}
                    </div>
                  </SelectItem>
                );
              })}
            </div>
          ))}
        </SelectContent>
      </Select>

      {/* Model info panel */}
      <div className="mt-2 p-3 bg-muted/50 rounded-md text-sm">
        <div className="font-medium mb-1 flex items-center justify-between">
          <span>{agent.model.name}</span>
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
            ${agent.model.costPer1KTokens} / 1K tokens
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          <p className="mb-1">Context: {agent.model.contextWindow.toLocaleString()} tokens</p>
          <p>Provider: {getProviderLabel(agent.model.provider)}</p>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;
