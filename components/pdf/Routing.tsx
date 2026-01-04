import { View, Text, StyleSheet } from "@react-pdf/renderer";
import type { ReactNode } from "react";

const styles = StyleSheet.create({
  routing: {
    paddingTop: 16,
    paddingLeft: 32,
    fontSize: 24,
  },
});
export const Routing = ({
  truck,
  stop,
  returnStop,
  returnTruck,
}: {
  truck: string;
  stop: string;
  returnTruck?: string;
  returnStop?: string;
}): ReactNode => {
  const tagStop = returnStop ?? returnStop !== "" ? returnStop : stop;
  const tagTruck = returnTruck ?? returnTruck !== "" ? returnTruck : truck;
  return (
    <View style={styles.routing}>
      <Text>Truck: {tagTruck}</Text>
      <Text>Stop: {tagStop}</Text>
    </View>
  );
};
