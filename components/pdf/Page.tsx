import { View, Page, StyleSheet } from "@react-pdf/renderer";
import { EmptyTag, Tag } from "./Tag";
import type { TagInfo } from "./Tag";
import type { ReactNode } from "react";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    paddingVertical: 36,
    paddingHorizontal: 10,
  },
  rowContainer: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export const MyPage = ({ tags }: { tags: (TagInfo | null)[] }): ReactNode => (
  <Page size="LETTER" style={styles.page}>
    <View style={styles.rowContainer}>
      {tags.map((tag, i) => {
        if (tag === null) {
          return <EmptyTag key={i} />;
        }
        return (
          <Tag
            address={tag.address}
            returnAddress={tag.returnAddress}
            camper={tag.camper}
            phone={tag.phone}
            stop={tag.stop}
            truck={tag.truck}
            returnStop={tag.returnStop}
            returnTruck={tag.returnTruck}
            key={i}
          />
        );
      })}
    </View>
  </Page>
);
