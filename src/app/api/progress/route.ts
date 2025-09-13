import { NextResponse } from "next/server";
import { MY_SUBSCRIPTION } from "../_store";

export async function PATCH(req: Request) {
  try {
    const { moduleId, lesson, completed } = await req.json();

    if (!MY_SUBSCRIPTION.planId) {
      return new Response("No subscription", { status: 400 });
    }

    if (!MY_SUBSCRIPTION.progress[moduleId]) {
      MY_SUBSCRIPTION.progress[moduleId] = [];
    }

    const lessons = MY_SUBSCRIPTION.progress[moduleId];
    if (completed) {
      if (!lessons.includes(lesson)) lessons.push(lesson);
    } else {
      MY_SUBSCRIPTION.progress[moduleId] = lessons.filter((l) => l !== lesson);
    }

    return NextResponse.json({ success: true, progress: MY_SUBSCRIPTION.progress });
  } catch {
    return new Response("Invalid request", { status: 400 });
  }
}
