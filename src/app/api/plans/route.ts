import { NextResponse } from 'next/server';
import { PLANS } from '../_store';


export async function GET(req: Request) {
    const url = new URL(req.url);
    const q = url.searchParams.get("q") || "";
    const tag = url.searchParams.get("tag") || "";
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "6", 10);

    let list = PLANS.filter((p) => p.active ?? true);

    if (q) list = list.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()));
    if (tag) list = list.filter((p) => p.tags.includes(tag));

    // pagination
    const total = list.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = list.slice(start, end);

    return NextResponse.json({ items, total, page, limit });
}

// POST: create new plan
export async function POST(req: Request) {
    try {
        const token = req.headers.get("x-admin-token");
        if (token !== process.env.NEXT_PUBLIC_ADMIN_TOKEN) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const body = await req.json();

        const newPlan = {
            id: String(Date.now()),
            ...body,
            active: true,
        };

        PLANS.push(newPlan);

        return NextResponse.json(newPlan, { status: 201 });
    } catch (e) {
        console.error("Error creating plan", e);
        return NextResponse.json({ error: "Failed to create plan" }, { status: 500 });
    }
}