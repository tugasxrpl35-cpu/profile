import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const allowedUserIds =
    process.env.ADMIN_USER_IDS?.split(",").map((e) => e.trim()) || [];

  if (isAdminRoute(req)) {
    await auth.protect();

    const { userId } = await auth();

    if (!userId || !allowedUserIds.includes(userId)) {
      return new Response("Forbidden", { status: 403 });
    }
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};