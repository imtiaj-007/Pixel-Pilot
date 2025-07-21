import React, { useState } from 'react';
import { ArrowUpDown, ChevronDown, MoreHorizontal, Star } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import {
    ColumnDef, ColumnFiltersState, flexRender, SortingState, VisibilityState,
    getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable,
} from "@tanstack/react-table";
import {
    DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { percentageBGColor, percentageLightBGWithBorder } from '@/lib/utils';


export interface ProductsData {
    id: string;
    name: string;
    category: string;
    rating: number;
    sales: number;
    popularity: number;
};

export const columns: ColumnDef<ProductsData>[] = [
    {
        accessorKey: "id",
        header: "#",
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "rating",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Rating
                    <ArrowUpDown className="size-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const rating = row.getValue("rating") as number;
            const percentage = Math.round((rating / 5) * 100);
            const bgColor = percentageLightBGWithBorder(percentage);

            return (
            <div className="w-full flex">
                <Badge variant="outline" className={`m-auto ${bgColor}`}>
                    <Star className='size-4 text-amber-400 fill-amber-400' />
                    {rating}
                </Badge>
            </div>
        )},
    },
    {
        accessorKey: "sales",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Sales
                    <ArrowUpDown className="size-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className='text-center'>{row.getValue("sales")}</div>,
    },
    {
        accessorKey: "popularity",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Popularity
                    <ArrowUpDown className="size-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const popularity = row.getValue("popularity") as number;
            const maxPopularity = 35;
            const percentage = Math.min(100, Math.round((popularity / maxPopularity) * 100));
            const bgColor = percentageBGColor(percentage);
            
            return (
                <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-300 rounded-full h-1.5">
                        <div 
                            className={`h-1.5 rounded-full ${bgColor}`}
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                    <span className="text-xs">{popularity}%</span>
                </div>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="size-7 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View product</DropdownMenuItem>
                        <DropdownMenuItem>View stock</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];

const productsData: ProductsData[] = [
    { id: '01', name: 'iPhone 15 Pro', category: 'SmartPhones', rating: 4.9, sales: 1200, popularity: 35 },
    { id: '02', name: 'MacBook Air M2', category: 'Laptops', rating: 4.7, sales: 850, popularity: 24 },
    { id: '03', name: 'AirPods Pro', category: 'Audio', rating: 4.6, sales: 1500, popularity: 19 },
    { id: '04', name: 'iPad Pro', category: 'Tablets', rating: 4.5, sales: 650, popularity: 15 },
];

export const ProductsTable: React.FC = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const table = useReactTable({
        data: productsData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter products..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-md border border-blue-500">
                <Table className='text-sm'>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className='text-accent-foreground'>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="text-xs font-medium"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
