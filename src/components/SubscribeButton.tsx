"use client";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useSubscribe } from "../lib/hooks";

export default function SubscribeButton({ planId }: { planId: string }) {
  const { mutate, isPending } = useSubscribe();

  function handleSubscribe() {
    mutate(planId, {
      onSuccess: () => toast.success("Subscribed successfully!"),
      onError: () => toast.error("Subscription failed"),
    })
  }
  return (
    <Button
      disabled={isPending}
      onClick={handleSubscribe}
    >
      {isPending ? "Subscribing..." : "Subscribe"}
    </Button>
  );
}
