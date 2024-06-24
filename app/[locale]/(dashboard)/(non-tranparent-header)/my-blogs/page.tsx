import MyBlogs from "@/components/my-blogs/MyBlogs";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async function UserBlogsPage() {
    return (
      <div className="p-6">
        <MyBlogs />
      </div>
    );
  },
  { returnTo: "/" },
);
