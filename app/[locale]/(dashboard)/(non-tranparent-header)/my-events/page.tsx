import MyEvents from "@/components/my-events/MyEvents";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async function UserEventsPage() {
    return (
      <div className="p-6">
        <MyEvents />
      </div>
    );
  },
  { returnTo: "/" },
);
