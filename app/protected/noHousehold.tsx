import { useHasHousehold } from "@/atoms/household-atoms";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function NoHousehold() {
  const hasHousehold = useHasHousehold();
  return (
    <View>
      <Text> Create/Join</Text>
    </View>
  );
}
