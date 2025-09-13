/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Fetch all plans
export function usePlans(q?: string, tag?: string, page: number = 1, limit: number = 6) {
  return useQuery({
    queryKey: ["plans", q, tag, page, limit],
    queryFn: async () => {
      const res = await axios.get("/api/plans", { params: { q, tag, page, limit } });
      return res.data;
    },
  });
}

// Fetch single plan
export function usePlan(slug: string) {
  return useQuery({
    queryKey: ["plans", slug],
    queryFn: async () => {
      const res = await axios.get(`/api/plans/${slug}`);
      return res.data;
    },
  });
}


// Subscribe to a plan
export function useSubscribe() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (planId: string) => {
      const res = await axios.post("/api/subscribe", { planId });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

// My subscription
export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axios.get("/api/me");
      return res.data;
    },
  });
}

// Toggle lesson progress
export function useToggleProgress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      moduleId,
      lesson,
      completed,
    }: {
      moduleId: string;
      lesson: string;
      completed: boolean;
    }) => {
      const res = await axios.patch("/api/progress", {
        moduleId,
        lesson,
        completed,
      });
      return res.data;
    },
    onMutate: async (vars) => {
      // optimistic update (optional)
      await qc.cancelQueries({ queryKey: ["me"] });
      const prev = qc.getQueryData(["me"]);
      qc.setQueryData(["me"], (old: any) => {
        if (!old?.progress) return old;
        const progress = { ...old.progress };
        if (vars.completed) {
          progress[vars.moduleId] = [...(progress[vars.moduleId] || []), vars.lesson];
        } else {
          progress[vars.moduleId] =
            (progress[vars.moduleId] || []).filter((l: string) => l !== vars.lesson);
        }
        return { ...old, progress };
      });
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["me"], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}


// FOR ADMIN ONLY
// Create new plan
export function useCreatePlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post("/api/plans", data, {
        headers: {
          "x-admin-token": process.env.NEXT_PUBLIC_ADMIN_TOKEN || "",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["plans"] });
    },
  });
}
