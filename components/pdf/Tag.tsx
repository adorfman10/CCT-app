import { View, StyleSheet } from "@react-pdf/renderer";

import type { Address, Camper } from "@/models/TruckingData";
import { AddressLabel } from "./AddressLabel";
import { CampLabel } from "./CampLabel";
import { Routing } from "./Routing";
import type { ReactNode } from "react";

export type TagInfo = {
  camper: Camper;
  address: Address;
  returnAddress?: Address;
  phone: string;
  truck: string;
  stop: string;
  returnTruck?: string;
  returnStop?: string;
};

const styles = StyleSheet.create({
  section: {
    height: 180,
    width: "49%",
    padding: 8,
    borderColor: "black",
    borderStyle: "solid",
    fontSize: 14,
    borderRadius: 8,
  },
});

export const Tag = ({
  address,
  returnAddress,
  camper,
  phone,
  stop,
  truck,
  returnStop,
  returnTruck,
}: TagInfo): ReactNode => (
  <View style={styles.section}>
    <AddressLabel
      pickUpAddress={address}
      returnAddress={returnAddress}
      camper={camper}
      phone={phone}
    />
    <CampLabel camp={camper.camp} />
    <Routing
      truck={truck}
      stop={stop}
      returnStop={returnStop}
      returnTruck={returnTruck}
    />
  </View>
);

export const EmptyTag = (): ReactNode => <View style={styles.section}></View>;
