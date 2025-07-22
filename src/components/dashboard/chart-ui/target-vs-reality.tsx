import React from 'react';
import { ChartEnvironmentProps } from '@/types/chart';
import { BaseBarChart } from '@/components/charts/base-bar-chart';
import { formatAmount, getMonthName } from '@/lib/chartUtils';
import { CircleArrowOutUpRight, ShoppingBag } from 'lucide-react';


export const TargetVsReality: React.FC<ChartEnvironmentProps> = ({ isDark, isClient, height }) => {
    const targetVsRealityData = [
        { name: '2024-01-01T00:00:00', target: 5000, reality: 4500 },
        { name: '2024-02-01T00:00:00', target: 5000, reality: 4800 },
        { name: '2024-03-01T00:00:00', target: 5000, reality: 4200 },
        { name: '2024-04-01T00:00:00', target: 5000, reality: 5600 },
        { name: '2024-05-01T00:00:00', target: 5000, reality: 4600 },
        { name: '2024-06-01T00:00:00', target: 5000, reality: 5400 }
    ];

    return (
        <>
            <BaseBarChart
                series={[
                    {
                        name: 'Reality',
                        data: targetVsRealityData.map(item => item.reality),
                        type: 'bar',
                        barWidth: '25%',
                        color: isDark ? '#3B82F6' : '#4AB58B'
                    },
                    {
                        name: 'Target',
                        data: targetVsRealityData.map(item => item.target),
                        type: 'bar',
                        barWidth: '25%',
                        color: isDark ? '#F59E0B' : '#FFCF00'
                    },
                ]}
                isDarkMode={isDark}
                isClient={isClient}
                height={height}
                xAxisLabelFormatter={(value) => getMonthName(targetVsRealityData[value as number].name as string, 'short')}
                additionalOptions={{
                    grid: { top: 0, bottom: 0, left: 0, right: 0 },
                    xAxis: { axisTick: { show: false } },
                    yAxis: { show: false, axisLabel: { show: false }, axisLine: { show: false }, axisTick: { show: false } }
                }}
            />

            <div className="flex items-center justify-between bg-emerald-50 dark:bg-green-200 border border-emerald-400 dark:border-emerald-500 p-2 rounded-lg mt-4 mb-2">
                <div className="flex items-center gap-2">
                    <span className="size-10 inline-flex bg-emerald-400 dark:bg-emerald-500 rounded-lg">
                        <ShoppingBag className='m-auto text-green-100 size-5' />
                    </span>
                    <div className="text-sm text-gray-800">
                        <p className='font-semibold'>Reality Sales</p>
                        <span className='text-xs'>Global</span>
                    </div>
                </div>
                <span className='text-sm text-emerald-500 dark:text-emerald-600 font-bold'>{formatAmount(
                    targetVsRealityData.reduce((acc, item) => acc + item.reality, 0)
                )}</span>
            </div>

            <div className="flex items-center justify-between bg-yellow-50 dark:bg-yellow-100 border border-amber-400 dark:border-amber-500 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                    <span className="size-10 inline-flex bg-yellow-400 dark:bg-yellow-500 rounded-lg">
                        <CircleArrowOutUpRight className='m-auto text-yellow-100 size-5' />
                    </span>
                    <div className="text-sm text-gray-800">
                        <p className='font-semibold'>Target Sales</p>
                        <span className='text-xs'>Commercial</span>
                    </div>
                </div>
                <span className='text-sm text-amber-500 dark:text-amber-600 font-bold'>{formatAmount(
                    targetVsRealityData.reduce((acc, item) => acc + item.target, 0)
                )}</span>
            </div>
        </>
    );
};
