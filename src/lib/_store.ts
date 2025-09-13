import { Plan } from "@/types";



export const PLANS: Plan['items'] = [
    {
        id: 'plan-1',
        title: 'Frontend Foundations',
        slug: 'frontend-foundations',
        description: 'Learn the fundamentals of HTML, CSS & JS',
        durationWeeks: 6,
        price: 99,
        tags: ['frontend', 'beginner'],
        active: true,
        modules: [
            { id: 'm-1', title: 'HTML Basics', lessons: ['Elements', 'Semantics'] },
            { id: 'm-2', title: 'CSS Basics', lessons: ['Layouts', 'Flexbox'] },
        ],
    },
];


// single "my subscription" for demo app
export const MY_SUBSCRIPTION: { planId: string | null; progress: Record<string, string[]> } = {
    planId: null,
    progress: {},
};


export function findPlanBySlug(slug: string) {
    return PLANS.find((p) => p.slug === slug);
}
