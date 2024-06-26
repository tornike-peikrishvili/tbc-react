"use client";

import { useState } from "react";
import { saveUserDetails } from "@/actions/actions";
import { assignRoleToUser } from "@/actions/user/update-user-role";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  age: z.number().int().positive("Age must be a positive integer"),
  address: z.string().min(1, "Address is required"),
  role: z.enum(["Member", "Organizer"], { required_error: "Role is required" }),
});

type UserFormData = z.infer<typeof userSchema>;

export default function DetailsForm() {
  const [role, setRole] = useState("Member");
  const [formData, setFormData] = useState<Partial<UserFormData>>({});
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData: UserFormData = {
      ...formData,
      age: Number(formData.age),
      role: role as "Member" | "Organizer",
    } as UserFormData;

    try {
      userSchema.parse(userData);

      const formDataToSend = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString());
      });

      const result = await assignRoleToUser(formDataToSend);
      if (result.success) {
        await saveUserDetails(formDataToSend);
        toast.success("User details saved successfully!");
        router.push("/profile");
      } else {
        toast.error(`Failed to assign role: ${result.message}`);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(`${err.path.join(".")}: ${err.message}`);
        });
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-lg rounded-lg bg-white p-8 shadow-xl"
      noValidate
    >
      <div className="mb-6">
        <label
          className="mb-2 block text-sm font-medium text-gray-700"
          htmlFor="username"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          onChange={handleInputChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
        />
      </div>
      <div className="mb-6">
        <label
          className="mb-2 block text-sm font-medium text-gray-700"
          htmlFor="firstname"
        >
          First Name
        </label>
        <input
          type="text"
          name="firstname"
          onChange={handleInputChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
        />
      </div>
      <div className="mb-6">
        <label
          className="mb-2 block text-sm font-medium text-gray-700"
          htmlFor="lastname"
        >
          Last Name
        </label>
        <input
          type="text"
          name="lastname"
          onChange={handleInputChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
        />
      </div>
      <div className="mb-6">
        <label
          className="mb-2 block text-sm font-medium text-gray-700"
          htmlFor="age"
        >
          Age
        </label>
        <input
          type="number"
          name="age"
          onChange={handleInputChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
        />
      </div>
      <div className="mb-6">
        <label
          className="mb-2 block text-sm font-medium text-gray-700"
          htmlFor="address"
        >
          Address
        </label>
        <input
          type="text"
          name="address"
          onChange={handleInputChange}
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
                ? "bg-indigo-600 text-white hover:bg-indigo-800"
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
                ? "bg-indigo-600 text-white hover:bg-indigo-800"
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
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-800 focus:outline-none focus:ring"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
