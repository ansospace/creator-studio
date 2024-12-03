"use client";

import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { toast, useAI } from "@/hooks";

import { Card } from "./ui/card";
import { Input } from "./ui/input";

export const AIFeatures = () => {
  const { isAvailable, provider } = useAI();
  const [summary, setSummary] = useState<string | null>(null);
  const [text, setText] = useState<string>("");

  const { mutate: summarize, isPending: isLoading } = useMutation({
    mutationFn: async (text: string) => {
      if (!provider) throw new Error("No AI provider available");
      const cleanText = text.replace(/<[^>]*>/g, "");
      return provider.summarize(cleanText);
    },
    onSuccess: (data) => {
      setSummary(data);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error("Summarization failed:", error);
      let description = "An unknown error occurred";

      if (error instanceof Error) {
        description = error.message;

        if (error.message.includes("only supports English")) {
          description =
            "Currently, summarization only works with English text. Please ensure your input is in English.";
        } else if (error.message.includes("not available")) {
          description = "Summarization is not available on your device. Please try again later.";
        }
      }

      toast({
        title: "Summarization Failed",
        description,
        variant: "destructive",
      });
    },
  });

  const handleSummarize = () => {
    if (!text.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to summarize",
        variant: "destructive",
      });
      return;
    }

    summarize(text);
  };

  const formatBulletPoints = (text: string) => {
    return text
      .split("*")
      .filter(Boolean)
      .map((point) => point.trim());
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Enter text to summarize..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full max-w-2xl"
        />
        <Button onClick={handleSummarize} disabled={!isAvailable || isLoading || !text} className="w-fit">
          {isLoading ? "Summarizing..." : "Summarize Text"}
        </Button>
      </div>

      {summary && (
        <Card className="max-w-2xl p-6">
          <h3 className="mb-4 text-lg font-semibold">Summary</h3>
          <ul className="space-y-2">
            {formatBulletPoints(summary).map((point, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-primary">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};
