export interface User {
  id: number;
  name: string;
  email: string;
  age: string;
}

export async function getUsers() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-users`
  );
  const { users } = await response.json();

  return users.rows;
}

export async function createUser(name: string, email: string, age: string) {
  return await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/create-user`, {
    method: "POST",
    body: JSON.stringify({ name, email, age }),
  });
}

export async function deleteUser(id: number) {
  "use server";
  await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/delete-user/${id}`, {
    method: "DELETE",
  });
}

export async function updateUser(
  id: string,
  name: string,
  email: string,
  age: string
) {
  "use server";
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/edit-user/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({ id, name, email, age }),
    }
  );
}
