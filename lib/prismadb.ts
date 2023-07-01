/*
Essential file that can be copied verbatim. It prevents reinitializing a new PrismaClient() due to hotloading in development.
*/
import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prismadb;
}

export default prismadb;
