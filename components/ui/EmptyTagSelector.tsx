"use client";
import type { ReactNode } from "react";
import { useContext } from "react";
import { TruckingDataContext } from "@/context/TruckingDataContext";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const EmptyTagSelector = (): ReactNode => {
  const { numOfBlanks, setNumOfBlanks } = useContext(TruckingDataContext);
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-xs">Number of Blanks</Label>
      <Select
        value={`${numOfBlanks}`}
        onValueChange={(val) => setNumOfBlanks(parseInt(val))}
      >
        <SelectTrigger value={`${numOfBlanks}`} className="w-[60px]">
          <SelectValue>{numOfBlanks}</SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white border relative top-16 p-2 w-[60px] text-center cursor-pointer">
          <SelectGroup>
            <SelectItem value="0">0</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="6">6</SelectItem>
            <SelectItem value="7">7</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
