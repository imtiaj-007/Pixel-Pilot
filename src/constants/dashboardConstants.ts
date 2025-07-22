import { ChartColumn, File, TagIcon, UserPlus } from 'lucide-react';

interface DashboardCardConfig {
    title: string;
    subtitle: string;
    value: string | number;
    description: string;
    trend: string;
    icon: React.ComponentType<{ className?: string }>;
    iconBgColor: string;
    iconBgColorDark: string;
    iconClassNames: string;
    cardBgColor: string;
    cardBgColorDark: string;
    cardClassNames: string;
    trendColor: string;
    trendColorDark: string;
    trendClassNames: string;
}

export const dashboardCards: DashboardCardConfig[] = [
    {
        title: "Today's Sales",
        subtitle: "Sales Summary",
        value: "₹34,723",
        description: "Total Sales",
        trend: "+8% from yesterday",
        icon: ChartColumn,
        iconBgColor: "#FA5A7D",
        iconBgColorDark: "#E11D48",
        iconClassNames: "bg-[#FA5A7D] dark:bg-[#E11D48]",
        cardBgColor: "#FFE2E5",
        cardBgColorDark: "oklch(0.269_0_0)",
        cardClassNames: "bg-[#FFE2E5] dark:bg-[oklch(0.269_0_0)]",
        trendColor: "#5D5FEF",
        trendColorDark: "#4ADE80",
        trendClassNames: "text-[#5D5FEF] dark:text-[#4ADE80]"
    },
    {
        title: "Total Order",
        subtitle: "Order Summary",
        value: 3096,
        description: "Total Order",
        trend: "+5% from yesterday",
        icon: File,
        iconBgColor: "#FF947A",
        iconBgColorDark: "#F97316",
        iconClassNames: "bg-[#FF947A] dark:bg-[#F97316]",
        cardBgColor: "#FFF4DE",
        cardBgColorDark: "oklch(0.269_0_0)",
        cardClassNames: "bg-[#FFF4DE] dark:bg-[oklch(0.269_0_0)]",
        trendColor: "#5D5FEF",
        trendColorDark: "#4ADE80",
        trendClassNames: "text-[#5D5FEF] dark:text-[#4ADE80]"
    },
    {
        title: "Product Sold",
        subtitle: "Product Summary",
        value: 247,
        description: "Product Sold",
        trend: "+12% from yesterday",
        icon: TagIcon,
        iconBgColor: "#3CD856",
        iconBgColorDark: "#22C55E",
        iconClassNames: "bg-[#3CD856] dark:bg-[#22C55E]",
        cardBgColor: "#DCFCE7",
        cardBgColorDark: "oklch(0.269 0 0)",
        cardClassNames: "bg-[#DCFCE7] dark:bg-[oklch(0.269_0_0)]",
        trendColor: "#5D5FEF",
        trendColorDark: "#4ADE80",
        trendClassNames: "text-[#5D5FEF] dark:text-[#4ADE80]"
    },
    {
        title: "New Users",
        subtitle: "User Summary",
        value: 85,
        description: "New Users",
        trend: "+2% from yesterday",
        icon: UserPlus,
        iconBgColor: "#BF83FF",
        iconBgColorDark: "#A855F7",
        iconClassNames: "bg-[#BF83FF] dark:bg-[#A855F7]",
        cardBgColor: "#F3E8FF",
        cardBgColorDark: "oklch(0.269_0_0)",
        cardClassNames: "bg-[#F3E8FF] dark:bg-[oklch(0.269_0_0)]",
        trendColor: "#5D5FEF",
        trendColorDark: "#4ADE80",
        trendClassNames: "text-[#5D5FEF] dark:text-[#4ADE80]"
    },
];