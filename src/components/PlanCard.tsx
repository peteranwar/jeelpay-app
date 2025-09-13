"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plan } from "@/types";
import Link from "next/link";
import { Badge } from "./ui/badge";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PlanCard({ plan }: { plan: Plan['items'][0] }) {
  return (
    <Link href={`/plans/${plan.slug}`}>
      <Card className="cursor-pointer hover:shadow-lg transition min-h-[200px]">
        <CardHeader>
          <CardTitle>{plan.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{plan.description}</p>
          <p className="mt-2 text-sm">Duration: {plan.durationWeeks} weeks</p>
          {plan.price && <p className="text-sm">Price: ${plan.price}</p>}
          <div className="flex flex-wrap gap-2 mt-2">
            {plan.tags.map((tag: string) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
