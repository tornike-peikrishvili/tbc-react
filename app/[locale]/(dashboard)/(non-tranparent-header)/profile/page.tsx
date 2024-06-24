import { getUserInfo } from "@/api";
import Profile from "@/components/profile/Profile";

async function ProfilePage() {
  const userInfo = await getUserInfo();

  return (
    <div className="flex h-full items-center justify-center pt-5 ">
      <Profile userInfo={userInfo.user} />
    </div>
  );
}

export default ProfilePage;
