"use client";

import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";

import { Button, Card, Select, SelectContent, SelectItem, SelectTrigger, Textarea, Typography } from "@/components/ui";
import { toast, useAI } from "@/hooks";

const AISummarizerTypes: Record<string, AISummarizerType> = {
  KeyPoints: "key-points",
  TLDR: "tl;dr",
  Teaser: "teaser",
  Headline: "headline",
} as const;

const AISummarizerLengths: Record<string, AISummarizerLength> = {
  Short: "short",
  Medium: "medium",
  Long: "long",
} as const;

export const AIFeatures = () => {
  const { isAvailable, provider } = useAI();

  const [summary, setSummary] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [config, setConfig] = useState<AISummarizerConfig>({
    type: "teaser",
    format: "markdown",
    length: "medium",
    language: "en",
    sharedContext: "This is a scientific article",
  });

  const { mutate: summarize, isPending: isLoading } = useMutation({
    mutationFn: async (text: string) => {
      if (!provider) throw new Error("No AI provider available");
      const cleanText = text.replace(/<[^>]*>/g, "");

      return provider.summarize(cleanText, config);
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

  return (
    <div className="flex flex-col gap-6 p-4">
      <Typography variant="h2">Summarize Text</Typography>
      <div className="flex flex-col gap-4">
        <Textarea
          placeholder="Enter text to summarize..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full max-w-2xl"
        />
        <div className="flex gap-4">
          <Select onValueChange={(value) => setConfig({ ...config, type: value as AISummarizerType })}>
            <SelectTrigger className="w-full max-w-xs">
              <span>Type: {config.type}</span>
            </SelectTrigger>
            <SelectContent>
              {Object.values(AISummarizerTypes).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setConfig({ ...config, length: value as AISummarizerLength })}>
            <SelectTrigger className="w-full max-w-xs">
              <span>Length: {config.length}</span>
            </SelectTrigger>
            <SelectContent>
              {Object.values(AISummarizerLengths).map((length) => (
                <SelectItem key={length} value={length}>
                  {length}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSummarize} disabled={!isAvailable || isLoading || !text} className="w-fit">
          {isLoading ? "Summarizing..." : "Summarize Text"}
        </Button>
      </div>

      {summary && (
        <Card className="max-w-2xl p-6">
          <h3 className="mb-4 text-lg font-semibold">Summary</h3>
          <div className="prose prose-slate dark:prose-invert">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        </Card>
      )}
    </div>
  );
};
