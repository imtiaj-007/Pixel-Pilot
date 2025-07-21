import React from 'react'
import { BaseBarChart } from '@/components/charts/base-bar-chart';
import { ChartEnvironmentProps } from '@/types/chart';
import { getWeekdayName } from '@/lib/chartUtils';


export const TotalRevenue: React.FC<ChartEnvironmentProps> = ({ isDark, isClient, height }) => {
    const revenueData = [
        { name: '2025-06-01T00:00:00', online: 4200, offline: 2800 },
        { name: '2025-06-02T00:00:00', online: 3800, offline: 3100 },
        { name: '2025-06-03T00:00:00', online: 4500, offline: 2900 },
        { name: '2025-06-04T00:00:00', online: 5200, offline: 3500 },
        { name: '2025-06-05T00:00:00', online: 6100, offline: 4200 },
        { name: '2025-06-06T00:00:00', online: 7800, offline: 5100 },
        { name: '2025-06-07T00:00:00', online: 6500, offline: 4800 }
    ];

    return (
        <BaseBarChart
            series={[
                {
                    name: 'Online',
                    data: revenueData.map(item => item.online),
                    type: 'bar',
                    barWidth: '25%',
                },
                {
                    name: 'Offline',
                    data: revenueData.map(item => item.offline),
                    type: 'bar',
                    barWidth: '25%',
                }
            ]}
            xAxisLabelFormatter={(value) => getWeekdayName(revenueData[value as number].name as string, 'short')}
            yAxisLabelFormatter={(value) => `₹${value}`}
            isClient={isClient}
            isDarkMode={isDark}
            height={height}
            additionalOptions={{
                grid: { top: 40, bottom: 0, left: 0, right: 0 },
                legend: { 
                    show: true, 
                    data: ['Online', 'Offline'], 
                    orient: 'horizontal', 
                    top: 10, 
                    itemWidth: 12, 
                    itemHeight: 12, 
                    icon: 'rect' 
                },
                xAxis: { axisTick: { show: false } }
            }}
        />
    );
};