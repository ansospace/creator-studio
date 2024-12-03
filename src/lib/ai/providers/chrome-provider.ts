import type { AIFeatures, AIProvider } from "@/types/ai-provider";

export class ChromeAIProvider implements AIProvider {
  name = "Chrome Built-in AI";

  async isAvailable(): Promise<boolean> {
    if (typeof window === "undefined") return false;

    try {
      const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
      if (!isChrome || !window.ai?.summarizer) return false;

      const capabilities = await window.ai.summarizer.capabilities();
      return capabilities.available !== "no";
    } catch {
      return false;
    }
  }

  getCapabilities(): AIFeatures {
    return {
      summarization: !!window.ai?.summarizer,
      translation: !!window.ai?.translation,
      textGeneration: !!window.ai?.gemini,
    };
  }

  async summarize(text: string, config?: AISummarizerConfig): Promise<string> {
    try {
      const capabilities = await window.ai?.summarizer?.capabilities();
      if (capabilities?.available === "no") {
        throw new Error("Summarizer not available");
      }

      const summarizer = await window.ai?.summarizer?.create(config);
      if (!summarizer) {
        throw new Error("Summarizer not available in Chrome AI");
      }

      // Wait for the model to be ready
      await summarizer.ready;
      return await summarizer.summarize(text, config);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Summarization failed: ${error.message}`);
      }
      throw new Error("Summarization failed with unknown error");
    }
  }

  async translate(text: string, targetLanguage: string): Promise<string> {
    try {
      const translator = await window.ai?.translation?.createTranslator({ targetLanguage });
      if (!translator) {
        throw new Error("Translator not available in Chrome AI");
      }
      return await translator.translate(text);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Translation failed: ${error.message}`);
      }
      throw new Error("Translation failed with unknown error");
    }
  }

  async generateText(prompt: string, config?: unknown): Promise<string> {
    try {
      const model = await window.ai?.gemini?.create();
      if (!model) {
        throw new Error("Gemini model not available in Chrome AI");
      }
      return await model.generateText(prompt, config);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Text generation failed: ${error.message}`);
      }
      throw new Error("Text generation failed with unknown error");
    }
  }
}
