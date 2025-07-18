import { PanelLeftIcon, BellIcon, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ThemeToggle } from "@/components/theme/theme-toggle"


export const Header: React.FC = () => {
    const { toggleSidebar } = useSidebar()

    return (
        <header className="sticky top-2 z-10 flex h-16 items-center gap-4 border rounded-md shadow-xs bg-sidebar px-4 md:px-6 mr-2">
            {/* Sidebar Toggle */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0"
                        onClick={toggleSidebar}
                    >
                        <PanelLeftIcon className="h-5 w-5" />
                        <span className="sr-only">Toggle sidebar</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Toggle sidebar</p>
                </TooltipContent>
            </Tooltip>

            {/* Search Bar */}
            <div className="relative ml-auto flex-1 md:grow-0">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-full">
                            <BellIcon className="h-5 w-5" />
                            <span className="sr-only">Notifications</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Notifications</p>
                    </TooltipContent>
                </Tooltip>
                <ThemeToggle />

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/avatars/01.png" alt="User" />
                                        <AvatarFallback>US</AvatarFallback>
                                    </Avatar>
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>User menu</p>
                            </TooltipContent>
                        </Tooltip>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
