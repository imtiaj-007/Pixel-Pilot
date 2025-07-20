import {
    FileTextIcon, UsersIcon, PieChartIcon,
    PackageIcon, SettingsIcon, BellIcon, ListIcon, ShieldIcon,
    HomeIcon,
} from "lucide-react";

interface MenuSubItem {
    id: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    href: string;
}

interface MenuItem {
    id: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    href?: string;
    badge?: string | number;
    subItems?: MenuSubItem[];
}

interface MenuGroup {
    id: string;
    label: string;
    items: MenuItem[];
}


export const menuConfig: MenuGroup[] = [
    {
        id: 'main',
        label: 'Main',
        items: [
            {
                id: 'dashboard',
                label: 'Dashboard',
                icon: PieChartIcon,
                href: '/',
            }
        ]
    },
    {
        id: 'pages',
        label: 'Pages',        
        items: [
            {
                id: 'home',
                label: 'Home',
                icon: HomeIcon,
                href: '/pages/home'
            },
            {
                id: 'about-us',
                label: 'About Us',
                icon: FileTextIcon,
                href: '/pages/about-us',
                badge: 'New'
            }
        ]
    },
    {
        id: 'management',
        label: 'Management',
        items: [
            {
                id: 'users',
                label: 'Users',
                icon: UsersIcon,
                subItems: [
                    {
                        id: 'all-users',
                        label: 'All Users',
                        icon: ListIcon,
                        href: '/users/list'
                    },
                    {
                        id: 'roles',
                        label: 'Roles',
                        icon: ShieldIcon,
                        href: '/users/roles'
                    }
                ]
            },
            {
                id: 'products',
                label: 'Products',
                icon: PackageIcon,
                href: '/products/list'
            }
        ]
    },
    {
        id: 'settings',
        label: 'Settings',
        items: [
            {
                id: 'preferences',
                label: 'Preferences',
                icon: SettingsIcon,
                href: '/settings/preferences'
            },
            {
                id: 'notifications',
                label: 'Notifications',
                icon: BellIcon,
                href: '/settings/notifications',
                badge: '3'
            }
        ]
    }
];