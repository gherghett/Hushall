import {
  useCurrentHousehold,
  useCurrentMembers,
  useMemberCompletionValue,
} from "@/atoms/household-atoms";
import { Character, useCharacters } from "@/hooks/useCharacters";
import { AppTheme } from "@/lib/theme";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import PieChart from "react-native-pie-chart";

interface props {
  DateRange: {
    start: Date;
    end: Date;
  };
}
interface Member {
  id: number;
  name: string;
  characterId: number;
}

interface ChoreInstance {
  memberId: number;
  weight: number;
  date: Date;
}

interface characterIcon {
  id: number;
  icon: string;
  color: string;
}

export default function StatisticsView(props: props) {
  const theme = useTheme() as AppTheme;
  const household = useCurrentHousehold();
  const characters: Character[] = useCharacters();
  const members = useCurrentMembers();
  const compleationsValue = useMemberCompletionValue(
    props.DateRange.start,
    props.DateRange.end
  );
  if (!members || !compleationsValue) return;

  const mainSeries = members
    .map(m => {
      const character = characters[m.characterId];
      return {
        value: compleationsValue[m.id],
        color: character?.colors.primary ?? "#999", // fallback color
        label: {
          text: character?.emoji ?? "❓", // fallback icon
          fontSize: 24,
        },
      };
    })
    .filter(s => s.value !== 0 && s.value !== undefined);

  return (
    <View>
      <Text>
        {" "}
        {props.DateRange.start.toDateString()} -{" "}
        {props.DateRange.end.toDateString()}
      </Text>
      {mainSeries.length > 0 ? (
        <PieChart series={mainSeries} widthAndHeight={250} />
      ) : (
        <Text> No Data</Text>
      )}
    </View>
  );
}
