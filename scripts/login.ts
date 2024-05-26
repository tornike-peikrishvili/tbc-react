export default async function handleLogin(username: string, password: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to login");
  }
}
