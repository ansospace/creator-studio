// Define the summarizer instance type
interface ChromeSummarizer {
  ready: Promise<void>;
  summarize(text: string, config?: AISummarizerConfig): Promise<string>;
  summarizeStreaming(text: string, config?: AISummarizerConfig): ReadableStream<string>;
}

type AISummarizerType = "key-points" | "tl;dr" | "teaser" | "headline";
type AISummarizerFormat = "markdown" | "plain-text";
type AISummarizerLength = "short" | "medium" | "long";

interface AISummarizerConfig {
  type?: AISummarizerType;
  format?: AISummarizerFormat;
  length?: AISummarizerLength;
}

interface Window {
  ai?: {
    summarizer?: {
      capabilities(): Promise<{
        available: "no" | "readily" | "after-download";
      }>;
      create(config?: AISummarizerConfig): Promise<ChromeSummarizer>;
    };
    translation?: {
      createTranslator(config: { targetLanguage: string }): Promise<{
        translate(text: string): Promise<string>;
      }>;
    };
    gemini?: {
      create(): Promise<{
        generateText(prompt: string, config?: unknown): Promise<string>;
      }>;
    };
  };
}
