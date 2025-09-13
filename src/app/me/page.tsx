"use client";

import ProgressList from "@/components/ProgressList";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMe } from "@/lib/hooks";
import { Module } from "@/types";
import Link from "next/link";

export default function MePage() {
  const { data, isLoading } = useMe();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!data?.plan) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-gray-600">No active subscription</p>
        <Button asChild>
          <Link href="/plans">Browse Plans</Link>
        </Button>
      </div>
    );
  }

  const totalLessons = data.plan.modules.reduce(
    (acc: number, m: Module) => acc + m.lessons.length,
    0
  );
  const progressValues: string[][] = Object.values(data.progress || {}) as string[][];
  const completedLessons = progressValues.reduce(
    (acc, lessons) => acc + lessons.length,
    0
  );

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">My Subscription: {data.plan.title}</h1>
      <p className="text-sm text-gray-600">
        Progress: {completedLessons}/{totalLessons} lessons completed
      </p>
      <ProgressList plan={data.plan} progress={data.progress} />
    </div>
  );
}
