
import { DataSource } from "@/types";

export const mockDataSources: DataSource[] = [
  {
    id: "mongodb-market-research",
    name: "Market Research Database",
    type: "mongodb",
    description: "Stores market research data, competitor analysis, and trend information",
    connected: true
  },
  {
    id: "vector-content-knowledge",
    name: "Content Knowledge Base",
    type: "vector",
    description: "Vector database for semantic searching of content and knowledge",
    connected: true
  },
  {
    id: "sqlite-operations",
    name: "Operational Database",
    type: "sqlite",
    description: "Local database for operational tasks, schedules, and transactions",
    connected: true
  },
  {
    id: "mongodb-analytics",
    name: "Analytics Database",
    type: "mongodb",
    description: "Stores analytics data, performance metrics, and historical trends",
    connected: false
  },
  {
    id: "vector-semantic-search",
    name: "Semantic Search Database",
    type: "vector",
    description: "Vector database for advanced semantic searching across all content",
    connected: false
  }
];
