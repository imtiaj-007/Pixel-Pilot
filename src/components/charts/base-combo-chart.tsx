/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { AlertCircle, Bug, X } from 'lucide-react';
import { getThemeColors } from '@/lib/chartUtils';

// Register necessary ECharts components
echarts.use([
    BarChart,
    LineChart,
    PieChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    CanvasRenderer,
]);

export type SeriesType = 'bar' | 'line' | 'pie' | 'scatter';

export interface CombinedSeries {
    name: string;
    data: number[];
    type: SeriesType;
    color?: string;
    stack?: string;
    smooth?: boolean;
    lineStyle?: {
        width?: number;
        type?: 'solid' | 'dashed' | 'dotted';
        color?: string;
        opacity?: number;
    };
    itemStyle?: {
        color?: string;
        borderColor?: string;
        borderWidth?: number;
        borderType?: 'solid' | 'dashed' | 'dotted';
        opacity?: number;
    };
}

interface DebugInfo {
    timestamp: string;
    level: 'info' | 'warn' | 'error';
    message: string;
    data?: any;
}

interface BaseCombinedChartProps {
    series: CombinedSeries[];
    xAxisData?: string[] | number[]; 
    yAxisData?: string[] | number[]; 
    xAxisName?: string;
    yAxisName?: string;
    isDarkMode: boolean;
    height?: string;
    titleText?: string;
    legendData?: string[];
    tooltipFormatter?: (params: any | any[]) => string; 
    xAxisLabelFormatter?: (value: string | any) => string;
    yAxisLabelFormatter?: (value: string | any) => string;
    additionalOptions?: echarts.EChartsCoreOption;
    // Debug props
    enableDebug?: boolean;
    showDebugPanel?: boolean;
    onDebugInfo?: (info: DebugInfo) => void;
}

const BaseCombinedChart: React.FC<BaseCombinedChartProps> = ({
    series,
    xAxisData,
    yAxisData,
    xAxisName,
    yAxisName,
    isDarkMode,
    height = '320px',
    titleText,
    legendData,
    tooltipFormatter,
    xAxisLabelFormatter,
    yAxisLabelFormatter,
    additionalOptions,
    enableDebug = process.env.NODE_ENV === 'development',
    showDebugPanel = false,
    onDebugInfo
}) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(null);
    const [debugLogs, setDebugLogs] = useState<DebugInfo[]>([]);
    const [showDebug, setShowDebug] = useState(showDebugPanel);
    const [chartStatus, setChartStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const log = useCallback((level: 'info' | 'warn' | 'error', message: string, data?: any) => {
        if (!enableDebug) return;
        
        const debugInfo: DebugInfo = {
            timestamp: new Date().toISOString(),
            level,
            message,
            data
        };        
        setDebugLogs(prev => [...prev.slice(-19), debugInfo]);
        onDebugInfo?.(debugInfo);
    }, [enableDebug, onDebugInfo]);

    const validateData = useCallback(() => {
        const issues: string[] = [];

        // Check series data
        if (!series || series.length === 0) {
            issues.push('No series data provided');
        } else {
            series.forEach((s, index) => {
                if (!s.name) issues.push(`Series ${index} missing name`);
                if (!s.data || !Array.isArray(s.data)) {
                    issues.push(`Series ${index} (${s.name}) has invalid data array`);
                } else if (s.data.length === 0) {
                    issues.push(`Series ${index} (${s.name}) has empty data array`);
                } else {
                    // Check for non-numeric values
                    const invalidValues = s.data.filter(val => typeof val !== 'number' || isNaN(val));
                    if (invalidValues.length > 0) {
                        issues.push(`Series ${index} (${s.name}) contains ${invalidValues.length} non-numeric values`);
                    }
                }
            });
        }

        // Check axis data consistency
        if (xAxisData && series.length > 0) {
            const dataLength = series[0].data.length;
            if (xAxisData.length !== dataLength) {
                issues.push(`X-axis data length (${xAxisData.length}) doesn't match series data length (${dataLength})`);
            }
        }

        return issues;
    }, [series, xAxisData]);

    useEffect(() => {
        log('info', 'Chart useEffect triggered', {
            seriesCount: series?.length || 0,
            xAxisDataLength: xAxisData?.length || 0,
            yAxisDataLength: yAxisData?.length || 0,
            isDarkMode,
            height
        });

        if (!chartRef.current) {
            log('error', 'Chart ref is null - DOM element not available');
            setChartStatus('error');
            return;
        }

        // Validate data
        const validationIssues = validateData();
        if (validationIssues.length > 0) {
            log('error', 'Data validation failed', validationIssues);
            setChartStatus('error');
            return;
        }
        
        let currentChart = chartInstance;
        const themeColors = getThemeColors(isDarkMode);
        const isHorizontal = !!yAxisData && !xAxisData;

        try {
            if (!currentChart) {
                log('info', 'Initializing new chart instance');
                currentChart = echarts.init(chartRef.current);
                setChartInstance(currentChart);
            }

            log('info', 'Chart configuration', {
                isHorizontal,
                themeColors: Object.keys(themeColors),
                seriesTypes: series.map(s => s.type)
            });

            const defaultOptions: echarts.EChartsCoreOption = {
                backgroundColor: themeColors.chartBackgroundColor,
                title: {
                    text: titleText,
                    left: 'center',
                    textStyle: { fontSize: 16, fontWeight: 'bold', color: themeColors.chartTextColor }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' },
                    backgroundColor: themeColors.tooltipBackgroundColor,
                    borderColor: themeColors.tooltipBorderColor,
                    textStyle: { color: themeColors.tooltipTextColor },
                    formatter: tooltipFormatter
                },
                legend: legendData && legendData.length > 0 ? {
                    data: legendData,
                    top: 30,
                    textStyle: { color: themeColors.chartSubTextColor }
                } : undefined,
                grid: {
                    top: legendData && legendData.length > 0 ? 70 : 50,
                    bottom: 50, 
                    left: 60, 
                    right: 40,
                    containLabel: true 
                },
                xAxis: {
                    type: isHorizontal ? 'value' : 'category',
                    data: isHorizontal ? undefined : xAxisData,
                    name: xAxisName,
                    nameLocation: 'middle',
                    nameGap: 30,
                    nameTextStyle: { color: themeColors.chartSubTextColor },
                    axisLabel: {
                        formatter: xAxisLabelFormatter,
                        color: themeColors.chartSubTextColor
                    },
                    axisLine: { lineStyle: { color: themeColors.chartAxisLineColor } },
                    splitLine: { show: isHorizontal, lineStyle: { type:'dashed', color: themeColors.chartSplitLineColor} }
                },
                yAxis: {
                    type: isHorizontal ? 'category' : 'value',
                    data: isHorizontal ? yAxisData : undefined,
                    name: yAxisName,
                    nameLocation: 'middle',
                    nameGap: isHorizontal && yAxisName ? (yAxisName.length * 6 + 20) : 45,
                    nameTextStyle: { color: themeColors.chartSubTextColor }, 
                    axisLabel: {
                        formatter: yAxisLabelFormatter,
                        color: themeColors.chartSubTextColor
                    },
                    axisLine: { show:true, lineStyle: { color: themeColors.chartAxisLineColor } },
                    splitLine: { show: !isHorizontal, lineStyle: { type:'dashed', color: themeColors.chartSplitLineColor} }
                },
                series: series.map((s, index) => ({
                    name: s.name,
                    data: s.data,
                    type: s.type,
                    stack: s.stack,
                    smooth: s.smooth,
                    ...(s.lineStyle ? { lineStyle: s.lineStyle } : {}),
                    ...(s.itemStyle ? { itemStyle: s.itemStyle } : {
                        itemStyle: {                        
                            color: Array.isArray(s.color) ? undefined : (s.color || themeColors.categoryColors[index % themeColors.categoryColors.length])
                        }
                    }),
                })),
            };

            const finalOptions = echarts.util.merge(defaultOptions, additionalOptions || {} as echarts.EChartsCoreOption) as echarts.EChartsCoreOption;
            
            log('info', 'Setting chart options', {
                seriesCount: Array.isArray(finalOptions.series) ? finalOptions.series.length : 0,
                hasXAxis: !!finalOptions.xAxis,
                hasYAxis: !!finalOptions.yAxis
            });

            currentChart.setOption(finalOptions);
            setChartStatus('success');
            log('info', 'Chart rendered successfully');

        } catch (error) {
            log('error', 'Error rendering chart', error);
            setChartStatus('error');
        }

        const resizeObserver = new ResizeObserver(() => {
            if (currentChart) {
                if (resizeTimeoutRef.current) {
                    clearTimeout(resizeTimeoutRef.current);
                }            
                resizeTimeoutRef.current = setTimeout(() => {
                    currentChart.resize();
                    resizeTimeoutRef.current = null;
                    log('info', 'Chart resized');
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
                log('info', 'Chart disposed');
            }
        };
    }, [
        series, height, xAxisName, xAxisData, yAxisName, yAxisData, 
        isDarkMode, titleText, legendData, additionalOptions, chartInstance,
        xAxisLabelFormatter, yAxisLabelFormatter, log, validateData, tooltipFormatter
    ]);   

    return (
        <div className="relative w-full" style={{ height }}>
            <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
            
            {/* Debug toggle button */}
            {enableDebug && (
                <button
                    onClick={() => setShowDebug(!showDebug)}
                    className="absolute top-2 left-2 z-10 p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                    title="Toggle Debug Panel"
                >
                    <Bug className="h-4 w-4" />
                </button>
            )}
            
            {/* Debug panel */}
            {enableDebug && showDebug && <DebugPanel chartStatus={chartStatus} setShowDebug={setShowDebug} debugLogs={debugLogs} />}
            
            {/* Error state */}
            {chartStatus === 'error' && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-50 dark:bg-red-900/20">
                    <div className="text-center">
                        <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                        <p className="text-red-700 dark:text-red-400 font-medium">Chart failed to render</p>
                        <p className="text-red-600 dark:text-red-500 text-sm">Check debug panel for details</p>
                    </div>
                </div>
            )}
        </div>
    );
};

interface DebugPanelProps {
    chartStatus: 'loading' | 'success' | 'error';
    debugLogs: DebugInfo[];
    setShowDebug: (show: boolean) => void;
}

const DebugPanel: React.FC<DebugPanelProps> = ({ chartStatus, debugLogs, setShowDebug }) => (
    <div className="absolute top-2 left-12 z-10 bg-white dark:bg-gray-800 border rounded-lg shadow-lg w-md">
        <div className="flex items-center justify-between p-2 border-b">
            <div className="flex items-center gap-2">
                <Bug className="h-4 w-4" />
                <span className="text-sm font-medium">Debug Panel</span>
                <span className={`px-2 py-1 rounded text-xs ${
                    chartStatus === 'success' ? 'bg-green-100 text-green-800' :
                    chartStatus === 'error' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                }`}>
                    {chartStatus}
                </span>
            </div>
            <button onClick={() => setShowDebug(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <X className="h-4 w-4" />
            </button>
        </div>
        <div className="p-2 max-h-72 overflow-y-auto">
            <div className="space-y-2">
                {debugLogs.slice(-10).map((log, index) => (
                    <div key={index} className={`text-xs p-2 rounded ${
                        log.level === 'error' ? 'bg-red-50 text-red-700' :
                        log.level === 'warn' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-blue-50 text-blue-700'
                    }`}>
                        <div className="font-mono">
                            {new Date(log.timestamp).toLocaleTimeString()}: {log.message}
                        </div>
                        {log.data && (
                            <pre className="mt-1 text-xs overflow-x-auto">
                                {JSON.stringify(log.data, null, 1)}
                            </pre>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default BaseCombinedChart;