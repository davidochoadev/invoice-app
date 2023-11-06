import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getAuth } from "firebase-admin/auth";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const auth = getAuth(app);
  const nextPageToken = request.headers.get("nextPageToken");

  const listAllUsers = async (nextPageToken: string | null) => {
   try {
     if (nextPageToken) {
       const listUsersResult = await auth.listUsers(10, nextPageToken);
       if (listUsersResult.pageToken) {
         // List the next batch of users.
         await listAllUsers(listUsersResult.pageToken);
         
       }
       return listUsersResult
     } else {
       // If there's no nextPageToken, it means it's the first page.
       const firstPageResult = await auth.listUsers(10);
       if (firstPageResult.pageToken) {
         // List the next batch of users.
         await listAllUsers(firstPageResult.pageToken);
       }
       return firstPageResult;
     }
   } catch (error) {
     console.log("Error listing users:", error);
   }
 };

  const users = await listAllUsers(nextPageToken);

  return new Response(JSON.stringify({
   users: users?.users,
   pageToken: users?.pageToken
 }),
 { status: 200 })
};
