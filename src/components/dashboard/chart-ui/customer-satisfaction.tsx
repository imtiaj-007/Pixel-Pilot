import React from 'react';
import { graphic } from 'echarts';
import BaseLineChart from '@/components/charts/base-line-chart';
import { ChartEnvironmentProps } from '@/types/chart';
import { Star } from 'lucide-react';


export const CustomerSatisfaction: React.FC<ChartEnvironmentProps> = ({ isDark, isClient, height }) => {
    const lastWeekData = [
        { name: '2025-05-25T00:00:00', total: 2.1 },
        { name: '2025-05-26T00:00:00', total: 1.9 },
        { name: '2025-05-27T00:00:00', total: 2.4 },
        { name: '2025-05-28T00:00:00', total: 2.5 },
        { name: '2025-05-29T00:00:00', total: 2.9 },
        { name: '2025-05-30T00:00:00', total: 2.6 },
        { name: '2025-05-31T00:00:00', total: 3.5 }
    ];

    const currentWeekData = [
        { name: '2025-06-01T00:00:00', total: 3.8 },
        { name: '2025-06-02T00:00:00', total: 4.2 },
        { name: '2025-06-03T00:00:00', total: 4.3 },
        { name: '2025-06-04T00:00:00', total: 4.0 },
        { name: '2025-06-05T00:00:00', total: 4.6 },
        { name: '2025-06-06T00:00:00', total: 4.7 },
        { name: '2025-06-07T00:00:00', total: 5.0 }
    ];

    return (
        <>
            <BaseLineChart
                series={[
                    {
                        name: 'Last Week',
                        data: lastWeekData.map(item => item.total),
                        type: 'line',
                        smooth: true,
                        lineStyle: { width: 3, color: '#0066FF' },
                        itemStyle: { color: '#0066FF' },
                        areaStyle: {
                            opacity: 0.1,
                            color: new graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#0066FF' },
                                { offset: 1, color: 'rgba(0, 102, 255, 0)' }
                            ])
                        },
                    },
                    {
                        name: 'Current Week',
                        data: currentWeekData.map(item => item.total),
                        type: 'line',
                        smooth: true,
                        lineStyle: { width: 3, color: '#00C896' },
                        itemStyle: { color: '#00C896' },
                        areaStyle: {
                            opacity: 0.1,
                            color: new graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#00C896' },
                                { offset: 1, color: 'rgba(0, 200, 150, 0)' }
                            ])
                        },
                    }
                ]}
                isDarkMode={isDark}
                isClient={isClient}
                height={height}
                additionalOptions={{
                    xAxis: { show: true, axisLabel: { show: false }, axisTick: { show: false } },
                    yAxis: { show: false, max: 6 },
                    grid: { top: 0, bottom: 40, left: 0, right: 0 },
                    legend: {
                        show: true,
                        data: ['Last Week', 'Current Week'],
                        orient: 'horizontal',
                        bottom: 0
                    }
                }}
            />

            <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-200 border border-emerald-400 dark:border-emerald-500 mt-4 px-2 py-3 rounded-lg">
                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-2 text-sm text-gray-700">
                        <Star className='size-5 text-amber-300 dark:text-amber-500 fill-amber-300 dark:fill-amber-500' />
                        Growth
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {(() => {
                        const lastWeekAvg = lastWeekData.reduce((acc, item) => acc + item.total, 0) / lastWeekData.length;
                        const currentWeekAvg = currentWeekData.reduce((acc, item) => acc + item.total, 0) / currentWeekData.length;
                        const growth = ((currentWeekAvg - lastWeekAvg) / lastWeekAvg) * 100;
                        const isPositive = growth >= 0;

                        return (
                            <>
                                <span className={`text-sm font-medium ${isPositive ? 'text-green-600 dark:text-green-700' : 'text-red-500'}`}>
                                    {isPositive ? '+' : ''}{Math.round(growth)}%
                                </span>
                                <span className="text-xs text-gray-500">
                                    vs last week
                                </span>
                            </>
                        );
                    })()}
                </div>
            </div>
        </>
    );
};
