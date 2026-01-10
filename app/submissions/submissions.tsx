"use client";

import { TruckingDataContext } from "@/context/TruckingDataContext";
import { TruckingData } from "@/models/TruckingData";
import { useContext, useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export default function SubmissionsPage({
  syncAction,
}: {
  syncAction: () => Promise<{ success: boolean; error?: string }>;
}) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{
    success: boolean;
    error?: string;
  } | null>(null);

  const handleSync = async () => {
    try {
      setIsSyncing(true);
      const result = await syncAction();
      setSyncResult(result);
    } catch (error) {
      console.error("Sync error:", error);
      setSyncResult({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to sync Jotform data",
      });
    } finally {
      setIsSyncing(false);
    }
  };
  const { data } = useContext(TruckingDataContext);
  const columnHelper = createColumnHelper<TruckingData>();

  const columns = [
    columnHelper.accessor("FamilyName", {
      header: "Family Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("campers", {
      header: "Campers",
      cell: ({ getValue }) =>
        getValue()
          .map((camper) => `${camper.firstName}`)
          .join(", "),
    }),
    columnHelper.accessor("address", {
      header: "Address",
      cell: ({ getValue }) => (
        <span>
          {getValue().line1}
          {getValue().line2 ? " " + getValue().line2 : ""}, {getValue().city},{" "}
          {getValue().state} {getValue().zip}
        </span>
      ),
    }),
    columnHelper.accessor("cellPhone", {
      header: "Cell Phone",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("homePhone", {
      header: "Home Phone",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("route", {
      header: "Route",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("returnRoute", {
      header: "Return Route",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("returnAddress", {
      header: "Return Address",
      cell: ({ getValue }) => (
        <span>
          {getValue()?.line1}
          {getValue()?.line2 ? " " + getValue()?.line2 : ""}, {getValue()?.city}
          , {getValue()?.state} {getValue()?.zip}
        </span>
      ),
    }),
    columnHelper.accessor("returnLocation", {
      header: "Return Location",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("pickUpLocation", {
      header: "Pick Up Location",
      cell: (info) => info.getValue(),
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <Button onClick={handleSync} disabled={isSyncing}>
          {isSyncing ? "Syncing..." : "Sync Jotform"}
        </Button>
        {syncResult && (
          <span
            className={`text-sm ${
              syncResult.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {syncResult.success
              ? "Sync successful!"
              : `Error: ${syncResult.error}`}
          </span>
        )}
      </div>
      <div className="border border-gray-300 bg-background">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-background">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-3 py-2 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider border border-gray-300"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="bg-background">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="whitespace-nowrap px-3 py-2 text-sm font-medium text-primary-foreground border border-gray-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
