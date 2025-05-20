
import { Workflow } from "@/types";

export const mockWorkflows: Workflow[] = [
  {
    id: "content-marketing-workflow",
    name: "Content Marketing Workflow",
    description: "End-to-end workflow for content marketing from research to publication and analytics",
    enabled: true,
    platform: "n8n",
    steps: [
      {
        id: "step-1",
        name: "Market Research",
        agentId: "market-research-agent",
        taskId: "keyword-research",
        nextSteps: ["step-2"]
      },
      {
        id: "step-2",
        name: "Content Creation",
        agentId: "content-creation-agent",
        taskId: "blog-post-generation",
        nextSteps: ["step-3"]
      },
      {
        id: "step-3",
        name: "SEO Optimization",
        agentId: "content-creation-agent",
        taskId: "seo-optimization",
        nextSteps: ["step-4"]
      },
      {
        id: "step-4",
        name: "Social Media Distribution",
        agentId: "content-creation-agent",
        taskId: "social-media-content",
        nextSteps: ["step-5"]
      },
      {
        id: "step-5",
        name: "Performance Analysis",
        agentId: "analytics-agent",
        taskId: "kpi-monitoring",
        nextSteps: []
      }
    ]
  },
  {
    id: "freelance-management-workflow",
    name: "Freelance Opportunity Workflow",
    description: "Complete workflow for finding, applying to, and managing freelance opportunities",
    enabled: false,
    platform: "huginn",
    steps: [
      {
        id: "step-1",
        name: "Job Monitoring",
        agentId: "freelance-management-agent",
        taskId: "job-opportunity-monitoring",
        nextSteps: ["step-2"]
      },
      {
        id: "step-2",
        name: "Proposal Creation",
        agentId: "content-creation-agent",
        taskId: "freelance-proposals",
        nextSteps: ["step-3"]
      },
      {
        id: "step-3",
        name: "Proposal Submission",
        agentId: "freelance-management-agent",
        taskId: "proposal-submission",
        nextSteps: ["step-4"]
      },
      {
        id: "step-4",
        name: "Client Communication",
        agentId: "customer-relations-agent",
        taskId: "communication-templates",
        nextSteps: ["step-5"]
      },
      {
        id: "step-5",
        name: "Deliverable Management",
        agentId: "freelance-management-agent",
        taskId: "deliverable-management",
        nextSteps: ["step-6"]
      },
      {
        id: "step-6",
        name: "Feedback Analysis",
        agentId: "freelance-management-agent",
        taskId: "feedback-processing",
        nextSteps: []
      }
    ]
  },
  {
    id: "affiliate-marketing-workflow",
    name: "Affiliate Marketing Workflow",
    description: "Complete workflow for affiliate product marketing",
    enabled: true,
    platform: "n8n",
    steps: [
      {
        id: "step-1",
        name: "Program Evaluation",
        agentId: "market-research-agent",
        taskId: "affiliate-evaluation",
        nextSteps: ["step-2"]
      },
      {
        id: "step-2",
        name: "Review Creation",
        agentId: "content-creation-agent",
        taskId: "product-review-writing",
        nextSteps: ["step-3"]
      },
      {
        id: "step-3",
        name: "SEO Optimization",
        agentId: "content-creation-agent",
        taskId: "seo-optimization",
        nextSteps: ["step-4", "step-5"]
      },
      {
        id: "step-4",
        name: "Social Promotion",
        agentId: "content-creation-agent",
        taskId: "social-media-content",
        nextSteps: ["step-6"]
      },
      {
        id: "step-5",
        name: "Email Marketing",
        agentId: "customer-relations-agent",
        taskId: "lead-nurturing",
        nextSteps: ["step-6"]
      },
      {
        id: "step-6",
        name: "Conversion Tracking",
        agentId: "analytics-agent",
        taskId: "conversion-tracking",
        nextSteps: []
      }
    ]
  }
];
