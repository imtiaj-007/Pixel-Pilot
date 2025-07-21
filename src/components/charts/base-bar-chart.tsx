/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import type { BarSeriesOption } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { getThemeColors } from '@/lib/chartUtils';
import { AxisLabelFormatterParams } from '@/types/chart';


echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer
]);

export interface BaseBarChartProps {
    titleText?: string;
    series: BarSeriesOption[]; 
    isDarkMode: boolean;
    isClient: boolean;
    isHorizontal?: boolean;
    height?: string;
    additionalOptions?: echarts.EChartsCoreOption;
    tooltipFormatter?: (params: any | any[]) => string; 
    xAxisLabelFormatter?: (value: string | AxisLabelFormatterParams) => string;
    yAxisLabelFormatter?: (value: string | AxisLabelFormatterParams) => string;
    barLabelFormatter?: (params: any) => string; 
}

export const BaseBarChart: React.FC<BaseBarChartProps> = ({
    titleText,
    series,
    isDarkMode,
    isClient,
    isHorizontal = false,
    height = '320px',
    additionalOptions,
    tooltipFormatter,
    xAxisLabelFormatter,
    yAxisLabelFormatter,
    barLabelFormatter
}) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(null);
    const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isClient || !chartRef.current || !series || series.length === 0) {
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
                textStyle: { 
                    fontSize: 16, 
                    fontWeight: 'bold', 
                    color: themeColors.chartTextColor 
                }
            } : undefined,
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                backgroundColor: themeColors.tooltipBackgroundColor,
                borderColor: themeColors.tooltipBorderColor,
                textStyle: { color: themeColors.tooltipTextColor },
                formatter: tooltipFormatter
            },
            legend: {
                show: false,
                textStyle: { color: themeColors.chartSubTextColor },
                ...(additionalOptions?.legend || {})
            },
            grid: {
                containLabel: true,
                top: 10, bottom: 10,  left: 10,  right: 10,
                ...(additionalOptions?.grid || {})
            },
            xAxis: {
                type: isHorizontal ? 'value' : 'category',
                nameLocation: 'middle',
                nameTextStyle: { color: themeColors.chartSubTextColor },
                axisLabel: {
                    formatter: xAxisLabelFormatter,
                    color: themeColors.chartSubTextColor
                },
                splitLine: { 
                    show: isHorizontal, 
                    lineStyle: { 
                        type:'dashed', 
                        color: themeColors.chartSplitLineColor
                    } 
                },
                ...(additionalOptions?.xAxis || {})
            },
            yAxis: {
                type: isHorizontal ? 'category' : 'value',
                nameLocation: 'middle',
                nameTextStyle: { color: themeColors.chartSubTextColor }, 
                axisLabel: {
                    formatter: yAxisLabelFormatter,
                    color: themeColors.chartSubTextColor
                },
                splitLine: { 
                    show: !isHorizontal, 
                    lineStyle: { 
                        type:'dashed', 
                        color: themeColors.chartSplitLineColor
                    } 
                },
                ...(additionalOptions?.yAxis || {})
            },
            series: series.map((s, index) => ({
                type: 'bar',
                itemStyle: {
                    borderRadius: isHorizontal ? [0, 4, 4, 0] : [4, 4, 0, 0],
                    color: Array.isArray(s.color) ? undefined : (s.color || themeColors.categoryColors[index % themeColors.categoryColors.length])
                },
                label: barLabelFormatter ? { 
                    show: true, 
                    position: isHorizontal ? 'right' : 'top', 
                    formatter: barLabelFormatter, 
                    color: themeColors.chartTextColor 
                } : undefined,
                color: Array.isArray(s.color) ? s.color : undefined, 
                ...s
            }))
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
        series, height,
        titleText, additionalOptions,
        isDarkMode, isClient, isHorizontal,
        chartInstance,
        tooltipFormatter, barLabelFormatter,
        xAxisLabelFormatter, yAxisLabelFormatter         
    ]);

    return <div ref={chartRef} style={{ width: '100%', height, visibility: isClient ? 'visible' : 'hidden' }} />;
};