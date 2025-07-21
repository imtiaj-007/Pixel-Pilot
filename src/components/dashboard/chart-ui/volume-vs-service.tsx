/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { ChartEnvironmentProps } from '@/types/chart';
import { BaseBarChart } from '@/components/charts';
import { getMonthName } from '@/lib/chartUtils';


export const VolumeVsService: React.FC<ChartEnvironmentProps> = ({ isDark, isClient, height }) => {
    const volumeVsServiceData = [
        { name: '2024-01-01T00:00:00', volume: 2100, service: 5470 },
        { name: '2025-02-01T00:00:00', volume: 1800, service: 5200 },
        { name: '2025-03-01T00:00:00', volume: 2400, service: 5800 },
        { name: '2025-04-01T00:00:00', volume: 3000, service: 6200 },
        { name: '2025-05-01T00:00:00', volume: 2700, service: 5900 },
        { name: '2025-06-01T00:00:00', volume: 3200, service: 6500 }
    ];

    let volumeSum: number = 0, serviceSum: number = 0;
    volumeVsServiceData.forEach(item => {
        volumeSum += item.volume;
        serviceSum += item.service;
    })

    return (
        <>
            <BaseBarChart
                series={[
                    {
                        type: 'bar',
                        name: 'Volume',
                        data: volumeVsServiceData.map(item => item.volume),
                        stack: 'stack1',
                        barWidth: '30%',
                        itemStyle: {
                            borderRadius: [8, 8, 8, 8],
                        },
                    },
                    {
                        type: 'bar',
                        name: 'Service',
                        data: volumeVsServiceData.map(item => item.service),
                        stack: 'stack1',
                        barWidth: '30%',
                        itemStyle: {
                            borderRadius: [8, 8, 8, 8],
                        },
                    }
                ]}
                isDarkMode={isDark}
                isClient={isClient}
                height={height}
                additionalOptions={{
                    xAxis: {
                        axisTick: { show: false },
                        axisLabel: {
                            formatter: (value: any) => getMonthName(volumeVsServiceData[value as number].name as string, 'short'),
                            color: isDark ? '#E5E7EB' : '#374151'
                        }
                    },
                    yAxis: { show: false, axisLabel: { show: false }, axisTick: { show: false } },
                    grid: { top: 0, bottom: 40, left: 0, right: 0 },
                    legend: {
                        show: true,
                        icon: 'circle',
                        bottom: 10
                    }
                }}
            />

            <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted">
                    <span className="size-3 rounded-full bg-[#5969ce]"></span>
                    <span className="font-medium">Volume:</span>
                    <span className="font-semibold text-foreground">
                        {volumeSum.toString()}
                    </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted">
                    <span className="size-3 rounded-full bg-[#6cb970]"></span>
                    <span className="font-medium">Service Level:</span>
                    <span className="font-semibold text-foreground">
                        {(volumeSum / serviceSum).toFixed(1)}%
                    </span>
                </div>
            </div>
        </>
    );
};
