// "use server";

// import { getSession } from "@auth0/nextjs-auth0";
// import { AuthToken } from "../auth0/auth0-get-token";

// export async function updateAuth0Profile(urlForAuth0: string) {
//   console.log("updateAuth0Profile called with URL:", urlForAuth0);
//   try {
//     const token = await AuthToken();
//     const session = await getSession();
//     const user = session?.user;
//     const userId = user?.sub;

//     if (!userId) {
//       throw new Error("User ID not found in session.");
//     }

//     const response = await fetch(
//       `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`,
//       {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${token.access_token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           picture: urlForAuth0,
//         }),
//       },
//     );

//     console.log("Auth0 update response status:", response.status);

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Auth0 error response:", errorText);
//       throw new Error(
//         `Failed to update profile on Auth0: ${response.statusText}`,
//       );
//     }

//     console.log("Profile picture updated successfully in Auth0");
//   } catch (error) {
//     console.error("Failed to update profile picture in Auth0:", error);
//     throw error;
//   }
// }
