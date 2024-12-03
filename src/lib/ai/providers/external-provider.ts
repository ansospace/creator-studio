import { ENV_CONFIG } from "@/constants";
import type { AIFeatures, AIProvider } from "@/types/ai-provider";

export class ExternalAIProvider implements AIProvider {
  name = "External AI API";
  private apiUrl: string;

  constructor() {
    this.apiUrl = ENV_CONFIG.SERVICES.AI_API_URL;
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }

  getCapabilities(): AIFeatures {
    return {
      summarization: true,
      translation: true,
      textGeneration: true,
    };
  }

  async summarize(text: string, config?: object): Promise<string> {
    const response = await fetch(`${this.apiUrl}/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, ...config }),
    });
    const data = await response.json();
    return data.summary;
  }

  async translate(text: string, targetLanguage: string): Promise<string> {
    const response = await fetch(`${this.apiUrl}/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, targetLanguage }),
    });
    const data = await response.json();
    return data.translation;
  }

  async generateText(prompt: string, config?: object): Promise<string> {
    const response = await fetch(`${this.apiUrl}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, ...config }),
    });
    const data = await response.json();
    return data.text;
  }
}
