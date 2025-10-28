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

export default function StatisticsView(props: props) {
  const theme = useTheme() as AppTheme;
  const household = useCurrentHousehold();
  const characters: Character[] = useCharacters();
  const members = useCurrentMembers();
  const completionsValue = useMemberCompletionValue(
    props.DateRange.start,
    props.DateRange.end
  );
  console.log(completionsValue);
  if (!members || !completionsValue) return;

  const mainSeries = members
    .map(m => {
      const character = characters[m.characterId];
      const memberData = completionsValue[m.name] ?? { total: 0 };
      return {
        value: memberData.total,
        color: character?.colors.primary ?? "#999", // fallback color
        label: {
          text: character?.emoji ?? "❓", // fallback icon
          fontSize: 24,
        },
      };
    })
    .filter(s => s.value !== 0 && s.value !== undefined);

  const choreSeries = household?.chores.map(chore => {
    return {
      name: chore.title,
      data: members
        .map(m => {
          const character = characters[m.characterId];
          const memberData = completionsValue[m.name];
          const choreValue = memberData?.byChore?.[chore.title] ?? 0;

          return {
            value: choreValue,
            color: character?.colors.primary ?? "#999",
            label: {
              text: character?.emoji ?? "❓",
              fontSize: 24,
            },
          };
        })
        .filter(s => s.value !== 0 && s.value !== undefined),
    };
  });
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {choreSeries?.map(cs =>
          cs.data.length > 0 && cs.data != null ? (
            <View
              key={cs.name}
              style={{
                flexBasis: "48%",
                marginBottom: 16,
                alignItems: "center",
              }}
            >
              <Text style={{ textAlign: "center" }}>{cs.name}</Text>
              <PieChart series={cs.data} widthAndHeight={100} />
            </View>
          ) : (
            <View
              key={cs.name}
              style={{
                flexBasis: "48%",
                marginBottom: 16,
                alignItems: "center",
              }}
            >
              <Text style={{ textAlign: "center" }}>{cs.name}</Text>
              <Text> No Data</Text>
            </View>
          )
        )}
      </View>
    </View>
  );
}
