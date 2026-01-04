import type { ReactNode } from "react";
import type { Address, Camper } from "@/models/TruckingData";
import { Text, View } from "@react-pdf/renderer";

export type AddressLabelProps = {
  pickUpAddress: Address;
  returnAddress?: Address;
  camper: Camper;
  phone: string;
};

export const AddressLabel = ({
  pickUpAddress,
  returnAddress,
  camper,
  phone,
}: AddressLabelProps): ReactNode => {
  const address = returnAddress?.line1 ? returnAddress! : pickUpAddress;
  return (
    <View style={{ maxWidth: "185px" }}>
      <Text>
        {camper.firstName} {camper.lastName}
      </Text>
      <Text>{address.line1}</Text>
      {address.line2 ? <Text>{address.line2}</Text> : null}

      <Text
        style={{
          fontSize:
            getCharacters(address.city, address.state, address.zip) > 20
              ? 12
              : 14,
        }}
      >
        {address.city}, {address.state} {address.zip}
      </Text>
      <Text>Phone: {phone}</Text>
    </View>
  );
};

const getCharacters = (...vals: string[]) => {
  return vals.reduce((count: number, s: string) => count + s.length, 0);
};
