import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/api/:path*"], //exposes all the APIs to public. BUT, the private routes have their own authentication inside already using auth(), so this is valid.
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
