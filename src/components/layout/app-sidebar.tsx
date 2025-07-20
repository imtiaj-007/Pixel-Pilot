import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rocket, ChevronDown } from "lucide-react";
import {
    Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader,
    SidebarInput, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem,
    SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { menuConfig } from "@/constants/menuOptions";


export const AppSidebar: React.FC = () => {
    const { open } = useSidebar();
    const pathName = usePathname();

    return (
        <Sidebar variant="floating" collapsible="icon">
            {/* --- Header (Logo/App Name) --- */}
            <SidebarHeader className="flex items-center gap-2 p-4">
                <Rocket size={28} className="text-indigo-500" />
                {open && <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Pixel Pilot</h1>}
            </SidebarHeader>

            {/* --- Search Bar --- */}
            <SidebarInput
                placeholder="Search..."
                className={`mx-auto mb-2 transition-all duration-300 ${open ? 'w-56' : 'w-0'}`}
            />

            {/* --- Main Navigation Groups --- */}
            <SidebarContent className="[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border">
                {menuConfig.map((group) => (
                    <Collapsible key={group.id} defaultOpen className="group/collapsible">
                        <SidebarGroup>
                            <SidebarGroupLabel asChild>
                                <CollapsibleTrigger>
                                    {group.label}
                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarMenu>
                                    {group.items.map((item) => (
                                        <SidebarMenuItem key={item.id}>
                                            {item.subItems ? (
                                                <>
                                                    <SidebarMenuButton tooltip={item.label} isActive={item.href === pathName} asChild >
                                                        <Link href={item.href || '#'}>
                                                            {item.icon && <item.icon />}
                                                            <span>{item.label}</span>
                                                            {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                                                        </Link>
                                                    </SidebarMenuButton>
                                                    <SidebarMenuSub>
                                                        {item.subItems.map((subItem) => (
                                                            <SidebarMenuSubItem key={subItem.id}>
                                                                <SidebarMenuSubButton href={subItem.href || '#'} isActive={item.href === pathName} >
                                                                    {subItem.icon && <subItem.icon />}
                                                                    <span>{subItem.label}</span>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </>
                                            ) : (
                                                <SidebarMenuButton tooltip={item.label} isActive={item.href === pathName} asChild >
                                                    <Link href={item.href || '#'}>
                                                        {item.icon && <item.icon />}
                                                        <span>{item.label}</span>
                                                        {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                                                    </Link>
                                                </SidebarMenuButton>
                                            )}
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                ))}
            </SidebarContent>
        </Sidebar>
    );
};