"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathName = usePathname();
    const params = useParams();
    const routes = [
        {
            href: `/${params.storeId}`,
            label: "Overview",
            active: pathName === `/${params.storeId}/overview`,
        },
        {
            href: `/${params.storeId}/settings`, //we can use storeId because this component is going inside [storeId]
            label: "Settings",
            active: pathName === `/${params.storeId}/settings`,
        },
        {
            href: `/${params.storeId}/billboards`,
            label: "Billboards",
            active: pathName === `/${params.storeId}/billboards`,
        },
    ];
    return (
        <nav
            className={cn(
                "flex items-center space-x-4 lg:space-x-6",
                className
            )}
        >
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-mdium transition-colors hover:text-primary",
                        route.active
                            ? "text-black dark:text-white"
                            : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    );
}