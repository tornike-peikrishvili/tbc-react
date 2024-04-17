function ProfileInfo({ profileInfo }) {
  return (
    <div className="bg-white  px-8  rounded-lg shadow-md max-w-md w-full">
      {profileInfo && (
        <div className="py-4">
          <h2 className="text-2xl py-3 font-semibold">Profile Information</h2>
          <div>
            <span className="text-l  font-semibold">Name:</span>{" "}
            <input
              type="text"
              value={profileInfo.name}
              readOnly
              className="w-full px-4 py-2 my-2 border rounded-lg"
            />
          </div>
          <div>
            <span className="text-l font-semibold">Surname:</span>{" "}
            <input
              type="text"
              value={profileInfo.surname}
              readOnly
              className="w-full px-4 py-2 my-2 border rounded-lg"
            />
          </div>
          <div>
            <span className="text-l font-semibold">Email:</span>{" "}
            <input
              type="email"
              value={profileInfo.email}
              readOnly
              className="w-full px-4 py-2 my-2 border rounded-lg"
            />
          </div>
          <div>
            <span className="text-l font-semibold">Password:</span>{" "}
            <input
              type="password"
              value={profileInfo.newPassword}
              readOnly
              className="w-full px-4 py-2 my-2 border rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileInfo;
