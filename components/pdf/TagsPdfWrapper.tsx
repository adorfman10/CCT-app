"use client";
import type { ReactNode } from "react";
import { useContext, useEffect, useState } from "react";
import { TruckingDataContext } from "@/context/TruckingDataContext";
import type { TruckingData } from "@/models/TruckingData";
import type { TagInfo } from "./Tag";
import { Document, PDFViewer } from "@react-pdf/renderer";
import { MyPage } from "./Page";

const createTags = (
  data: TruckingData[],
  selectedCampers: string[],
  numOfBlanks: number
): (TagInfo | null)[] => {
  const allTags: (TagInfo | null)[] = data.flatMap((truckingData) => {
    return truckingData.campers.flatMap((camper) => {
      const tags: TagInfo[] = [];
      for (let i = 0; i < camper.numOfBags; i++) {
        tags.push({
          camper,
          address: truckingData.address,
          returnAddress: truckingData.returnAddress,
          phone: truckingData.cellPhone,
          truck: truckingData.route,
          stop: truckingData.stopNumber,
          returnTruck: truckingData.returnRoute ?? "",
          returnStop: truckingData.returnStopNumber ?? "",
        });
      }
      return tags;
    });
  });
  for (let i = 0; i < numOfBlanks; i++) {
    allTags.unshift(null);
  }
  if (selectedCampers.length > 0) {
    return allTags.filter(
      (tag) =>
        tag === null ||
        selectedCampers.includes(
          `${tag?.camper.firstName},${tag?.camper.lastName},${tag?.address.line1}`
        )
    );
  }
  return allTags;
};

function* chunks<T>(arr: T[], n: number): Generator<T[], void> {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

export const MyDocument = ({
  allTags,
}: {
  allTags: (TagInfo | null)[][];
}): ReactNode => {
  return (
    <Document>
      {allTags.map((onePageTags, i) => {
        return <MyPage tags={onePageTags} key={i} />;
      })}
    </Document>
  );
};

export const TagsPdfWrapper = (): ReactNode => {
  const { data, selectedCampers, numOfBlanks } =
    useContext(TruckingDataContext);
  const [tagsByPage, setTagsByPage] = useState<(TagInfo | null)[][]>([]);
  const [showPdf, setShowPdf] = useState<boolean>(true);
  useEffect(() => {
    setShowPdf(false);

    const tags = createTags(data, selectedCampers, numOfBlanks);
    const tagChunks = [...chunks(tags, 8)];
    setTagsByPage(tagChunks);
    setTimeout(() => setShowPdf(true), 10);
  }, [data, selectedCampers, numOfBlanks]);

  if (!showPdf) return <div>Loading ...</div>;

  return (
    <>
      <PDFViewer className="h-[80vh] w-full">
        <MyDocument allTags={tagsByPage} />
      </PDFViewer>
    </>
  );
};
