import { z } from "zod";

export const planSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  description: z.string().min(10),
  durationWeeks: z.number().int().positive(),
  price: z.number().nullable().optional(),
  tags: z.array(z.string().min(1)).max(8),
  modules: z
    .array(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        lessons: z.array(z.string().min(1)).min(1),
      })
    )
    .min(1),
});

export type PlanInput = z.infer<typeof planSchema>;
