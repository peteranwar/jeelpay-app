// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { MY_SUBSCRIPTION, PLANS } from "../_store";

export async function POST(req: Request) {
  try {
    const { planId } = await req.json();

    const plan = PLANS.find((p) => p.id === planId && (p.active ?? true));
    if (!plan) {
      return new Response("Plan not found", { status: 404 });
    }

    // overwrite existing subscription
    MY_SUBSCRIPTION.planId = planId;
    MY_SUBSCRIPTION.progress = {};

    return NextResponse.json({ success: true, planId });
  } catch (err) {
    return new Response("Invalid request", { status: 400 });
  }
}
