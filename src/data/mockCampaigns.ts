
import { Campaign } from "@/types";

export const mockCampaigns: Campaign[] = [
  {
    id: "campaign-1",
    name: "Q4 Product Launch",
    description: "Comprehensive marketing campaign for new AI product launch",
    goal: "Generate 10,000 leads and achieve 50% brand awareness increase",
    enabled: true,
    managerId: "manager-1",
    managerName: "Sarah Marketing",
    assignedAgents: ["agent-1", "agent-2", "agent-3"],
    startDate: "2024-10-01",
    endDate: "2024-12-31",
    status: "active",
    progress: 65
  },
  {
    id: "campaign-2",
    name: "Customer Retention Drive",
    description: "Focus on improving customer satisfaction and reducing churn",
    goal: "Reduce churn rate by 30% and increase customer satisfaction to 95%",
    enabled: true,
    managerId: "manager-2",
    managerName: "Mike Relations",
    assignedAgents: ["agent-4", "agent-5"],
    startDate: "2024-11-01",
    endDate: "2025-02-28",
    status: "active",
    progress: 25
  },
  {
    id: "campaign-3",
    name: "Content Strategy Revamp",
    description: "Overhaul content creation and distribution strategy",
    goal: "Increase content engagement by 200% and grow social media following by 50%",
    enabled: false,
    managerId: "manager-3",
    managerName: "Emma Content",
    assignedAgents: ["agent-6"],
    startDate: "2025-01-15",
    status: "draft",
    progress: 0
  }
];
