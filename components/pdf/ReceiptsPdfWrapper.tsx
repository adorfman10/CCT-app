"use client";
import {
  Document,
  PDFViewer,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { useContext, useEffect, useState } from "react";
import { TruckingDataContext } from "@/context/TruckingDataContext";
import type { Address, Camper, TruckingData } from "@/models/TruckingData";

const styles = StyleSheet.create({
  page: {
    // paddingTop: '1in',
    paddingHorizontal: ".75in",
    // paddingBottom: '1in',
    fontFamily: "Helvetica",
    fontSize: 12,
  },
  titleHeader: {
    display: "flex",
    paddingTop: 12,
    alignItems: "center",
    fontFamily: "Helvetica-Bold",
    textDecoration: "underline",
  },
  date: {
    fontFamily: "Helvetica-Bold",
  },
});

const Header = ({
  type,
  route,
  stop,
  fromTo,
}: {
  type: "Parent" | "Driver";
  route: string;
  stop: string;
  fromTo: "Return From" | "To";
}) => (
  <>
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        textDecoration: "underline",
      }}
    >
      <Text style={{ width: "300", marginRight: "auto" }}>
        <Text style={{ fontFamily: "Helvetica-Bold" }}>Route:</Text> {route}
      </Text>
      <Text
        style={{
          width: "300",
          fontFamily: "Helvetica-Bold",
          textAlign: "center",
        }}
      >
        {type} Copy
      </Text>
      <Text style={{ width: "300", marginLeft: "auto", textAlign: "right" }}>
        <Text style={{ fontFamily: "Helvetica-Bold" }}>Stop:</Text> {stop}
      </Text>
    </View>
    <View style={styles.titleHeader}>
      <Text>Century Camp Trucking</Text>
      <Text style={{ textDecoration: "underline line-through" }}>
        561-200-5020
      </Text>
      <Text>Baggage {fromTo} Camp Receipt</Text>
    </View>
    <View style={{ display: "flex", flexDirection: "row" }}>
      <Text style={styles.date}>Date: </Text>
      <Text style={[styles.date, { textDecoration: "underline" }]}>
        08/____/25
      </Text>
    </View>
  </>
);

const FamilyInfo = ({
  lastName,
  camperNames,
  address,
}: {
  lastName: string;
  camperNames: string[];
  address: Address;
}) => (
  <>
    <View style={{ paddingTop: "16px", fontFamily: "Helvetica-Bold" }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text>{lastName}, </Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          {camperNames.map((firstName, i) => (
            <Text key={i}>
              {firstName}
              {i < camperNames.length - 1 ? ", " : ""}
            </Text>
          ))}
        </View>
      </View>
      <Text>
        {address.line1} {address.line2}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>
          {address.city}, {address.state} {address.zip}
        </Text>
        <Text>Received by __________________</Text>
      </View>
    </View>
  </>
);

const Divider = ({ bold }: { bold?: boolean }) => {
  const borderTop = bold ? 2 : 1;
  const paddingTop = bold ? "0" : "20";
  const paddingBottom = bold ? "0" : "20";
  // const height = bold ? '80' : '40'
  return (
    <>
      <View style={{ paddingTop, paddingBottom, height: 2, width: "100%" }}>
        <View style={{ width: "100%", borderTop }} />
      </View>
    </>
  );
};

const Instructions = ({
  homePhone,
  cellPhone,
  returnLocation,
  pickUpLocation,
  specialInstructions,
  crossStreet,
  fromTo,
}: {
  specialInstructions: string | undefined;
  crossStreet: string | undefined;
  homePhone: string;
  cellPhone: string;
  pickUpLocation: string | undefined;
  returnLocation: string | undefined;
  fromTo: "Return From" | "To";
}) => (
  <>
    <View>
      <Text>
        <Text style={{ fontFamily: "Helvetica-Bold" }}>Home Phone:</Text>{" "}
        {homePhone}
        {"     "}
        <Text style={{ fontFamily: "Helvetica-Bold" }}>Cell Phone:</Text>{" "}
        {cellPhone}
      </Text>
      <Text style={{ paddingTop: "4px", textDecoration: "underline" }}>
        Driving Instructions/Cross Streets/Landmarks
      </Text>
      {specialInstructions ? (
        <Text style={{ paddingTop: "4px", fontSize: "10px" }}>
          {specialInstructions}
        </Text>
      ) : (
        <></>
      )}
      {crossStreet ? (
        <Text style={{ paddingTop: "4px", fontSize: "10px" }}>
          Cross Street: {crossStreet}
        </Text>
      ) : (
        <></>
      )}
      {fromTo === "Return From" ? (
        <Text style={{ paddingTop: "4px", fontSize: "10px" }}>
          If no one is home return bags to: {returnLocation}
        </Text>
      ) : (
        <Text style={{ paddingTop: "4px", fontSize: "10px" }}>
          If no one is home pick up bags from: {pickUpLocation}
        </Text>
      )}
      <Text style={{ paddingTop: "16px" }}>Number of pieces: ______</Text>
    </View>
  </>
);

type ReceiptInfo = {
  pickUpAddress: Address;
  returnAddress?: Address;
  homePhone: string;
  cellPhone: string;
  route: string;
  stop: string;
  returnRoute: string | null;
  returnStop: string | null;
  pickUpLocation: string;
  returnLocation: string;
  campers: Camper[];
};

const checkOverlap = (arr1: any[], arr2: any[]) => {
  const set2 = new Set(arr2);
  return arr1.some((item) => set2.has(item));
};

const createReceipts = (
  data: TruckingData[],
  selectedCampers: string[]
): ReceiptInfo[] => {
  return data
    .map((submission) => {
      return {
        pickUpAddress: submission.address,
        returnAddress: submission.returnAddress,
        homePhone: submission.homePhone,
        cellPhone: submission.cellPhone,
        route: submission.route,
        stop: submission.stopNumber,
        returnRoute: submission.returnRoute,
        returnStop: submission.returnStopNumber,
        pickUpLocation: submission.pickUpLocation,
        returnLocation: submission.returnLocation,
        campers: submission.campers,
      };
    })
    .filter((receiptInfo: ReceiptInfo) => {
      if (selectedCampers.length === 0) return true;
      const lastNames = selectedCampers.map(
        (selectedCamper) => selectedCamper.split(",")[1]
      );
      return checkOverlap(
        lastNames,
        receiptInfo.campers.map((camper) => camper.lastName)
      );
    });
};

export const ReceiptDocument = ({
  allReceipts,
  fromTo,
}: {
  allReceipts: ReceiptInfo[];
  fromTo: "Return From" | "To";
}) => {
  return (
    <Document>
      {allReceipts
        .filter((receiptInfo) => {
          if (fromTo === "To") {
            return receiptInfo.route !== "";
          }
          return true;
        })
        .map((receiptInfo, i) => {
          const address =
            fromTo === "Return From"
              ? receiptInfo.returnAddress?.line1
                ? receiptInfo.returnAddress!
                : receiptInfo.pickUpAddress
              : receiptInfo.pickUpAddress;

          const returnRoute =
            receiptInfo.returnRoute !== undefined &&
            receiptInfo.returnRoute !== ""
              ? receiptInfo.returnRoute
              : receiptInfo.route;

          const returnStop =
            receiptInfo.returnStop !== undefined &&
            receiptInfo.returnStop !== ""
              ? receiptInfo.returnStop
              : receiptInfo.stop;

          const route =
            fromTo === "Return From" ? returnRoute ?? "" : receiptInfo.route;
          const stop =
            fromTo === "Return From" ? returnStop ?? "" : receiptInfo.stop;

          return (
            <Page key={i} size="LETTER" style={styles.page}>
              <View style={{ height: "395", justifyContent: "center" }}>
                <Header
                  type="Driver"
                  route={route}
                  stop={stop}
                  fromTo={fromTo}
                />
                <FamilyInfo
                  address={address}
                  camperNames={receiptInfo.campers.map(
                    (camper) => camper.firstName
                  )}
                  lastName={receiptInfo.campers[0].lastName}
                />
                <Divider />
                <Instructions
                  homePhone={receiptInfo.homePhone}
                  cellPhone={receiptInfo.cellPhone}
                  returnLocation={receiptInfo.returnLocation}
                  pickUpLocation={receiptInfo.pickUpLocation}
                  specialInstructions={
                    receiptInfo.pickUpAddress.specialInstructions
                  }
                  crossStreet={receiptInfo.pickUpAddress.crossStreet}
                  fromTo={fromTo}
                />
              </View>
              <Divider bold={true} />
              <View style={{ height: "395", justifyContent: "center" }}>
                <Header
                  type="Parent"
                  route={route}
                  stop={stop}
                  fromTo={fromTo}
                />
                <FamilyInfo
                  address={address}
                  camperNames={receiptInfo.campers.map(
                    (camper) => camper.firstName
                  )}
                  lastName={receiptInfo.campers[0].lastName}
                />
                <Divider />
                <Instructions
                  homePhone={receiptInfo.homePhone}
                  cellPhone={receiptInfo.cellPhone}
                  returnLocation={receiptInfo.returnLocation}
                  pickUpLocation={receiptInfo.pickUpLocation}
                  specialInstructions={
                    receiptInfo.pickUpAddress.specialInstructions
                  }
                  crossStreet={receiptInfo.pickUpAddress.crossStreet}
                  fromTo={fromTo}
                />
              </View>
            </Page>
          );
        })}
    </Document>
  );
};

export const ReceiptPdfWrapper = () => {
  const { data, selectedCampers, fromTo } = useContext(TruckingDataContext);
  const [allReceipts, setAllReceipts] = useState<ReceiptInfo[]>([]);
  const [showPdf, setShowPdf] = useState<boolean>(true);
  useEffect(() => {
    setShowPdf(false);
    const receipts = createReceipts(data, selectedCampers);
    setAllReceipts(receipts);
    setTimeout(() => setShowPdf(true), 10);
  }, [data, selectedCampers]);
  if (!showPdf) return <div>Loading ...</div>;
  return (
    <PDFViewer className="h-[70vh] w-full">
      <ReceiptDocument allReceipts={allReceipts} fromTo={fromTo} />
    </PDFViewer>
  );
};
