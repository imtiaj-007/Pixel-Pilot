// A more generic type for ECharts formatter callback parameters.
export interface FormatterCallbackParams {
    componentType?: 'series' | 'markPoint' | 'markLine' | 'markArea' | 'legend' | 'timeline' | 'tooltip' | 'title' | 'dataZoom' | 'visualMap' | 'toolbox' | 'graphic';
    seriesType?: string;
    seriesIndex?: number;
    seriesName?: string;
    name?: string;
    dataIndex?: number;
    data?: unknown;
    value?: unknown;
    color?: string;
    marker?: string;
    percent?: number;
    dimensionNames?: string[];
    encode?: object;
    $vars?: string[];
    axisDim?: string;
    axisIndex?: number;
    axisType?: string;
    axisId?: string;
    axisValue?: string | number;
    axisValueLabel?: string;
}

export type AxisLabelFormatterParams = string | number;

export interface ScatterPointData {
    name: string;
    value: [number, number];
}

export interface BarLabelCallbackParams extends FormatterCallbackParams {
    value: number;
    name: string;
}

export interface ChartEnvironmentProps {
    isDark: boolean;
    isClient: boolean;
    height?: string;
}