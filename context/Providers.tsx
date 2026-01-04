"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/util/getQueryClient";
import type * as React from "react";
import { TruckingDataProvider } from "@/context/TruckingDataContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TruckingDataProvider>
        {children}
        <ReactQueryDevtools />
      </TruckingDataProvider>
    </QueryClientProvider>
  );
}
