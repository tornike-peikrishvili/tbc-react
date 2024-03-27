import React from "react";

const Profile = () => {
  return (
    <div className="w-full bg-gray-100 flex justify-center items-center">
      <div className="bg-white  px-8 py-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
        <form>
          <div className="mb-2">
            <label htmlFor="name" className="block mb-1 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value="John"
              readOnly
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="surname" className="block mb-1 font-semibold">
              Surname
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              value="Doe"
              readOnly
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block mb-1 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value="johndoe@example.com"
              readOnly
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="newPassword" className="block mb-1 font-semibold">
              Set New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label
              htmlFor="confirmNewPassword"
              className="block mb-1 font-semibold"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="btn mt-6 w-full border-black text-black hover:text-white hover:border-black hover:bg-black"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
