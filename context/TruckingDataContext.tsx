"use client";
import { getJotformData } from "@/util/fetchJotform";
import type { TruckingData } from "@/models/TruckingData";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { parseJotform } from "@/util/parseJotform";

const defaultTruckingDataContext: {
  data: TruckingData[];
  setData: (data: TruckingData[]) => void;
  selectedCampers: string[];
  setSelectedCampers: (camperName: string[]) => void;
  numOfBlanks: number;
  setNumOfBlanks: (numOfBlanks: number) => void;
  fromTo: "Return From" | "To";
  setFromTo: (fromTo: "Return From" | "To") => void;
} = {
  data: [],
  setData: () => null,
  selectedCampers: [],
  setSelectedCampers: () => null,
  numOfBlanks: 0,
  setNumOfBlanks: () => null,
  fromTo: "Return From",
  setFromTo: () => null,
};

export const TruckingDataContext = createContext(defaultTruckingDataContext);

export const TruckingDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initialTruckingData: TruckingData[] = [];
  const [data, setData] = useState(initialTruckingData);
  const [selectedCampers, setSelectedCampers] = useState<string[]>([]);
  const [numOfBlanks, setNumOfBlanks] = useState<number>(0);
  const [fromTo, setFromTo] = useState<"Return From" | "To">("Return From");

  useEffect(() => {
    getJotformData().then((data) => {
      setData(parseJotform(data));
    });
  }, []);
  return (
    <TruckingDataContext.Provider
      value={{
        data,
        setData,
        selectedCampers,
        setSelectedCampers,
        numOfBlanks,
        setNumOfBlanks,
        fromTo,
        setFromTo,
      }}
    >
      {children}
    </TruckingDataContext.Provider>
  );
};
