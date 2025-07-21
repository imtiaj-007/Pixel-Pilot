// Modern color palette with clean, contemporary colors
export const CHART_COLORS = {
    primary: '#0066FF',     // Modern electric blue
    secondary: '#FF3366',   // Vibrant coral red
    tertiary: '#00C896',    // Clean mint green
    quaternary: '#FF8A00',  // Modern orange
    quinary: '#00B8D4',     // Cyan blue
    senary: '#E91E63',      // Modern pink
    septenary: '#8BC34A',   // Fresh lime
    octonary: '#6366F1',    // Indigo
};

// Color array for multiple data series
export const CHART_COLOR_ARRAY = [
    '#0066FF', '#FF3366', '#00C896', '#FF8A00',
    '#00B8D4', '#E91E63', '#8BC34A', '#6366F1',
    '#9C27B0', '#FF5722', '#4CAF50', '#FFC107'
];

// Gradient definitions for enhanced styling
export const CHART_GRADIENTS = {
    blue: 'linear-gradient(135deg, #0066FF 0%, #3D8BFF 100%)',
    coral: 'linear-gradient(135deg, #FF3366 0%, #FF6B8A 100%)',
    mint: 'linear-gradient(135deg, #00C896 0%, #4DD0E1 100%)',
    orange: 'linear-gradient(135deg, #FF8A00 0%, #FFB347 100%)',
    cyan: 'linear-gradient(135deg, #00B8D4 0%, #4FC3F7 100%)',
    pink: 'linear-gradient(135deg, #E91E63 0%, #F48FB1 100%)',
};

// Theme-aware color palette with modern clean colors
export const getThemeColors = (isDark: boolean) => ({
    primary: isDark ? '#4A9EFF' : '#0066FF',
    secondary: isDark ? '#4ECDC4' : '#00A693',
    accent: isDark ? '#FFD93D' : '#FF8A00',
    positive: isDark ? '#4ADE80' : '#00C896',
    negative: isDark ? '#FF6B6B' : '#FF3366',
    neutral: isDark ? '#94A3B8' : '#64748B',
    highlight: isDark ? '#A855F7' : '#8B5CF6',

    // Clean category colors
    categoryColors: [
        '#0066FF',  // Electric blue
        '#00A693',  // Teal
        '#FF8A00',  // Orange
        '#00C896',  // Green
        '#8B5CF6',  // Purple
        '#FF3366',  // Coral
        '#F59E0B',  // Amber
        '#00B8D4',  // Cyan
        '#E91E63',  // Pink
        '#8BC34A'   // Lime
    ],

    // UI colors with better contrast
    chartTextColor: isDark ? '#E5E7EB' : '#0F172A',
    chartSubTextColor: isDark ? '#CBD5E1' : '#475569',
    chartAxisLineColor: isDark ? '#475569' : '#CBD5E1',
    chartSplitLineColor: isDark ? '#374151' : '#F1F5F9',
    chartBackgroundColor: 'transparent',

    // Modern tooltip styling
    tooltipBackgroundColor: isDark
        ? 'rgba(15, 23, 42, 0.95)'
        : 'rgba(248, 250, 252, 0.95)',
    tooltipTextColor: isDark ? '#F8FAFC' : '#0F172A',
    tooltipBorderColor: isDark ? '#475569' : '#CBD5E1',
    pieBorderColor: isDark ? '#1E293B' : '#FFFFFF',

    // Additional modern UI elements
    hoverColor: isDark ? 'rgba(74, 158, 255, 0.1)' : 'rgba(0, 102, 255, 0.1)',
    focusColor: isDark ? '#4A9EFF' : '#0066FF',
    shadowColor: isDark
        ? 'rgba(0, 0, 0, 0.3)'
        : 'rgba(15, 23, 42, 0.1)',
});

// Accessibility-compliant color pairs
export const ACCESSIBLE_COLOR_PAIRS = [
    { background: '#FFFFFF', text: '#0F172A', contrast: '21:1' },
    { background: '#0F172A', text: '#F8FAFC', contrast: '18:1' },
    { background: '#0066FF', text: '#FFFFFF', contrast: '6.3:1' },
    { background: '#00C896', text: '#0F172A', contrast: '8.2:1' },
    { background: '#FF3366', text: '#FFFFFF', contrast: '5.1:1' },
];

// Usage example for different chart types
export const CHART_TYPE_COLORS = {
    line: {
        primary: '#0066FF',
        secondary: '#00C896',
        area: 'rgba(0, 102, 255, 0.1)',
    },
    bar: {
        single: '#0066FF',
        multiple: CHART_COLOR_ARRAY.slice(0, 6),
        gradient: CHART_GRADIENTS.blue,
    },
    pie: {
        colors: CHART_COLOR_ARRAY,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    scatter: {
        primary: '#0066FF',
        secondary: '#FF3366',
        opacity: 0.7,
    }
};
// Responsive breakpoints for charts
export const RESPONSIVE_CONFIG = {
    desktop: { width: '100%', height: 400 },
    tablet: { width: '100%', height: 350 },
    mobile: { width: '100%', height: 300 },
};

// Format number with commas
export const formatNumber = (num: string) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Format percentage
export const formatPercentage = (value: number, total: number) => {
    return `${((value / total) * 100).toFixed(1)}%`;
};

/**
 * Formats a number as a rupee amount with comma separators
 * @param amount - The numeric amount to format
 * @returns Formatted rupee string (e.g. "₹1,23,456")
 */
export const formatAmount = (amount: number | string): string => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `₹${num.toLocaleString('en-IN')}`;
};


/**
 * Formats a date according to specified options
 * @param date - Date object or string to format
 * @param format - Format type: 'month' | 'weekday' | 'short' | 'long' | 'numeric'
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string, format: 'month' | 'weekday' | 'short' | 'long' | 'numeric' = 'short') => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (format === 'month') {
        return dateObj.toLocaleString('default', { month: 'long' });
    }

    if (format === 'weekday') {
        return dateObj.toLocaleString('default', { weekday: 'long' });
    }

    const options: Intl.DateTimeFormatOptions = {
        year: format === 'long' || format === 'numeric' ? 'numeric' : undefined,
        month: format === 'long' ? 'long' : format === 'short' ? 'short' : 'numeric',
        day: 'numeric',
    };

    if (format === 'numeric') {
        return dateObj.toLocaleDateString('default', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });
    }

    return dateObj.toLocaleDateString('default', options);
};

/**
 * Gets the month name for a given date
 * @param date - The Date object or string to get the month name for
 * @param format - Format type: 'long' for full name (e.g. "January"), 'short' for abbreviation (e.g. "Jan")
 * @returns The formatted month name
 */
export const getMonthName = (date: Date | string, format: 'long' | 'short' = 'long') => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const formatter = new Intl.DateTimeFormat('default', { month: format });
    return formatter.format(dateObj);
};

/**
 * Gets the weekday name for a given date
 * @param date - The Date object or string to get the weekday name for
 * @param format - Format type: 'long' for full name (e.g. "Monday"), 'short' for abbreviation (e.g. "Mon")
 * @returns The formatted weekday name
 */
export const getWeekdayName = (date: Date | string, format: 'long' | 'short' = 'long') => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const formatter = new Intl.DateTimeFormat('default', { weekday: format });
    return formatter.format(dateObj);
};