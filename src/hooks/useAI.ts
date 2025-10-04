"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { AIServiceManager } from "@/lib/ai/ai-service-manager";
import type { AIProvider } from "@/types/ai-provider";

export const useAI = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [provider, setProvider] = useState<AIProvider | null>(null);

  useEffect(() => {
    const initializeAI = async () => {
      const manager = new AIServiceManager();
      await manager.initialize();

      const activeProvider = manager.getActiveProvider();

      if (!activeProvider) {
        toast.message("AI Services Unavailable", {
          description: "No AI service providers are currently available.",
        });
        setIsAvailable(false);
        return;
      }

      toast.info(`AI Service Connected Using ${activeProvider.name}`);

      setIsAvailable(true);
      setProvider(activeProvider);
    };

    initializeAI();
  }, []);

  return { isAvailable, provider };
};
