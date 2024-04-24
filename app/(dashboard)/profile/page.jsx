"use client";

import { useState } from "react";
import ProfileInfo from "@/components/profile/ProfileInfo";

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [profileInfo, setProfileInfo] = useState({
    name: "",
    surname: "",
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setProfileInfo(formData);
  };

  return (
    <div className="w-full gap-4 bg-gray-100 flex justify-center items-center py-6 dark:bg-dark-page">
      <div className="bg-white  px-8 h-full rounded-lg shadow-md max-w-md w-full dark:bg-slate-600">
        <h2 className="text-2xl font-semibold my-4 dark:text-slate-50">Set Profile Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="block mb-1 font-semibold dark:text-slate-50">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg dark:bg-slate-200 dark:text-black"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="surname" className="block mb-1 font-semibold dark:text-slate-50">
              Surname
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg dark:bg-slate-200 dark:text-black"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block mb-1 font-semibold dark:text-slate-50">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg dark:bg-slate-200 dark:text-black"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="newPassword" className="block mb-1 font-semibold dark:text-slate-50">
              Set New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg dark:bg-slate-200 dark:text-black"
            />
          </div>
          <div>
            <label
              htmlFor="confirmNewPassword"
              className="block mb-1 font-semibold dark:text-slate-50"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg dark:bg-slate-200 dark:text-black"
            />
          </div>
          <button
            type="submit"
            className="dark:text-slate-50 btn mt-6 w-full border-black text-black hover:text-white hover:border-black hover:bg-black"
          >
            Save
          </button>
        </form>
      </div>
      <ProfileInfo profileInfo={profileInfo} />
    </div>
  );
}

export default Profile;
