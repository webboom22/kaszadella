import React, { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import RootShell from "../RootShell";



async function Layout({ children }: { children: ReactNode; }) {
    const session = await auth();

    if (session) redirect("/");

    return <RootShell>{children}</RootShell>;
}

export default Layout;
