import { NextResponse } from "next/server";
import { MY_SUBSCRIPTION, PLANS } from "../_store";

export async function GET() {
  if (!MY_SUBSCRIPTION.planId) {
    return NextResponse.json({});
  }

  const plan = PLANS.find((p) => p.id === MY_SUBSCRIPTION.planId);
  if (!plan) {
    return NextResponse.json({});
  }

  return NextResponse.json({
    plan,
    progress: MY_SUBSCRIPTION.progress,
  });
}
