
import { AgentConfig } from "@/types";
import { mockModels } from "./mockModels";

export const mockAgents: AgentConfig[] = [
  {
    id: "market-research-agent",
    name: "Market Research Agent",
    type: "market-research",
    description: "Analyzes market trends, identifies niches, and researches competitors",
    model: mockModels[0], // Mistral Medium
    enabled: true,
    tasks: [
      {
        id: "niche-identification",
        name: "Niche Identification",
        description: "Identifies profitable niches based on trends and competition",
        enabled: true,
        schedule: "0 0 * * 1", // Weekly on Monday
        requiredCapabilities: ["text-generation", "data-analysis"]
      },
      {
        id: "competitor-analysis",
        name: "Competitor Analysis",
        description: "Analyzes competitor strategies, strengths, and weaknesses",
        enabled: true,
        schedule: "0 0 1,15 * *", // 1st and 15th of month
        requiredCapabilities: ["text-generation", "data-analysis"]
      },
      {
        id: "keyword-research",
        name: "Keyword Research",
        description: "Identifies valuable keywords for content and SEO",
        enabled: true,
        schedule: "0 0 * * 3", // Weekly on Wednesday
        requiredCapabilities: ["text-generation", "semantic-search"]
      },
      {
        id: "trend-detection",
        name: "Trend Detection",
        description: "Monitors and reports on emerging industry trends",
        enabled: false,
        schedule: "0 9 * * *", // Daily at 9am
        requiredCapabilities: ["text-generation", "data-analysis"]
      },
      {
        id: "affiliate-evaluation",
        name: "Affiliate Program Evaluation",
        description: "Evaluates affiliate programs for profitability and reliability",
        enabled: true,
        schedule: "0 0 * * 5", // Weekly on Friday
        requiredCapabilities: ["text-generation", "data-analysis"]
      }
    ]
  },
  {
    id: "content-creation-agent",
    name: "Content Creation Agent",
    type: "content-creation",
    description: "Generates SEO-optimized content for blogs, reviews, and social media",
    model: mockModels[2], // Gemini Pro
    enabled: true,
    tasks: [
      {
        id: "blog-post-generation",
        name: "Blog Post Generation",
        description: "Creates SEO-optimized blog posts on specified topics",
        enabled: true,
        schedule: "0 9 * * 2,4", // Tuesday and Thursday at 9am
        requiredCapabilities: ["text-generation", "semantic-search"]
      },
      {
        id: "product-review-writing",
        name: "Product Review Writing",
        description: "Writes detailed product reviews with affiliate links",
        enabled: true,
        schedule: "0 10 * * 3", // Wednesday at 10am
        requiredCapabilities: ["text-generation"]
      },
      {
        id: "social-media-content",
        name: "Social Media Content Creation",
        description: "Creates engaging social media posts with calls to action",
        enabled: true,
        schedule: "0 14 * * 1-5", // Weekdays at 2pm
        requiredCapabilities: ["text-generation"]
      },
      {
        id: "seo-optimization",
        name: "SEO Optimization",
        description: "Optimizes existing content for search engines",
        enabled: true,
        schedule: "0 0 * * 6", // Saturday at midnight
        requiredCapabilities: ["text-generation", "semantic-search"]
      },
      {
        id: "freelance-proposals",
        name: "Freelance Proposal Writing",
        description: "Creates tailored proposals for freelance opportunities",
        enabled: false,
        schedule: "30 9 * * 1-5", // Weekdays at 9:30am
        requiredCapabilities: ["text-generation"]
      }
    ]
  },
  {
    id: "customer-relations-agent",
    name: "Customer Relations Agent",
    type: "customer-relations",
    description: "Manages customer communications, support, and follow-ups",
    model: mockModels[0], // Mistral Medium
    enabled: false,
    tasks: [
      {
        id: "email-response",
        name: "Email Response Automation",
        description: "Generates personalized responses to customer emails",
        enabled: true,
        schedule: "*/30 9-17 * * 1-5", // Every 30 min during business hours
        requiredCapabilities: ["text-generation", "sentiment-analysis"]
      },
      {
        id: "support-ticket-management",
        name: "Support Ticket Management",
        description: "Categorizes, prioritizes, and responds to support tickets",
        enabled: true,
        requiredCapabilities: ["text-generation", "sentiment-analysis"]
      },
      {
        id: "lead-nurturing",
        name: "Lead Nurturing",
        description: "Executes lead nurturing email sequences",
        enabled: false,
        schedule: "0 10 * * 2,4", // Tuesday and Thursday at 10am
        requiredCapabilities: ["text-generation"]
      },
      {
        id: "follow-up-automation",
        name: "Follow-up Automation",
        description: "Sends timely follow-up messages to prospects and customers",
        enabled: false,
        schedule: "0 15 * * 1-5", // Weekdays at 3pm
        requiredCapabilities: ["text-generation"]
      },
      {
        id: "communication-templates",
        name: "Client Communication Templates",
        description: "Develops and refines communication templates",
        enabled: true,
        schedule: "0 0 1 * *", // 1st of each month
        requiredCapabilities: ["text-generation"]
      }
    ]
  },
  {
    id: "freelance-management-agent",
    name: "Freelance Management Agent",
    type: "freelance-management",
    description: "Monitors job opportunities, automates submissions, and tracks deliverables",
    model: mockModels[1], // Mistral Large
    enabled: true,
    tasks: [
      {
        id: "job-opportunity-monitoring",
        name: "Job Opportunity Monitoring",
        description: "Monitors platforms for relevant freelance opportunities",
        enabled: true,
        schedule: "0 */4 * * *", // Every 4 hours
        requiredCapabilities: ["text-generation", "semantic-search"]
      },
      {
        id: "proposal-submission",
        name: "Proposal Submission Automation",
        description: "Submits customized proposals for qualifying opportunities",
        enabled: false,
        schedule: "30 9,14 * * 1-5", // Weekdays at 9:30am and 2:30pm
        requiredCapabilities: ["text-generation"]
      },
      {
        id: "deadline-tracking",
        name: "Deadline Tracking",
        description: "Monitors and alerts on project deadlines",
        enabled: true,
        schedule: "0 9 * * *", // Daily at 9am
        requiredCapabilities: ["text-generation"]
      },
      {
        id: "deliverable-management",
        name: "Deliverable Management",
        description: "Tracks and organizes project deliverables",
        enabled: true,
        requiredCapabilities: ["text-generation"]
      },
      {
        id: "feedback-processing",
        name: "Client Feedback Processing",
        description: "Analyzes client feedback and identifies improvement areas",
        enabled: true,
        schedule: "0 17 * * 5", // Friday at 5pm
        requiredCapabilities: ["text-generation", "sentiment-analysis"]
      }
    ]
  },
  {
    id: "analytics-agent",
    name: "Analytics & Reports Agent",
    type: "analytics-reports",
    description: "Tracks KPIs, generates reports, and provides optimization suggestions",
    model: mockModels[1], // Mistral Large
    enabled: true,
    tasks: [
      {
        id: "kpi-monitoring",
        name: "KPI Monitoring",
        description: "Tracks key performance indicators for all revenue channels",
        enabled: true,
        schedule: "0 8 * * *", // Daily at 8am
        requiredCapabilities: ["text-generation", "data-analysis"]
      },
      {
        id: "report-generation",
        name: "Performance Report Generation",
        description: "Creates comprehensive performance reports",
        enabled: true,
        schedule: "0 9 1 * *", // 1st of month at 9am
        requiredCapabilities: ["text-generation", "data-analysis"]
      },
      {
        id: "conversion-tracking",
        name: "Conversion Tracking",
        description: "Monitors and analyzes conversion rates across channels",
        enabled: true,
        schedule: "0 0 * * 1", // Monday at midnight
        requiredCapabilities: ["text-generation", "data-analysis"]
      },
      {
        id: "revenue-attribution",
        name: "Revenue Attribution",
        description: "Attributes revenue to specific channels and activities",
        enabled: true,
        schedule: "0 7 * * 1", // Monday at 7am
        requiredCapabilities: ["text-generation", "data-analysis"]
      },
      {
        id: "optimization-suggestions",
        name: "Optimization Suggestion System",
        description: "Provides data-driven suggestions for performance improvement",
        enabled: true,
        schedule: "0 10 * * 1", // Monday at 10am
        requiredCapabilities: ["text-generation", "data-analysis"]
      }
    ]
  },
  {
    id: "admin-agent",
    name: "Admin Management Agent",
    type: "admin-management",
    description: "Coordinates between agents, distributes tasks, and handles system maintenance",
    model: mockModels[1], // Mistral Large
    enabled: true,
    tasks: [
      {
        id: "agent-coordination",
        name: "Inter-Agent Coordination",
        description: "Coordinates activities between different agent systems",
        enabled: true,
        requiredCapabilities: ["text-generation"]
      },
      {
        id: "task-distribution",
        name: "Task Distribution",
        description: "Assigns and distributes tasks across the agent network",
        enabled: true,
        schedule: "0 7 * * *", // Daily at 7am
        requiredCapabilities: ["text-generation"]
      },
      {
        id: "error-handling",
        name: "Error Handling and Recovery",
        description: "Monitors for errors and initiates recovery procedures",
        enabled: true,
        requiredCapabilities: ["text-generation"]
      },
      {
        id: "system-maintenance",
        name: "System Maintenance",
        description: "Performs routine system maintenance and updates",
        enabled: true,
        schedule: "0 2 * * 0", // Sunday at 2am
        requiredCapabilities: ["text-generation"]
      },
      {
        id: "performance-optimization",
        name: "Performance Optimization",
        description: "Monitors and optimizes system performance",
        enabled: true,
        schedule: "0 3 * * 0", // Sunday at 3am
        requiredCapabilities: ["text-generation", "data-analysis"]
      }
    ]
  }
];
