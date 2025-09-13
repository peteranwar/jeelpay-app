# Jeelpay App

A Next.js 15+ (App Router) app with shadcn/ui, React Query, and an in-memory store.  
Includes user subscriptions, progress tracking, and a mini admin panel.

---

## 🚀 Features
- Browse plans with search, filter by tag, and pagination
- Plan details with modules + lessons
- Subscribe to plans (with confirmation dialog + toast)
- My Subscription page (progress per lesson with optimistic updates)
- Admin Panel
  - Create plans (with tags, modules, lessons)
  - Edit / delete plans
  - Activate / deactivate plans
  - Guarded with `ADMIN_TOKEN`
- API routes (`/app/api/*`) using Next.js Route Handlers
- Shared in-memory store (`lib/_store.ts`)

---


## 🛠️ Tech Stack
- Next.js 15 App Router
- TypeScript
- TailwindCSS + [shadcn/ui](https://ui.shadcn.com)
- React Query
- Sonner (toasts)
- Lucide icons



## ⚙️ Setup

### 1. Clone the repo
```bash
git clone https://github.com/peteranwar/jeelpay-app.git
cd jeelpay-app



Install dependencies
npm install

3. Add environment variables

Create a .env.local file:

NEXT_PUBLIC_ADMIN_TOKEN=1234567890


4. Run the app
npm run dev


App runs at http://localhost:3000

🔑 Admin Access

To access the admin panel (/admin), provide the token when prompted.
All API requests include the x-admin-token header.



📂 Project Structure
app/
 ├── api/
 │    ├── plans/
 │    │    ├── route.ts
 │    │    └── [slug]/route.ts
 │    └── me/route.ts
 │    └── progress/route.ts
 │    └── subscribe/route.ts

 ├── plans/
 │    ├── page.tsx
 │    └── [slug]/page.tsx
 ├── me/page.tsx
 └── admin/page.tsx
components/
 ├── PlanCard.tsx
 ├── AdminForm.tsx
 ├── AdminTable.tsx
 ├── ProgressList.tsx
 └── LoaderOverlay.tsx
hooks/
 ├── use-debounce.ts
 
lib/
 ├── hooks.ts
 ├── schema.ts
 ├── utils.ts
 └── _store.ts