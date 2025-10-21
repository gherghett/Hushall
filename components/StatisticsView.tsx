import { View } from "react-native";
import { Text } from "react-native-paper";
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
  const members: Member[] = [
    { id: 1, name: "Erick", characterId: 1 },
    { id: 2, name: "Arvid", characterId: 2 },
    { id: 3, name: "Josef", characterId: 3 },
  ];

  const characterIcons: characterIcon[] = [
    { id: 1, icon: "🦊", color: "#e07e08ff" },
    { id: 2, icon: "🐙", color: "#db0808ff" },
    { id: 3, icon: "🐬", color: "#05e0efff" },
  ];

  const mockChores: ChoreInstance[] = [
    { memberId: 1, weight: 5, date: new Date("2025-10-13") },
    { memberId: 2, weight: 7, date: new Date("2025-10-13") },
    { memberId: 3, weight: 3, date: new Date("2025-10-13") },

    { memberId: 1, weight: 4, date: new Date("2025-10-14") },
    { memberId: 2, weight: 8, date: new Date("2025-10-14") },
    { memberId: 3, weight: 2, date: new Date("2025-10-14") },

    { memberId: 1, weight: 6, date: new Date("2025-10-15") },
    { memberId: 2, weight: 5, date: new Date("2025-10-15") },
    { memberId: 3, weight: 4, date: new Date("2025-10-15") },

    { memberId: 1, weight: 7, date: new Date("2025-10-16") },
    { memberId: 2, weight: 3, date: new Date("2025-10-16") },
    { memberId: 3, weight: 6, date: new Date("2025-10-16") },

    { memberId: 1, weight: 2, date: new Date("2025-10-17") },
    { memberId: 2, weight: 9, date: new Date("2025-10-17") },
    { memberId: 3, weight: 5, date: new Date("2025-10-17") },

    { memberId: 1, weight: 8, date: new Date("2025-10-18") },
    { memberId: 2, weight: 20, date: new Date("2025-10-18") },
    { memberId: 3, weight: 7, date: new Date("2025-10-18") },

    { memberId: 1, weight: 3, date: new Date("2025-10-19") },
    { memberId: 2, weight: 6, date: new Date("2025-10-19") },
    { memberId: 3, weight: 8, date: new Date("2025-10-19") },
    { memberId: 3, weight: 8, date: new Date("2025-10-21") },
  ];

  const series = members.map(m => {
    const char = characterIcons.find(c => c.id === m.characterId);

    return {
      value: mockChores
        .filter(
          c =>
            c.memberId === m.id &&
            c.date >= props.DateRange.start &&
            c.date <= props.DateRange.end
        )
        .reduce((sum, c) => sum + c.weight, 0),
      color: char?.color ?? "#999", // fallback color
      label: {
        text: char?.icon ?? "❓", // fallback icon
        fontSize: 24,
      },
    };
  });
  const serisfinal = series.filter(s => s.value !== 0);
  console.log(series);
  return (
    <View>
      <Text>
        {" "}
        {props.DateRange.start.toDateString()} -{" "}
        {props.DateRange.end.toDateString()}
      </Text>
      {serisfinal.length > 0 ? (
        <PieChart series={serisfinal} widthAndHeight={250} />
      ) : (
        <Text> No Data</Text>
      )}
    </View>
  );
}
