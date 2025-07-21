/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts/core';
import { MapChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, VisualMapComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { ChartEnvironmentProps } from '@/types/chart';
import { getThemeColors } from '@/lib/chartUtils';

echarts.use([
    MapChart,
    TitleComponent,
    TooltipComponent,
    VisualMapComponent,
    CanvasRenderer
]);

const sampleSalesData = [
    { name: 'India', value: 9500 },
    { name: 'China', value: 2000 },
    { name: 'Thailand', value: 7000 },
    { name: 'Indonesia', value: 5000 },
    { name: 'Iran', value: 4700 },
    { name: 'Saudi Arabia', value: 8000 },
    { name: 'Georgia', value: 4000 },    
];

export const SalesMapCountry: React.FC<ChartEnvironmentProps> = ({ isDark, isClient, height = '300px' }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(null);
    const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isClient || !chartRef.current) {
            if (chartInstance) {
                chartInstance.dispose();
                setChartInstance(null);
            }
            return;
        }

        const themeColor = getThemeColors(isDark);
        let currentChart = chartInstance;

        if (!currentChart) {
            currentChart = echarts.init(chartRef.current);
            setChartInstance(currentChart);
        }

        fetch('/files/pacific_geo.json')
            .then((response) => response.json())
            .then((indiaGeoJSON) => {
                echarts.registerMap('pacific', indiaGeoJSON);

                const options = {
                    tooltip: {
                        trigger: 'item',
                        formatter: (params: any) => `${params.name}: ${params.value || 0} sales`,
                        backgroundColor: themeColor.tooltipBackgroundColor,
                        borderColor: themeColor.tooltipBorderColor,
                        textStyle: {
                            color: themeColor.tooltipTextColor
                        }
                    },
                    visualMap: {
                        orient: 'horizontal',
                        left: 'center',
                        bottom: 0,
                        min: 0,
                        max: 9500,
                        inRange: {
                            color: ['#D3D3D3', '#EF4444', '#F59E0B', '#3B82F6', '#10B981'],
                        },
                        text: ['High', 'Low'],
                        textStyle: {
                            color: themeColor.chartTextColor
                        },
                        calculable: true,
                        itemStyle: {
                            color: themeColor.chartTextColor
                        }
                    },
                    grid: { top: 0, bottom: 40, left: 0, right: 0 },
                    series: [{
                        name: 'Sales',
                        type: 'map',
                        map: 'pacific',
                        roam: true,
                        center: [80, 20],
                        zoom: 5,
                        data: sampleSalesData,
                        itemStyle: {
                            areaColor: isDark ? '#374151' : '#D3D3D3',
                            borderColor: isDark ? '#475569' : '#FFFFFF',
                            borderWidth: 1,
                        },
                        emphasis: {
                            itemStyle: {
                                areaColor: themeColor.accent,
                            },
                            label: {
                                show: true,
                                color: themeColor.chartTextColor
                            },
                        },
                    }],
                };

                currentChart.setOption(options);
            })
            .catch(console.error);

        const resizeObserver = new ResizeObserver(() => {
            if (currentChart) {
                if (resizeTimeoutRef.current) {
                    clearTimeout(resizeTimeoutRef.current);
                }
                resizeTimeoutRef.current = setTimeout(() => {
                    currentChart.resize();
                    resizeTimeoutRef.current = null;
                }, 50);
            }
        });

        if (chartRef.current) {
            resizeObserver.observe(chartRef.current);
        }

        return () => {
            resizeObserver.disconnect();
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
                resizeTimeoutRef.current = null;
            }
        };
    }, [chartInstance, isClient, isDark]);

    return <div ref={chartRef} style={{ width: '100%', height }} />;
};