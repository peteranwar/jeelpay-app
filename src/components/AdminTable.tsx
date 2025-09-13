"use client";

import { Plan } from "@/types";
import { Button } from "./ui/button";


export default function AdminTable({ plans, onDelete }: { plans: Plan; onDelete: (id: string) => void }) {
  return (
    <div className="mt-10 mb-8">
      <h5 className="text-2xl md:text-3xl font-bold text-center mb-3">Plans</h5>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Slug</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans?.items?.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center p-4">
                No plans found
              </td>
            </tr>
          )}
          {plans?.items?.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.title}</td>
              <td className="border p-2">{p.slug}</td>
              <td className="border p-2 text-center">
                <Button variant="destructive" className="px-3" onClick={() => onDelete(p.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
