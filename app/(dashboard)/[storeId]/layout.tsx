interface Props {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    return (
        <>
            <div>
                this will be a navbar
                {children}
            </div>
        </>
    );
}
