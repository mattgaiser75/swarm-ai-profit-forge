
export type AgentType = 
  | "market-research"
  | "content-creation"
  | "customer-relations"
  | "freelance-management"
  | "analytics-reports"
  | "admin-management";

export type PlatformType = "huginn" | "n8n";

export type ModelProvider = 
  | "mistral"
  | "google"
  | "openai"
  | "llama"
  | "falcon"
  | "other";

export interface AIModel {
  id: string;
  name: string;
  provider: ModelProvider;
  capabilities: string[];
  contextWindow: number;
  costPer1KTokens: number;
}

export interface AgentConfig {
  id: string;
  name: string;
  type: AgentType;
  description: string;
  model: AIModel;
  enabled: boolean;
  tasks: AgentTask[];
}

export interface AgentTask {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  schedule?: string;
  requiredCapabilities: string[];
}

export interface WorkflowStep {
  id: string;
  name: string;
  agentId: string;
  taskId: string;
  nextSteps: string[];
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  steps: WorkflowStep[];
  platform: PlatformType;
}

export interface DataSource {
  id: string;
  name: string;
  type: "mongodb" | "vector" | "sqlite";
  description: string;
  connected: boolean;
}

export interface PlatformComparison {
  feature: string;
  huginn: {
    supported: boolean;
    notes?: string;
  };
  n8n: {
    supported: boolean;
    notes?: string;
  };
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  goal: string;
  enabled: boolean;
  managerId: string;
  managerName: string;
  assignedAgents: string[];
  startDate: string;
  endDate?: string;
  status: "active" | "paused" | "completed" | "draft";
  progress: number;
}
