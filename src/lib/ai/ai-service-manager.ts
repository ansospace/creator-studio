import type { AIProvider } from "@/types/ai-provider";

import { ChromeAIProvider } from "./providers/chrome-provider";
import { ExternalAIProvider } from "./providers/external-provider";

export class AIServiceManager {
  private providers: AIProvider[] = [];
  private activeProvider: AIProvider | null = null;

  constructor() {
    // Register providers in order of preference
    this.providers = [
      new ChromeAIProvider(),
      new ExternalAIProvider(),
      // Add more providers here as they become available
    ];
  }

  async initialize(): Promise<void> {
    for (const provider of this.providers) {
      if (await provider.isAvailable()) {
        this.activeProvider = provider;
        break;
      }
    }
  }

  getActiveProvider(): AIProvider | null {
    return this.activeProvider;
  }

  async summarize(text: string, config?: object): Promise<string> {
    if (!this.activeProvider) {
      throw new Error("No AI provider available");
    }
    return this.activeProvider.summarize(text, config);
  }

  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!this.activeProvider) {
      throw new Error("No AI provider available");
    }
    return this.activeProvider.translate(text, targetLanguage);
  }

  async generateText(prompt: string, config?: object): Promise<string> {
    if (!this.activeProvider) {
      throw new Error("No AI provider available");
    }
    return this.activeProvider.generateText(prompt, config);
  }
}
