
import React, { createContext, useContext, useState } from "react";
import { 
  AgentConfig, 
  AIModel, 
  Workflow,
  DataSource,
  PlatformComparison
} from "@/types";

// Mock data
import { mockAgents } from "@/data/mockAgents";
import { mockModels } from "@/data/mockModels";
import { mockWorkflows } from "@/data/mockWorkflows";
import { mockDataSources } from "@/data/mockDataSources";
import { mockPlatformComparison } from "@/data/mockPlatformComparison";

interface SwarmContextType {
  agents: AgentConfig[];
  models: AIModel[];
  workflows: Workflow[];
  dataSources: DataSource[];
  platformComparison: PlatformComparison[];
  updateAgent: (agent: AgentConfig) => void;
  toggleAgentStatus: (agentId: string) => void;
  updateAgentModel: (agentId: string, modelId: string) => void;
  isModelCompatibleWithAgent: (model: AIModel, agent: AgentConfig) => boolean;
}

const SwarmContext = createContext<SwarmContextType | undefined>(undefined);

export const SwarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agents, setAgents] = useState<AgentConfig[]>(mockAgents);
  const [models] = useState<AIModel[]>(mockModels);
  const [workflows] = useState<Workflow[]>(mockWorkflows);
  const [dataSources] = useState<DataSource[]>(mockDataSources);
  const [platformComparison] = useState<PlatformComparison[]>(mockPlatformComparison);

  const updateAgent = (updatedAgent: AgentConfig) => {
    setAgents(agents.map(agent => 
      agent.id === updatedAgent.id ? updatedAgent : agent
    ));
  };

  const toggleAgentStatus = (agentId: string) => {
    setAgents(agents.map(agent => 
      agent.id === agentId ? { ...agent, enabled: !agent.enabled } : agent
    ));
  };

  const updateAgentModel = (agentId: string, modelId: string) => {
    const selectedModel = models.find(model => model.id === modelId);
    if (!selectedModel) return;

    setAgents(agents.map(agent => 
      agent.id === agentId ? { ...agent, model: selectedModel } : agent
    ));
  };

  const isModelCompatibleWithAgent = (model: AIModel, agent: AgentConfig) => {
    // Get all unique required capabilities across all tasks
    const requiredCapabilities = new Set<string>();
    agent.tasks.forEach(task => {
      task.requiredCapabilities.forEach(cap => requiredCapabilities.add(cap));
    });

    // Check if the model has all required capabilities
    return Array.from(requiredCapabilities)
      .every(capability => model.capabilities.includes(capability));
  };

  return (
    <SwarmContext.Provider value={{
      agents,
      models,
      workflows,
      dataSources,
      platformComparison,
      updateAgent,
      toggleAgentStatus,
      updateAgentModel,
      isModelCompatibleWithAgent
    }}>
      {children}
    </SwarmContext.Provider>
  );
};

export const useSwarm = () => {
  const context = useContext(SwarmContext);
  if (context === undefined) {
    throw new Error("useSwarm must be used within a SwarmProvider");
  }
  return context;
};
