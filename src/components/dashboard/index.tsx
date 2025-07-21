import React, { useMemo } from 'react'
import { useTheme } from 'next-themes';
import { CloudUpload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboardCards } from '@/constants/dashboardConstants';
import { 
    VisitorInsights, TotalRevenue, CustomerSatisfaction, 
    TargetVsReality, SalesMapCountry, VolumeVsService
} from '@/components/dashboard/chart-ui';
import { cn } from '@/lib/utils';
import { ProductsTable } from '@/components/tables';


const Dashboard: React.FC = () => {
    const { theme } = useTheme();
    const isDark = useMemo(()=> theme === 'dark', [theme]);
    const isClient = useMemo(() => typeof window !== 'undefined', []);

    return (
        <div className='grid grid-cols-12 gap-4 py-4'>
            <Card className='col-span-12 xl:col-span-8'>
                <CardHeader>
                    <CardTitle className='flex justify-between'>
                        <div className="card-header">
                            <h2 className='pb-2'>Today&apos;s Sales</h2>
                            <p className='font-light text-sm'>Sales Summary</p>
                        </div>
                        <Button variant="outline" >
                            <CloudUpload className='size-4' />
                            Export
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className='grid grid-cols-2 xl:grid-cols-4 gap-4'>
                    {dashboardCards.map((card) => (
                        <div
                            key={card.title}
                            className={cn('font-medium rounded-xl p-6', card.cardClassNames)}
                        >
                            <span className={cn('inline-flex size-10 rounded-full p-2 mb-5', card.iconClassNames)}>
                                <card.icon className='size-5 text-white m-auto' />
                            </span>
                            <h3 className='text-xl font-bold mb-2'>{card.value}</h3>
                            <p className='text-gray-600 dark:text-gray-300'>{card.description}</p>
                            <span className={cn('text-xs', card.trendClassNames)}>
                                {card.trend}
                            </span>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className='col-span-12 xl:col-span-4 gap-0'>
                <CardHeader>
                    <CardTitle>
                        <h2 className='pb-2'>Visitor Insights</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent className='w-full h-full'>
                    <VisitorInsights isDark={isDark} isClient={isClient} height='250px' />
                </CardContent>
            </Card>

            <Card className='col-span-12 xl:col-span-6 gap-0'>
                <CardHeader>
                    <CardTitle>
                        <h2 className='pb-2'>Total Revenue</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <TotalRevenue isDark={isDark} isClient={isClient} height='275px' />
                </CardContent>
            </Card>

            <Card className='col-span-12 lg:col-span-6 xl:col-span-3 gap-0'>
                <CardHeader>
                    <CardTitle>
                        <h2 className='pb-2'>Customer Satisfaction</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CustomerSatisfaction isDark={isDark} isClient={isClient} height='225px' />
                </CardContent>
            </Card>

            <Card className='col-span-12 lg:col-span-6 xl:col-span-3 gap-0'>
                <CardHeader>
                    <CardTitle>
                        <h2 className='pb-2'>Target vs Reality</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <TargetVsReality isDark={isDark} isClient={isClient} height='150px' />
                </CardContent>
            </Card>

            <Card className='col-span-12 xl:col-span-6 gap-0'>
                <CardHeader>
                    <CardTitle>
                        <h2 className='pb-2'>Top Products</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ProductsTable />
                </CardContent>
            </Card>

            <Card className='col-span-12 lg:col-span-6 xl:col-span-3 gap-0'>
                <CardHeader>
                    <CardTitle>
                        <h2 className='pb-2'>Sales Mapping by Country</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <SalesMapCountry isDark={isDark} isClient={isClient} height='300px' />
                </CardContent>
            </Card>

            <Card className='col-span-12 lg:col-span-6 xl:col-span-3 gap-0'>
                <CardHeader>
                    <CardTitle>
                        <h2 className='pb-2'>Volume vs Service Level</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <VolumeVsService isDark={isDark} isClient={isClient} height='240px' />
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
