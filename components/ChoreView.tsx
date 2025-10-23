import {
  useCurrentHousehold,
  useIsOwnerOfCurrentHousehold,
} from "@/atoms/household-atoms";
import { AppTheme } from "@/lib/theme";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { Card, FAB, Text, useTheme } from "react-native-paper";
interface Member {
  id: string;
  name: string;
  characterId: string;
  role: "owner" | "member";
  userId?: string | undefined;
}

interface characterIcon{
  id: number;
  color: string;
  icon: string;
}

interface ChoreData {
  id: string;
  title: string;
  description: string;
  interval: number;
  weight: number;
  LastCompletion: Completion | null;
}

interface Completion {
  completedAt: Date;
  completedBy: string[];
}

function CheckToday(completion: Completion): boolean{
  return true; // TODO
}
function ChoreIcon(completion: Completion | null, members: Member[]){
const characterIcons: characterIcon[] = [
    { id: 1, icon: "🦊", color: "#e07e08ff" },
    { id: 2, icon: "🐙", color: "#db0808ff" },
    { id: 3, icon: "🐬", color: "#05e0efff" },
  ];

  if( completion == null)
    return

  if(CheckToday(completion))
  {

    const icon = completion.completedBy
      .map((m_id) => {
        const c_id = members.find((m) => m.id === m_id)?.characterId;
        return characterIcons.find((ci) => ci.id.toString() == c_id )?.icon
      });
    console.log(icon)
    return(
      <Text variant="titleLarge"> {icon} </Text>
    );
  }

} 

export default function ChoreView() {


  const theme = useTheme() as AppTheme
  const household = useCurrentHousehold();
  const isOwner = useIsOwnerOfCurrentHousehold();
  const members: Member[] = household.members;
  const data: ChoreData[] = household.chores.map((c) => {
  // if no completions
  if (!c.completions?.length) {
    return { ...c, LastCompletion: null };
  }

  // find the latest completion
  const latest = c.completions.reduce((a, b) =>
    new Date(a.completedAt) > new Date(b.completedAt) ? a : b
  );

  // convert to your simplified Completion format
  const latestCompletion: Completion = {
    completedAt: new Date(latest.completedAt),
    completedBy: latest.completedBy.map((cb) => cb.id),
  };

  return {
    id: c.id,
    title: c.title,
    description: c.description,
    interval: c.interval,
    weight: c.weight,
    LastCompletion: latestCompletion,
  };
});
  const choreView = data.map(c => (
    <Card style={{ margin: 10 }} key={c.id}>
      <Card.Content
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Text variant="titleLarge"> {c.title}</Text>
        {ChoreIcon(c.LastCompletion, members) /*c.LastCompletion ? 
        (
          CheckToday(c.LastCompletion) ?
          ( 
            <Text variant="titleLarge"> {choreIcon(c.LastCompletion, members)}</Text>
          ) : (
            <Text
            variant="titleLarge"
            style={{
              backgroundColor:
              c.LastCompletion.completedAt.getDay() < c.interval ? theme.colors.primaryContainer : theme.colors.errorContainer,
              borderRadius: 15,
              height: 30,
              width: 30,
            }}
            >
            {" "}
            {c.LastCompletion.completedAt.getDate()}
          </Text>
          )) : (  <Text> todo</Text>)*/}
      
      </Card.Content>
    </Card>
  ));

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <ScrollView style={{ width: "100%" }}>
        <Text>{household.name}</Text>
        {choreView}
      </ScrollView>

      {/* Bottom left button */}
      {isOwner && (
        <FAB
          icon="plus"
          style={{
            position: "absolute",
            margin: 16,
            left: 0,
            bottom: 0,
          }}
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
