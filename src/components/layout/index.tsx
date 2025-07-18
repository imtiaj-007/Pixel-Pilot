'use client'

import { ReactNode } from "react"
import { Header } from "@/components/layout/header"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"


interface LayoutProps {
    children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-gray-100 dark:bg-background">
                <AppSidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header />
                    <main className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}
