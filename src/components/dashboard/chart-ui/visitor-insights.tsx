import React from 'react'
import { ChartEnvironmentProps } from '@/types/chart';
import BasePieChart from '@/components/charts/base-pie-chart';


export const VisitorInsights: React.FC<ChartEnvironmentProps> = ({ isDark, isClient, height }) => {
    const visitorData = [
        { value: 635, name: 'Direct' },
        { value: 998, name: 'Search Engine' },
        { value: 620, name: 'Email' },
        { value: 380, name: 'Ads' },
    ];

    return (
        <BasePieChart
            series={{
                type: 'pie',
                data: visitorData,
                radius: ['40%', '70%'],
                center: ['50%', '45%'],
                label: {
                    show: true,
                    formatter: `{b}`,
                    fontSize: 11,
                    position: 'outer',
                    alignTo: 'labelLine',
                    bleedMargin: 5,
                    color: isDark ? '#E5E7EB' : '#0F172A'
                },
                labelLine: { show: true },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 12,
                        fontWeight: 'bold',
                        formatter: (params) => {
                            if (!params?.percent) return '';
                            return `${params.name}:\n(${params.percent.toFixed(1)}%)`;
                        },
                    },
                },
            }}
            seriesData={visitorData}
            isDarkMode={isDark}
            isClient={isClient}
            height={height}
            additionalOptions={{
                legend: {
                    orient: 'horizontal',
                    bottom: 5,
                    itemWidth: 12,
                    itemHeight: 12,
                    icon: 'circle',
                },
            }}
        />
    )
};