"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { updateUser } from "@/actions/user/edit-user";

interface UserInfo {
  user_id: string;
  name: string;
  email: string;
  image: string;
  address: string;
  role: string[];
}

interface ProfileProps {
  userInfo: UserInfo;
}

function Profile({ userInfo }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [address, setAddress] = useState(userInfo.address);

  useEffect(() => {
    setFirstName(userInfo.name);
    setEmail(userInfo.email);
    setAddress(userInfo.address);
  }, [userInfo]);

  console.log(userInfo.email);
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
        if (response.ok) {
        } else {
          console.error("Failed to upload image");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    const formData = new FormData();
    formData.append("name", firstName);
    formData.append("email", email);
    setIsEditing(false);
    try {
      const result = await updateUser(userInfo.user_id, formData);
      console.log(result.message);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div className="flex  items-center justify-center ">
      <div className="max-w-xl rounded-lg bg-white p-10 shadow-2xl">
        <div className="mb-6 flex items-center">
          <label className="relative cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <Image
              className="h-28 w-28 cursor-pointer rounded-full object-cover hover:opacity-75"
              src={userInfo.image}
              alt="Profile"
              width={112}
              height={112}
            />
            <div className="absolute inset-0  hidden items-center justify-center rounded-lg bg-black bg-opacity-50 group-hover:flex">
              <p className="text-sm text-black">Change Photo</p>
            </div>
          </label>
          <div className="ml-4">
            <div className="flex items-center">
              <h2 className="text-3xl font-semibold">
                {isEditing ? (
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-[20rem] rounded-md border border-gray-300 px-3 py-1 focus:border-blue-500 focus:outline-none"
                  />
                ) : (
                  firstName
                )}{" "}
              </h2>
              {!isEditing && (
                <button
                  className="ml-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </button>
              )}
            </div>
            <p className="mt-1 text-gray-600">Role: {userInfo.role}</p>
          </div>
          {isEditing && (
            <button
              className="ml-2 text-blue-500 hover:underline focus:outline-none"
              onClick={handleSaveProfile}
            >
              Save
            </button>
          )}
        </div>
        <div className="mb-6">
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
            purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit
            dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.
          </p>
        </div>
        <div className="max-h-150px  border-t pt-4 md:max-h-[60px] lg:max-h-[60px]">
          <div className="w-full">
            <div className="flex flex-col gap-5 lg:flex-row">
              <div className=" w-[50%] ">
                <p className="text-sm text-gray-600">Email:</p>
                <p className="text-gray-800 ">
                  {isEditing ? (
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-1 focus:border-blue-500 focus:outline-none"
                    />
                  ) : (
                    email
                  )}
                </p>
              </div>
              <div className="w-[50%] ">
                <p className="text-sm text-gray-600">Address:</p>
                <p className=" pb-2 text-gray-800">
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
            <div></div>
            <div className="col-span-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export Profile component
export default Profile;
