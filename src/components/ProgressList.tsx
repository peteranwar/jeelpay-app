/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";

import { useToggleProgress } from "../lib/hooks";
import { Checkbox } from "./ui/checkbox";

export default function ProgressList({ plan, progress }: { plan: any; progress: any }) {
    const toggle = useToggleProgress();

    return (
        <div className="space-y-4">
            {plan.modules.map((m: any) => (
                <div key={m.id}>
                    <h3 className="font-semibold">{m.title}</h3>
                    <ul className="ml-4 space-y-1">
                        {m.lessons.map((lesson: string) => {
                            const completed = progress[m.id]?.includes(lesson) ?? false;
                            return (
                                <li key={lesson} className="flex items-center gap-2">
                                    <Checkbox
                                        checked={completed}
                                        onCheckedChange={(checked) =>
                                            toggle.mutate(
                                                { moduleId: m.id, lesson, completed: Boolean(checked) },
                                                {
                                                    onError: () => toast.error("Failed to update progress"),
                                                }
                                            )
                                        }
                                    />
                                    <span>{lesson}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
}
