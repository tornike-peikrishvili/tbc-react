export default async function handleLogout() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/logout`,
      {
        method: "POST",
      }
    );

    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.error(error);
  }
}
