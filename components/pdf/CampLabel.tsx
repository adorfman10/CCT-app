import { View, Image, Text, StyleSheet } from "@react-pdf/renderer";
import { Camp } from "@/models/TruckingData";
import CeLogo from "@/assets/ce.png";
import CbrLogo from "@/assets/cbr.png";
import type { ReactNode } from "react";

const styles = StyleSheet.create({
  campLabel: {
    position: "absolute",
    top: 8,
    right: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const CampLabel = ({ camp }: { camp: Camp }): ReactNode => (
  <View style={styles.campLabel}>
    {camp === Camp.EQ ? (
      <>
        <Image source={CeLogo.src} style={{ width: 50, height: 50 }} />
        <Text>Camp Equinunk</Text>
      </>
    ) : null}
    {camp === Camp.BR ? (
      <>
        <Image source={CbrLogo.src} style={{ width: 50, height: 50 }} />
        <Text>Camp Blue Ridge</Text>
      </>
    ) : null}
    <Text>2025</Text>
  </View>
);
