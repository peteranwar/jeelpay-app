"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useMe, usePlan } from "@/lib/hooks";
import { Module } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PlanDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: plan, isLoading } = usePlan(slug);
  const { data: me } = useMe();

  // Subscribe mutation
  const subscribe = useMutation({
    mutationFn: async (planId: string) => {
      await axios.post("/api/subscribe", { planId });
    },
    onSuccess: () => {
      toast.success("Subscribed successfully!");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: () => toast.error("Subscription failed"),
  });

  if (isLoading) return <Skeleton className="h-40 w-full" />;
  if (!plan) return <p>Plan not found</p>;

  const alreadySubscribed = me?.plan?.id === plan.id;

  return (
    <div className="space-y-8">
      {/* Overview */}
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h1 className="text-2xl font-bold">{plan.title}</h1>
          <p>{plan.description}</p>
          <div className="flex flex-wrap gap-2">
            {plan.tags.map((t: string) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Duration: {plan.durationWeeks} weeks
          </p>
          {plan.price && <p className="font-semibold">${plan.price}</p>}
        </CardContent>
      </Card>

      {/* Modules */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Modules</h2>
        <Accordion type="single" collapsible className="w-full">
          {plan.modules.map((m: Module) => (
            <AccordionItem key={m.id} value={m.id}>
              <AccordionTrigger>{m.title}</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc ml-6">
                  {m.lessons.map((lesson: string) => (
                    <li key={lesson}>{lesson}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* FAQ (static content is fine) */}
      <div>
        <h2 className="text-xl font-semibold mb-2">FAQ</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="faq1">
            <AccordionTrigger>How do I track progress?</AccordionTrigger>
            <AccordionContent>
              Your progress is saved automatically. Check the  My Subscription page.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq2">
            <AccordionTrigger>Can I cancel?</AccordionTrigger>
            <AccordionContent>
              Yes, you can cancel anytime from your account settings.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Subscribe / Continue */}
      <div>
        {alreadySubscribed ? (
          <Button onClick={() => router.push("/me")}>Continue Plan</Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Subscribe</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Subscription</DialogTitle>
                <DialogDescription>
                  Are you sure you want to subscribe to <b>{plan.title}</b>?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>

                <Button onClick={() => subscribe.mutate(plan.id)} disabled={subscribe.isPending}>
                  {subscribe.isPending ? "Subscribing..." : "Confirm"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

    </div>
  );
}
