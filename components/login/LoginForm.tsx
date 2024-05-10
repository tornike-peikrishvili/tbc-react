"use client";

import { FormEvent, useState } from "react";
import handleLogin from "@/scripts/login";
import { useRouter } from "next/navigation";
import { useScopedI18n } from "@/locales/client";

function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(username, password).then(() => router.push("/"));
  };

  const scopedT = useScopedI18n("login");

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          type="username"
          id="username"
          name="username"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button
        type="submit"
        className="btn w-full py-2 px-4 border-black text-black hover:text-white hover:border-black hover:bg-black"
      >
        {scopedT("logIn")}
      </button>
      <div>
        <p className="text-center">
          user:kminchelle
          <br />
          pswrd:0lelplR
        </p>
      </div>
    </form>
  );
}

export default LoginForm;
