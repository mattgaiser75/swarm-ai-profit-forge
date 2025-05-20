
import { PlatformComparison } from "@/types";

export const mockPlatformComparison: PlatformComparison[] = [
  {
    feature: "Installation Complexity",
    huginn: {
      supported: true,
      notes: "More complex, requires Ruby on Rails environment"
    },
    n8n: {
      supported: true,
      notes: "Simpler installation via npm or Docker"
    }
  },
  {
    feature: "User Interface",
    huginn: {
      supported: true,
      notes: "Basic but functional UI, less intuitive for beginners"
    },
    n8n: {
      supported: true,
      notes: "Modern, user-friendly UI with visual workflow editor"
    }
  },
  {
    feature: "API Integrations",
    huginn: {
      supported: true,
      notes: "Limited built-in integrations, but extensible with custom agents"
    },
    n8n: {
      supported: true,
      notes: "200+ pre-built integrations with many APIs and services"
    }
  },
  {
    feature: "AI Model Integration",
    huginn: {
      supported: true,
      notes: "Requires custom agent development for each model"
    },
    n8n: {
      supported: true,
      notes: "Has nodes for OpenAI, can be extended for other models"
    }
  },
  {
    feature: "Workflow Complexity",
    huginn: {
      supported: true,
      notes: "Excellent for complex, multi-step workflows with branching logic"
    },
    n8n: {
      supported: true,
      notes: "Good for linear workflows, but can handle complex scenarios"
    }
  },
  {
    feature: "Error Handling",
    huginn: {
      supported: true,
      notes: "Basic error handling with ability to implement custom recovery"
    },
    n8n: {
      supported: true,
      notes: "Built-in error handling with retry mechanisms"
    }
  },
  {
    feature: "Community Support",
    huginn: {
      supported: true,
      notes: "Smaller but passionate community, limited recent development"
    },
    n8n: {
      supported: true,
      notes: "Active development and growing community with official support"
    }
  },
  {
    feature: "Scalability",
    huginn: {
      supported: true,
      notes: "Can be scaled but requires more manual configuration"
    },
    n8n: {
      supported: true,
      notes: "Better built-in support for scaling with queue mode"
    }
  },
  {
    feature: "Hosting Requirements",
    huginn: {
      supported: true,
      notes: "Higher server requirements due to Ruby on Rails"
    },
    n8n: {
      supported: true,
      notes: "Can run on minimal VPS ($5/mo) with Docker"
    }
  },
  {
    feature: "Database Integrations",
    huginn: {
      supported: true,
      notes: "Limited built-in database connectors"
    },
    n8n: {
      supported: true,
      notes: "Extensive database connectors (MongoDB, SQL, etc.)"
    }
  }
];
