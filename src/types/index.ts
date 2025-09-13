export type Lesson = string;

export type Module = { id: string; title: string; lessons: Lesson[] };

export type PlanItem = {
    id: string;
    title: string;
    slug: string;
    description: string;
    durationWeeks: number;
    price?: number | null;
    tags: string[];
    modules: Module[];
    active?: boolean;
}

export type Plan = {
    items: PlanItem[];
    total: number;
    page: number;
    limit: number;
};