"use server";

import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { CartItem } from "./app/[locale]/(dashboard)/(non-tranparent-header)/cart/page";

export interface User {
  user_id: string;
  name: string;
  email: string;
  image: string;
  role: string[];
}

// Get Users
export async function getUsers() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-users`,
    { cache: "no-store" },
  );
  const { users } = await response.json();

  return users.rows;
}

// Get User Info

export async function getUserInfo() {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-user-info/`,
    {
      cache: "no-store",
      headers: { Authorization: userId },
    },
  );
  const userInfo = await response.json();
  return userInfo;
}

// Create Event

export async function createEvent(
  formData: FormData,
  userRole: string[],
  userId: string,
  userName: string,
) {
  formData.append("userId", userId);
  formData.append("userName", userName);
  formData.append("userRole", JSON.stringify(userRole));

  return await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/events/add`, {
    method: "POST",
    body: formData,
  });
}

// Delete Event
export async function deleteEvent(eventId: number) {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const userRole = user?.role;
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/events/delete/${eventId}`,
    {
      method: "DELETE",
      body: JSON.stringify({ userId, userRole }),
    },
  );
}

// Edit Event

export async function editEvent(formData: FormData) {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const userRole = user?.role;
  const userName = user?.name;
  const eventId = formData.get("id") as string;

  formData.append("userId", userId);
  formData.append("userName", userName);
  formData.append("userRole", JSON.stringify(userRole));

  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/events/edit/${eventId}`,
    {
      method: "PUT",
      body: formData,
    },
  );
}

// Get My Events

export async function getMyEvents() {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/events/my-events`,
    {
      method: "GET",
      headers: { Authorization: userId },
      cache: "no-store",
    },
  );
  const { events } = await response.json();

  return events.rows;
}

// Add To Cart

export async function addToCart(eventId: number) {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/cart/add`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, eventId }),
    },
  );
  const data = await response.json();
  return data;
}

// Get Cart Items

export async function getCartItems(userId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/cart/get`,
    { method: "POST", cache: "no-store", body: JSON.stringify({ userId }) },
  );
  const cartItems = await response.json();
  return cartItems.rows;
}

// Decrease Quantity

export async function decreaseQuantity(eventId: number) {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/cart/deacrease-quantity`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, eventId }),
    },
  );
  const data = await response.json();
  return data;
}

// Increase Quantity

export async function increaseQuantity(eventId: number) {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/cart/increase-quantity`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, eventId }),
    },
  );
  const data = await response.json();
  return data;
}

// Delete From Cart

export async function removeFromCart(eventId: number) {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/cart/delete`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, eventId }),
    },
  );
  const data = await response.json();
  return data;
}

// Clear Cart

export async function clearCart() {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/cart/clear`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    },
  );
  const data = await response.json();
  return data;
}

// Stripe Checkout

export async function checkout(cartItems: CartItem[]) {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/stripe/checkout`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ products: cartItems, userId }),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      if (response.url) {
        redirect(response.url);
      }
    });
}

// Get Orders

export const getOrders = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/stripe/get-orders`,
    {
      cache: "no-store",
    },
  );
  const orders = await res.json();
  return orders;
};

// Get Event

export async function getEvent(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/events/get-event/${id}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    const event = data.events?.rows ? data.events.rows[0] : null;
    return event;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
}

// Create Blog
export async function createBlog(
  formData: FormData,
  userRole: string[],
  userId: string,
  userName: string,
) {
  formData.append("userId", userId);
  formData.append("userName", userName);
  formData.append("userRole", JSON.stringify(userRole));

  return await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/blog/add`, {
    method: "POST",
    body: formData,
    cache: "no-store",
  });
}

// Delete Blog
export async function deleteBlog(blogId: number) {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const userRole = user?.role;
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/blog/delete/${blogId}`,
    {
      method: "DELETE",
      body: JSON.stringify({ userId, userRole }),
    },
  );
}

// Edit Blog
export async function editBlog(formData: FormData) {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const userRole = user?.role;
  const userName = user?.name;
  const blogId = formData.get("blogId") as string;

  formData.append("userId", userId);
  formData.append("userName", userName);
  formData.append("userRole", JSON.stringify(userRole));

  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/blog/edit/${blogId}`,
    {
      method: "PUT",
      body: formData,
    },
  );
}

// Get All Blogs
export async function getAllBlogs() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/blog/get-all-blogs`,
      {
        method: "GET",
        cache: "no-store",
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
}

// Get My Blogs

export async function getMyBlogs() {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/blog/my-blog`,
    {
      method: "GET",
      cache: "no-store",
      headers: { Authorization: userId },
    },
  );
  const { blogs } = await response.json();

  return blogs.rows;
}

// Get Single Blog

export async function getBlog(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/blog/get-blog/${id}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    const blog = data.blogs?.rows ? data.blogs.rows[0] : null;
    return blog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
}
