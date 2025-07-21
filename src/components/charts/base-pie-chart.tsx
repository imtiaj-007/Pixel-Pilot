/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import type { PieSeriesOption } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { getThemeColors } from '@/lib/chartUtils';

echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer
]);


export interface BasePieChartDataItem {
    name: string;
    value: number;
    itemStyle?: PieSeriesOption['itemStyle'];
}

export interface BasePieChartProps {
    titleText?: string;
    series: PieSeriesOption;
    seriesData: BasePieChartDataItem[];
    isDarkMode: boolean;
    isClient: boolean;
    height?: string;
    additionalOptions?: echarts.EChartsCoreOption;
    labelFormatter?: (params: any) => string;
    tooltipFormatter?: (params: any) => string;
    legendFormatter?: (name: string) => string;
}

const BasePieChart: React.FC<BasePieChartProps> = ({
    titleText,
    series,
    seriesData,
    isDarkMode,
    isClient,
    height = '320px',
    additionalOptions,
    labelFormatter,
    tooltipFormatter,
    legendFormatter
}) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(null);
    const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isClient || !chartRef.current || !seriesData || seriesData.length === 0) {
            if (chartInstance) {
                chartInstance.dispose();
                setChartInstance(null);
            }
            return;
        }

        const themeColors = getThemeColors(isDarkMode);
        let currentChart = chartInstance;

        if (!currentChart) {
            currentChart = echarts.init(chartRef.current);
            setChartInstance(currentChart);
        }

        const defaultOptions: echarts.EChartsCoreOption = {
            backgroundColor: themeColors.chartBackgroundColor,
            title: titleText ? {
                text: titleText,
                left: 'center',
                top: 10,
                textStyle: { fontSize: 16, fontWeight: 'bold', color: themeColors.chartTextColor }
            } : undefined,
            tooltip: {
                trigger: 'item',
                backgroundColor: themeColors.tooltipBackgroundColor,
                borderColor: themeColors.tooltipBorderColor,
                textStyle: { color: themeColors.tooltipTextColor },
                formatter: tooltipFormatter
            },
            legend: {
                orient: 'horizontal',
                bottom: 10,
                itemWidth: 12,
                itemHeight: 12,
                icon: 'square',
                textStyle: { color: themeColors.chartTextColor },
                formatter: legendFormatter ?? undefined,
                data: seriesData.map(item => item.name),
                ...(additionalOptions?.legend || {})
            },
            series: {
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: themeColors.pieBorderColor,
                    borderWidth: 2
                },
                label: {
                    show: false,
                    formatter: labelFormatter || undefined,
                    color: themeColors.chartTextColor
                },
                labelLine: { show: false },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: themeColors.chartTextColor
                    },
                },
                color: themeColors.categoryColors,
                ...series
            }
        };

        const finalOptions = echarts.util.merge(defaultOptions, additionalOptions || {} as echarts.EChartsCoreOption) as echarts.EChartsCoreOption;
        currentChart.setOption(finalOptions);

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
    }, [
        series, seriesData, titleText,
        isDarkMode, isClient, height, additionalOptions,
        labelFormatter, tooltipFormatter, legendFormatter, chartInstance,
    ]);

    return <div ref={chartRef} style={{ width: '100%', height, visibility: isClient ? 'visible' : 'hidden' }} />;
};

export default BasePieChart; 