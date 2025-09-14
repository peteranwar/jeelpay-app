import { findPlanBySlug, PLANS } from "@/lib/_store";
import { NextRequest, NextResponse } from "next/server";

// GET a plan by slug
export async function GET(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params; 
  const plan = findPlanBySlug(slug);

  if (!plan) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return NextResponse.json(plan);
}

// DELETE a plan by slug
export async function DELETE(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params; 

  const adminToken = req.headers.get("x-admin-token");
  if (adminToken !== process.env.NEXT_PUBLIC_ADMIN_TOKEN) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const index = PLANS.findIndex((p) => p.id === slug || p.slug === slug);
  if (index === -1) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  PLANS.splice(index, 1);

  return NextResponse.json({ success: true });
}
