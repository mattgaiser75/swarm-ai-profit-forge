
import { AIModel } from "@/types";

export const mockModels: AIModel[] = [
  {
    id: "mistral-medium",
    name: "Mistral Medium",
    provider: "mistral",
    capabilities: ["text-generation", "summarization", "translation", "sentiment-analysis", "semantic-search"],
    contextWindow: 32000,
    costPer1KTokens: 0.003
  },
  {
    id: "mistral-large",
    name: "Mistral Large",
    provider: "mistral",
    capabilities: ["text-generation", "summarization", "translation", "sentiment-analysis", "semantic-search", "code-generation", "data-analysis"],
    contextWindow: 32000,
    costPer1KTokens: 0.008
  },
  {
    id: "gemini-pro",
    name: "Google Gemini Pro",
    provider: "google",
    capabilities: ["text-generation", "summarization", "translation", "sentiment-analysis", "semantic-search", "code-generation"],
    contextWindow: 32000,
    costPer1KTokens: 0.0025
  },
  {
    id: "gemini-pro-vision",
    name: "Google Gemini Pro Vision",
    provider: "google",
    capabilities: ["text-generation", "image-understanding", "summarization", "translation"],
    contextWindow: 16000,
    costPer1KTokens: 0.0035
  },
  {
    id: "llama-70b",
    name: "Llama 3 70B",
    provider: "llama",
    capabilities: ["text-generation", "summarization", "translation", "sentiment-analysis"],
    contextWindow: 8000,
    costPer1KTokens: 0.0015
  },
  {
    id: "falcon-180b",
    name: "Falcon 180B",
    provider: "falcon",
    capabilities: ["text-generation", "summarization", "translation"],
    contextWindow: 8000,
    costPer1KTokens: 0.002
  },
  {
    id: "gpt-4o",
    name: "GPT-4o (Fallback)",
    provider: "openai",
    capabilities: ["text-generation", "summarization", "translation", "sentiment-analysis", "semantic-search", "code-generation", "data-analysis", "image-understanding"],
    contextWindow: 128000,
    costPer1KTokens: 0.01
  }
];
