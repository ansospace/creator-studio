"use client";

import { useEffect, useState } from "react";

import { useToast } from "@/hooks/useToast";
import { AIServiceManager } from "@/lib/ai/ai-service-manager";
import type { AIProvider } from "@/types/ai-provider";

export const useAI = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [provider, setProvider] = useState<AIProvider | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initializeAI = async () => {
      const manager = new AIServiceManager();
      await manager.initialize();

      const activeProvider = manager.getActiveProvider();

      if (!activeProvider) {
        toast({
          title: "AI Services Unavailable",
          description: "No AI service providers are currently available.",
          variant: "destructive",
        });
        setIsAvailable(false);
        return;
      }

      toast({
        title: "AI Service Connected",
        description: `Using ${activeProvider.name}`,
      });

      setIsAvailable(true);
      setProvider(activeProvider);
    };

    initializeAI();
  }, [toast]);

  return { isAvailable, provider };
};
