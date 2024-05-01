import { ProfileInfoData } from "@/app/[locale]/(dashboard)/profile/page";

function ProfileInfo({ profileInfo }: { profileInfo: ProfileInfoData }) {
  return (
    <div className="bg-white  px-8  rounded-lg shadow-md max-w-md w-full dark:bg-slate-600">
      {profileInfo && (
        <div className="py-4">
          <h2 className="text-2xl py-3 font-semibold dark:text-slate-50">
            Profile Information
          </h2>
          <div>
            <span className="text-l  font-semibold dark:text-slate-50">
              Name:
            </span>{" "}
            <input
              type="text"
              value={profileInfo.name}
              readOnly
              className="w-full px-4 py-2 my-2 border rounded-lg dark:bg-slate-200 dark:text-black"
            />
          </div>
          <div>
            <span className="text-l font-semibold dark:text-slate-50">
              Surname:
            </span>{" "}
            <input
              type="text"
              value={profileInfo.surname}
              readOnly
              className="w-full px-4 py-2 my-2 border rounded-lg dark:bg-slate-200 dark:text-black"
            />
          </div>
          <div>
            <span className="text-l font-semibold dark:text-slate-50">
              Email:
            </span>{" "}
            <input
              type="email"
              value={profileInfo.email}
              readOnly
              className="w-full px-4 py-2 my-2 border rounded-lg dark:bg-slate-200 dark:text-black"
            />
          </div>
          <div>
            <span className="text-l font-semibold dark:text-slate-50">
              Password:
            </span>{" "}
            <input
              type="password"
              value={profileInfo.newPassword}
              readOnly
              className="w-full px-4 py-2 my-2 border rounded-lg dark:bg-slate-200 dark:text-black"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileInfo;
