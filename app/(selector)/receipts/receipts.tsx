"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { ReceiptPdfWrapper } from "@/components/pdf/ReceiptsPdfWrapper";
import { TruckingDataContext } from "@/context/TruckingDataContext";
import { useContext, useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parseJotform } from "@/util/parseJotfrom";
import { jotformOptions } from "../jotform";
const FromToSelector = () => {
  const { fromTo, setFromTo } = useContext(TruckingDataContext);

  return (
    <div className="flex flex-col gap-1">
      <Label className="text-xs">To/From</Label>
      <Select
        value={`${fromTo}`}
        onValueChange={(val) => {
          setFromTo(val as "Return From" | "To");
        }}
      >
        <SelectTrigger value={`${fromTo}`} className="w-[80px]">
          <SelectValue>{fromTo}</SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white border relative top-16 p-2 w-[100px] text-center cursor-pointer">
          <SelectGroup>
            <SelectItem value="To">To</SelectItem>
            <SelectItem value="Return From">From</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
export const ReceiptsPage = () => {
  const { data } = useSuspenseQuery(jotformOptions);
  const { setData, numOfBlanks, selectedCampers } =
    useContext(TruckingDataContext);

  useEffect(() => {
    handleGetData();
  }, [numOfBlanks, selectedCampers]);

  const handleGetData = () => {
    const parsed = parseJotform(data);
    setData(parsed);
  };
  return (
    <>
      <FromToSelector />
      <ReceiptPdfWrapper />
    </>
  );
};
