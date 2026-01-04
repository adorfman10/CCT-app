"use client";
import type { ReactNode } from "react";
import { useContext } from "react";
import { TruckingDataContext } from "@/context/TruckingDataContext";
import { MultiSelect } from "@/components/ui/multi-select";
import { Label } from "@/components/ui/label";

export const CamperSelector = (): ReactNode => {
  const { data, setSelectedCampers } = useContext(TruckingDataContext);
  const camperNames = data.flatMap((truckingData) => {
    return truckingData.campers.flatMap((camper) => {
      return {
        label: `${camper.firstName} ${camper.lastName}`,
        value: `${camper.firstName},${camper.lastName},${truckingData.address.line1}`,
      };
    });
  });
  return (
    <>
      <Label className="text-xs">Camper</Label>
      <MultiSelect
        options={camperNames}
        onValueChange={setSelectedCampers}
        placeholder="Select a camper"
        maxCount={5}
      />
    </>
  );
};
