import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface DashboardProps {
    params: {
        storeId: string;
    };
}

const DashboardPage: React.FC<DashboardProps> = async ({ params }) => {
    const { userId } = auth();
    if (!userId) {
        redirect("/sign-in");
    }
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: userId,
        },
    });
    if (!store) {
        redirect("/");
    }
    return <div>This is a dashboard</div>;
};

export default DashboardPage;
