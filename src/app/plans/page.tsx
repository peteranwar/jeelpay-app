import { Suspense } from "react";
import PlansPageClient from "./PlansPageClient";

export default function PlansPage() {
  return (
    <Suspense fallback={<p className="text-center my-6">Loading plans...</p>}>
      <PlansPageClient />
    </Suspense>
  );
}
