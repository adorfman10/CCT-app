"use client";
import { useContext, useEffect } from "react";
import { jotformOptions } from "../jotform";
import { useSuspenseQuery } from "@tanstack/react-query";
import { TruckingDataContext } from "@/context/TruckingDataContext";
import { parseJotform } from "@/util/parseJotfrom";
import { syncJotform } from "@/util/syncJotform";
import { Button } from "@/components/ui/button";
import { TagsPdfWrapper } from "@/components/pdf/TagsPdfWrapper";

export const LabelsPage = () => {
  const { data } = useSuspenseQuery(jotformOptions);
  const { setData, numOfBlanks, selectedCampers } =
    useContext(TruckingDataContext);
  useEffect(() => {
    handleGetData();
  }, [numOfBlanks, selectedCampers]);

  const handleGetData = () => {
    const parsed = parseJotform(data);
    // syncJotform(data);
    console.log("parsed", parsed);
    setData(parsed);
  };
  return (
    <>
      <Button onClick={handleGetData} className="my-4">
        Sync Data
      </Button>
      <TagsPdfWrapper />;
    </>
  );
};
