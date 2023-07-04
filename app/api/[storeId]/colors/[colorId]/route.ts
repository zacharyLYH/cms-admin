import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string; colorId: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        const body = await req.json();
        const { name, value } = body;
        if (!name) {
            return new NextResponse("name is required", { status: 400 });
        }
        if (!value) {
            return new NextResponse("Image URL is required", { status: 400 });
        }
        if (!params.colorId) {
            return new NextResponse("Color ID is required", {
                status: 400,
            });
        }
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }
        const colors = await prismadb.color.update({
            where: {
                id: params.colorId,
            },
            data: {
                name,
                value,
            },
        });
        return NextResponse.json(colors);
    } catch (error) {
        console.log("COLORS_PATCH: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string; colorId: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!params.colorId) {
            return new NextResponse("Size ID is required", {
                status: 400,
            });
        }
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }
        const colors = await prismadb.color.deleteMany({
            where: {
                id: params.colorId,
            },
        });
        return NextResponse.json(colors);
    } catch (error) {
        console.log("COLORS_DELETE: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { colorId: string } }
) {
    try {
        if (!params.colorId) {
            return new NextResponse("Size ID is required", {
                status: 400,
            });
        }
        const colors = await prismadb.color.findUnique({
            where: {
                id: params.colorId,
            },
        });
        return NextResponse.json(colors);
    } catch (error) {
        console.log("COLORS_GET: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
