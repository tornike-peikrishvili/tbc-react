"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { updateUser } from "@/actions/user/edit-user";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";

interface UserInfo {
  user_id: string;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  image: string;
  address: string;
  role: string | string[];
}

interface ProfileProps {
  userInfo: UserInfo;
}

const userSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  age: z.number().int().positive("Age must be a positive integer"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
});

function Profile({ userInfo }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [firstname, setFirstname] = useState(userInfo.firstname);
  const [lastname, setLastname] = useState(userInfo.lastname);
  const [age, setAge] = useState(userInfo.age);
  const [email, setEmail] = useState(userInfo.email);
  const [address, setAddress] = useState(userInfo.address);
  const [name, setName] = useState(userInfo.name);
  const router = useRouter();
  useEffect(() => {
    setFirstname(userInfo.firstname);
    setLastname(userInfo.lastname);
    setAge(userInfo.age);
    setEmail(userInfo.email);
    setAddress(userInfo.address);
    setName(userInfo.name);
  }, [userInfo]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userInfo.user_id);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/avatar-change`,
          {
            method: "POST",
            body: formData,
          },
        );
        router.refresh();
        if (response.ok) {
          toast.success("Profile picture updated successfully");
        } else {
          toast.error("Failed to upload image");
        }
      } catch (error) {
        toast.error("Error uploading image");
      }
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      const userData = {
        firstname,
        lastname,
        name,
        age,
        email,
        address,
      };

      userSchema.parse(userData);

      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      setIsEditing(false);
      const result = await updateUser(userInfo.user_id, formData);
      toast.success(result.message);
      console.log(userInfo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(`${err.path.join(".")}: ${err.message}`);
        });
      } else {
        toast.error("Failed to update user");
      }
    }
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="dark:bg-secondary w-full max-w-4xl rounded-lg bg-white p-8 shadow-2xl">
        <div className="mb-8 flex flex-col items-center md:flex-row">
          <label className="relative cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <Image
              className="h-32 w-32 rounded-full object-cover transition duration-300 ease-in-out hover:opacity-75"
              src={userInfo.image}
              alt="Profile"
              width={128}
              height={128}
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 transition duration-300 ease-in-out hover:opacity-100">
              <p className=" text-sm text-white">Change Photo</p>
            </div>
          </label>
          <div className="mt-4 md:ml-8 md:mt-0">
            <div className="flex items-center">
              <h2 className="text-3xl font-semibold dark:text-white">
                {isEditing ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-1 focus:border-indigo-800 focus:outline-none"
                      placeholder="Username"
                    />
                  </div>
                ) : (
                  `${name}`
                )}
              </h2>
              {!isEditing && (
                <button
                  className="ml-4 rounded-md bg-indigo-600 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-indigo-800 focus:outline-none"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </button>
              )}
              {isEditing && (
                <button
                  className="ml-4 rounded-md bg-green-500 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-green-600 focus:outline-none"
                  onClick={handleSaveProfile}
                >
                  Save
                </button>
              )}
            </div>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              Role:{" "}
              {Array.isArray(userInfo.role)
                ? userInfo.role.join(", ")
                : userInfo.role}
            </p>
          </div>
        </div>
        <div className="mb-8">
          <p className="text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
            purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit
            dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              First Name:
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-300">
              {isEditing ? (
                <input
                  type="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-1 focus:border-blue-500 focus:outline-none"
                />
              ) : (
                firstname
              )}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Last Name:
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-300">
              {isEditing ? (
                <input
                  type="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-1 focus:border-blue-500 focus:outline-none"
                />
              ) : (
                lastname
              )}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Age:
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-300">
              {isEditing ? (
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full rounded-md border border-gray-300 px-3 py-1 focus:border-blue-500 focus:outline-none"
                />
              ) : (
                age
              )}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Email:
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-300">
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-1 focus:border-blue-500 focus:outline-none"
                />
              ) : (
                email
              )}
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Address:
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-300">
              {isEditing ? (
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-1 focus:border-blue-500 focus:outline-none"
                />
              ) : (
                address
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
