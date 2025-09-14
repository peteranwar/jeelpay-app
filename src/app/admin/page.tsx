"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

import { LoaderOverlay } from "@/components/LoaderOverlay";
import { Plan } from "@/types";
import AdminForm from "../../components/AdminForm";
import AdminTable from "../../components/AdminTable";
import { usePlans } from "../../lib/hooks";

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);


  const { data, refetch } = usePlans();

  async function handleCreate(
    values: Omit<Plan['items'][0], "id">, 
    reset: () => void
  ) {
    try {
      setLoading(true);

      const plan: Plan['items'][0] = {
        ...(values as unknown as Plan['items'][0]),
        id: crypto.randomUUID(),
      };

      await axios.post("/api/plans", plan, {
        headers: { "x-admin-token": process.env.NEXT_PUBLIC_ADMIN_TOKEN! },
      });
      toast.success("Plan created");
      refetch();
      reset();
    } catch {
      toast.error("Failed to create plan");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {

    try {
      setLoading(true);
      await axios.delete(`/api/plans/${id}`, {
        headers: { "x-admin-token": process.env.NEXT_PUBLIC_ADMIN_TOKEN! },
      });
      toast.success("Plan deleted");
      refetch();
    } catch {
      toast.error("Failed to delete plan");
    } finally {
      setLoading(false);
    }
  }

  // Check if user is authorized
  if (!authorized) {
    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <h1 className="text-xl font-bold">Admin Access</h1>
        <input
          type="password"
          placeholder="Enter admin token"
          className="border rounded p-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (e.currentTarget.value === process.env.NEXT_PUBLIC_ADMIN_TOKEN) {
                setAuthorized(true);
              } else {
                toast.error("Invalid token");
              }
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">Admin</h1>
      <LoaderOverlay show={loading} />

      <AdminForm onSubmit={handleCreate} />
      {data && <AdminTable plans={data} onDelete={handleDelete} />}
    </div>
  );
}
