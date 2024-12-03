export type AIFeatures = {
  summarization: boolean;
  translation: boolean;
  textGeneration: boolean;
};

export interface AIProvider {
  name: string;
  isAvailable(): Promise<boolean>;
  getCapabilities(): AIFeatures;
  summarize(text: string, config?: unknown): Promise<string>;
  translate(text: string, targetLanguage: string): Promise<string>;
  generateText(prompt: string, config?: unknown): Promise<string>;
}
