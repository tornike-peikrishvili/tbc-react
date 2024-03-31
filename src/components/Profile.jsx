import { useState } from "react";
import ProfileInfo from "./ProfileInfo";

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
    <div className="w-full gap-4 bg-gray-100 flex justify-center items-center py-6">
      <div className="bg-white  px-8 h-full rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold my-4">Set Profile Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="block mb-1 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              value={formData.surname}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.newPassword}
              onChange={handleChange}
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
              value={formData.confirmNewPassword}
              onChange={handleChange}
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
      <ProfileInfo profileInfo={profileInfo} />
    </div>
  );
}

export default Profile;
