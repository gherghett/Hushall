import {
  useChoresWithLastDone,
  useCurrentHousehold,
  useIsOwnerOfCurrentHousehold,
} from "@/atoms/household-atoms";
import { useCharacters } from "@/hooks/useCharacters";
import { AppTheme } from "@/lib/theme";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, FAB, Text, useTheme } from "react-native-paper";
interface Member {
  id: number;
  name: string;
  icon: string;
}

interface choreData {
  id: number;
  name: string;
  doneBy: Member[];
  daysSenceDone: number;
  interval: number;
}

export default function ChoreView() {
  const theme = useTheme() as AppTheme;
  const household = useCurrentHousehold();
  const isOwner = useIsOwnerOfCurrentHousehold();
  const characters = useCharacters();

  const chores = useChoresWithLastDone();
  if (household == null || chores === null) {
    router.dismissAll();
    return null;
  }

  const choreView = chores.map(c => {
    // console.log(`Rendering chore: ${c.title}`);
    // console.log(`doneBy:`, c.doneBy);
    // console.log(`doneBy?.length:`, c.doneBy?.length);
    // console.log(`daysSinceDone:`, c.daysSinceDone);
    // console.log(
    //   `Should show daysSinceDone:`,
    //   !c.doneBy?.length && c.daysSinceDone !== null
    // );

    return (
      <Card style={styles.cardContainer} key={c.id}>
        <Card.Content style={styles.cardContent}>
          <Text variant="titleMedium"> {c.title}</Text>
          <View style={styles.rightSection}>
            {c.daysSinceDone !== null && c.daysSinceDone <= c.interval && (
              <Text variant="titleMedium">
                {" "}
                {c.doneBy.map(d => characters[d.characterId].emoji)}
              </Text>
            )}
            {c.daysSinceDone !== null && (
              <Text
                variant="titleMedium"
                style={[
                  styles.daysBadge,
                  {
                    color:
                      c.daysSinceDone < c.interval
                        ? theme.colors.onPrimary
                        : theme.colors.onError,
                    backgroundColor:
                      c.daysSinceDone < c.interval
                        ? theme.colors.secondary
                        : theme.colors.error,
                  },
                ]}
              >
                {c.daysSinceDone}
              </Text>
            )}
          </View>
        </Card.Content>
      </Card>
    );
  });

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>{choreView}</ScrollView>

      {/* Bottom left button */}
      {isOwner && (
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => router.push("/protected/createChore")}
        />
      )}

      {/* Bottom right button - you can uncomment this when needed */}
      {/*
      <FAB
        icon="cog"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={() => console.log('Bottom right button pressed')}
      />
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  cardContainer: {
    margin: 10,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  daysBadge: {
    marginLeft: 15,
    borderRadius: 15,
    height: 30,
    width: 30,
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 30,
  },
  fab: {
    position: "absolute",
    margin: 16,
    left: 0,
    bottom: 0,
  },
});
