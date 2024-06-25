"use client";

import { useState } from "react";
import { saveUserDetails } from "@/actions/actions";
import { assignRoleToUser } from "@/actions/user/update-user-role";

export default function DetailsForm() {
  const [role, setRole] = useState("Member");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formDataToSend = new FormData(event.currentTarget);
    formDataToSend.append("role", role);

    const result = await assignRoleToUser(formDataToSend);
    if (result.success) {
      await saveUserDetails(formDataToSend);
      window.location.reload();
    } else {
      console.error("Failed to assign role:", result.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-lg rounded-lg bg-white p-8 shadow-xl"
    >
      <div className="mb-6">
        <label
          className="mb-2 block text-sm font-medium text-gray-700"
          htmlFor="name"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
          required
        />
      </div>
      <div className="mb-6">
        <label
          className="mb-2 block text-sm font-medium text-gray-700"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
          required
        />
      </div>
      <div className="mb-6">
        <label
          className="mb-2 block text-sm font-medium text-gray-700"
          htmlFor="image"
        >
          Image URL
        </label>
        <input
          type="text"
          name="image"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
        />
      </div>
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Role
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            className={`rounded-lg px-4 py-2 font-bold focus:outline-none ${
              role === "Member"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setRole("Member")}
          >
            Member
          </button>
          <button
            type="button"
            className={`rounded-lg px-4 py-2 font-bold focus:outline-none ${
              role === "Organizer"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setRole("Organizer")}
          >
            Organizer
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
