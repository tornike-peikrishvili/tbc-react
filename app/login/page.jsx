"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_KEY } from "@/constants";
import { login } from "../actions";
import LoginForm from "@/components/LoginForm";

async function LoginPage() {
  const cookieStore = cookies();

  const cookie = cookieStore.get(AUTH_COOKIE_KEY);
  console.log("cookie:", cookie);

  if (cookie) {
    redirect("/");
  }

  const handleLogin = async (username, password) => {
    "use server";
    await login(username, password);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
        <LoginForm handleLogin={handleLogin} />
      </div>
    </div>
  );
}

export default LoginPage;
