"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { BsCardText } from "react-icons/bs";

import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";

interface DataTableDemoProps {
    data: DataTable[];
}

export type DataTable = {
    id: string;
    eventName: {
        heading: string;
        text: string;
    };
    eventDate: string;
    bidFor:string;
    status: "pending" | "processing" | "success" | "failed";
};

export const columns: ColumnDef<DataTable>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                className="custom-checkbox data-[state=checked]:bg-blue-500"
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value: boolean) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="custom-checkbox"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "eventName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="text-[#344054]"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                   Event Name
                    <CaretSortIcon className="ml-2 h-6 w-6" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const orderNumber = row.getValue("eventName") as {
                heading: string;
                text: string;
            };
            return (
                <div className="w-full whitespace-nowrap">
                    <div className="font-medium text-[#101928]">
                        {orderNumber.heading}
                    </div>
                    <div className="text-sm text-[#475367]">{orderNumber.text}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "eventDate",
        header: "Event Date",
        cell: ({ row }) => (
            <div className="capitalize text-[#344054]">
                {row.getValue("eventDate")}
            </div>
        ),
    },
    {
        accessorKey: "bidFor",
        header: "Bid For",
        cell: ({ row }) => (
            <div className="capitalize text-[#344054]">
                {row.getValue("bidFor")}
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="text-[#344054]"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <CaretSortIcon className="ml-2 h-6 w-6" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const status = row.getValue("status");
            return (
                <>
                    <div
                        className={`w-fit rounded-full px-3 py-[2px] text-center text-sm font-medium lowercase ${status === "pending"
                                ? "bg-yellow-500/40 text-yellow-500"
                                : status === "pending"
                                    ? "bg-blue-500/40 text-blue-500"
                                    : status === "success"
                                        ? "bg-[#E7F6EC] text-[#099137]"
                                        : status === "failed"
                                            ? "bg-red-500/40 text-red-500"
                                            : ""
                            }`}
                    >
                        {row.getValue("status")}
                    </div>
                </>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const oders = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            size={"icon"}
                            className="h-8 w-8 border border-[#E4E7EC] p-0"
                        >
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            className="hover:bg-gray cursor-pointer"
                            onClick={() => navigator.clipboard.writeText(oders.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-gray cursor-pointer">
                            View customer
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gray cursor-pointer">
                            View payment details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export function DataTableDemo({ data }: DataTableDemoProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        [],
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full">
            {/* <div className=" space-y-3 py-2">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("guestName")?.getFilterValue() as string) ?? ""}
          onChange={(event: any) =>
            table.getColumn("guestName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white rounded-xl">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: any) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}

            <div className="satoshi w-full overflow-x-auto rounded-xl border">
                <Table className="w-full bg-[#FFFFFF]">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="whitespace-nowrap bg-[#F9FAFB] px-6 py-3 text-[#344054]"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="bg-[#FFFFFF]">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="whitespace-nowrap px-6 py-4 text-[#344054]"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 whitespace-nowrap text-center"
                                >
                                    <div className="flex flex-col items-center gap-3">
                                        <BsCardText size={30} />
                                        No Data yet.
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
