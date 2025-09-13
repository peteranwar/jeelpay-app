import { NextResponse } from 'next/server';
import { findPlanBySlug, PLANS } from '../../_store';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: Request, { params }: any) {
    const { slug } = params;
    const plan = findPlanBySlug(slug);
    if (!plan) return new Response('Not Found', { status: 404 });
    return NextResponse.json(plan);
}

export async function DELETE(
    req: Request,
    { params }: { params: { slug: string } }
  ) {
    const adminToken = req.headers.get("x-admin-token");
    if (adminToken !== process.env.NEXT_PUBLIC_ADMIN_TOKEN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  
    const { slug } = params;
  
    const index = PLANS.findIndex((p) => p.id === slug);

    console.log('xxxxx index',index, slug,PLANS);
    if (index === -1) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }
  
    PLANS.splice(index, 1);
  
    return NextResponse.json({ success: true });
  }