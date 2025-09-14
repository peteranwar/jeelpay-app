"use client";

import { usePlans } from "@/lib/hooks";
import { useRouter, useSearchParams } from "next/navigation";

import PlanCard from "@/components/PlanCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import { Plan } from "@/types";

export default function PlansPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const tag = searchParams.get("tag") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const debouncedQ = useDebounce(q, 300);

  const { data, isLoading, error } = usePlans(debouncedQ, tag, page, 2);

  function updateQuery(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/plans?${params.toString()}`);
  }

  const allTags =
    data?.items
      ?.flatMap((plan: Plan["items"][0]) => plan.tags || [])
      .filter((t: string, i: number, arr: string[]) => arr.indexOf(t) === i) || [];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Input
          placeholder="Search plans..."
          value={q}
          onChange={(e) => updateQuery("q", e.target.value)}
          type="search"
          className="w-full sm:w-64"
        />

        <div className="flex flex-wrap gap-2">
          {allTags.map((t: string) => (
            <Badge
              key={t}
              variant={t === tag ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => updateQuery("tag", t === tag ? "" : t)}
            >
              {t}
            </Badge>
          ))}
        </div>
      </div>

      {/* Plans grid */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500 text-4xl text-center my-6">
          ⚠️ Error loading plans
        </p>
      ) : !data?.items?.length ? (
        <p className="text-gray-500 text-4xl text-center my-6">No plans found</p>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.items.map((plan: Plan["items"][0]) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              className="cursor-pointer"
              variant="outline"
              disabled={page <= 1}
              onClick={() => updateQuery("page", String(page - 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={page * data.limit >= data.total}
              onClick={() => updateQuery("page", String(page + 1))}
              className="cursor-pointer"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
