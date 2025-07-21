/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import type { LineSeriesOption } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    MarkLineComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { getThemeColors } from '@/lib/chartUtils';
import { AxisLabelFormatterParams } from '@/types/chart';

// Register necessary ECharts components
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    CanvasRenderer,
    MarkLineComponent
]);

export interface BaseLineChartProps {
    titleText?: string;
    series: LineSeriesOption[];
    xAxisData?: string[] | number[];
    yAxisName?: string;
    isDarkMode: boolean;
    isClient: boolean;
    height?: string;
    additionalOptions?: echarts.EChartsCoreOption;
    tooltipFormatter?: (params: any | any[]) => string;
    yAxisLabelFormatter?: (value: AxisLabelFormatterParams) => string;
}

const BaseLineChart: React.FC<BaseLineChartProps> = ({
    titleText,
    series,
    xAxisData,
    yAxisName,
    isDarkMode,
    isClient,
    height = '320px',
    additionalOptions,
    tooltipFormatter,
    yAxisLabelFormatter,
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
                textStyle: { fontSize: 16, fontWeight: 'bold', color: themeColors.chartTextColor }
            } : undefined,
            tooltip: {
                trigger: 'axis',
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
                top: 0, bottom: 0, left: 0, right: 0,
                ...(additionalOptions?.grid || {})
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLabel: { color: themeColors.chartSubTextColor },
                axisLine: { lineStyle: { color: themeColors.chartAxisLineColor } },
                ...(additionalOptions?.xAxis || {})
            },
            yAxis: {
                type: 'value',
                nameTextStyle: { color: themeColors.chartSubTextColor, padding: [0, 0, 0, 50] },
                axisLabel: {
                    formatter: yAxisLabelFormatter || (() => `\${String(value)}`),
                    color: themeColors.chartSubTextColor
                },
                axisLine: { show: true, lineStyle: { color: themeColors.chartAxisLineColor } },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: themeColors.chartSplitLineColor
                    }
                },
                ...(additionalOptions?.yAxis || {})
            },
            series: series.map(s => ({
                type: 'line',
                symbol: 'circle',
                symbolSize: 6,
                lineStyle: { width: 2 },
                itemStyle: { },
                areaStyle: {
                    opacity: 0.1
                },
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
        series, titleText, xAxisData, yAxisName, 
        isDarkMode, isClient, height, additionalOptions, 
        tooltipFormatter, yAxisLabelFormatter, chartInstance, 
    ]);

    return <div ref={chartRef} style={{ width: '100%', height, visibility: isClient ? 'visible' : 'hidden' }} />;
};

export default BaseLineChart; 