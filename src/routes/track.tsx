import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track your order — Radhe Radhe Cafe" },
      {
        name: "description",
        content: "Enter your Radhe Radhe Cafe order ID to follow your food from kitchen to door.",
      },
      { property: "og:title", content: "Track your order — Radhe Radhe Cafe" },
      { property: "og:description", content: "Follow your food from kitchen to door." },
    ],
  }),
  component: TrackPage,
});

function TrackPage() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  return (
    <PublicLayout>
      <div className="mx-auto max-w-xl px-4 py-20">
        <div className="glass rounded-3xl p-8">
          <h1 className="text-3xl">Track your order</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the order ID from your confirmation, for example ORD1024.
          </p>
          <form
            className="mt-6 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              const clean = code.trim().toUpperCase();
              if (clean.length < 3) return;
              navigate({ to: "/order/$code", params: { code: clean } });
            }}
          >
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="ORD1024"
              maxLength={16}
              className="h-12 rounded-full"
            />
            <Button type="submit" size="lg" className="rounded-full">
              Track
            </Button>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
}
