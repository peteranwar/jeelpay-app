"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { planSchema } from "@/lib/schema";

type AdminFormProps = {
  onSubmit: (values: PlanFormValues, reset: () => void) => void;
};

type PlanFormValues = z.infer<typeof planSchema>;

export default function AdminForm({ onSubmit }: AdminFormProps) {
  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      durationWeeks: 1,
      price: undefined,
      tags: [],
      modules: [{ id: "m1", title: "", lessons: [""] }],
    },
  });

  // field arrays

  // Modules
  const { fields: moduleFields, append: appendModule, remove: removeModule } =
    useFieldArray<PlanFormValues, "modules", "id">({
      control: form.control,
      name: "modules",
    });

  // Tags
  const { fields: tagFields, append: appendTag, remove: removeTag } =
    useFieldArray<PlanFormValues, "tags">({
      control: form.control,
      name: "tags",
    });

  function handleSubmit(values: PlanFormValues) {
    onSubmit(values, () => form.reset());
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}

        className="space-y-6 max-w-2xl mx-auto"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Plan title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Slug */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="plan-slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Write a short description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration */}
        <FormField
          control={form.control}
          name="durationWeeks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (weeks)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="4"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(e.target.value ? Number(e.target.value) : "")
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Optional price"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(e.target.value ? Number(e.target.value) : "")
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags */}
        <div className="space-y-2">
          <FormLabel>Tags</FormLabel>
          <div className="space-y-2">
            {tagFields.map((tag, index) => (
              <div key={tag.id} className="flex gap-2">
                <FormField
                  control={form.control}
                  name={`tags.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="Tag" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeTag(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() => appendTag("")}
            >
              + Add Tag
            </Button>
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-2">
          <FormLabel>Modules</FormLabel>
          <div className="space-y-4">
            {moduleFields.map((module, mIndex) => (
              <div
                key={module.id}
                className="border rounded-lg p-4 space-y-2 bg-muted/30"
              >
                <FormField
                  control={form.control}
                  name={`modules.${mIndex}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Module Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Module title" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Lessons inside module */}
                <FormLabel>Lessons</FormLabel>
                <LessonsFields
                  nestIndex={mIndex}
                  {...{ control: form.control }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeModule(mIndex)}
                >
                  Remove Module
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                appendModule({ id: `m${Date.now()}`, title: "", lessons: [""] })
              }
            >
              + Add Module
            </Button>
          </div>
        </div>

        {/* Submit */}
        <Button type="submit">Create Plan</Button>
      </form>
    </Form>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LessonsFields({ nestIndex, control }: { nestIndex: number; control: any }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `modules.${nestIndex}.lessons`,
  });

  return (
    <div className="space-y-2">
      {fields.map((lesson, lIndex) => (
        <div key={lesson.id} className="flex gap-2">
          <FormField
            control={control}
            name={`modules.${nestIndex}.lessons.${lIndex}`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Lesson title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="destructive"
            onClick={() => remove(lIndex)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button type="button" variant="secondary" onClick={() => append("")}>
        + Add Lesson
      </Button>
    </div>
  );
}
