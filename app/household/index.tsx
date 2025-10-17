import { ScrollView } from "react-native";
import { Card, Text } from "react-native-paper";
interface Member{
    id: number,
    name: string,
    icon: string
}

interface choreData{
    id: number,
    name: string,
    doneBy: Member[],
    daysSenceDone: number,
    interval: number,
}

export default function HomeScreen() {
    const members: Member[] = [
        {id: 1, name: "Erick", icon: "🦊"},
        {id: 2, name: "Arvid", icon: "🐙"},
        {id: 3, name: "Josef", icon: "🐬"}
    ];

    const data: choreData[] = [
        {id: 1, name: "laga mat", doneBy:[members[0]], daysSenceDone: 0, interval: 5 },
        {id: 2, name: "Damsuga", doneBy: [members[2]], daysSenceDone: 0, interval: 5 },
        {id: 3, name: "Tvätta", doneBy: [members[0] , members[1]], daysSenceDone: 0, interval: 7 },
        {id: 4, name: "Damma", doneBy: [], daysSenceDone: 2, interval: 3 },
        {id: 5, name: "diska", doneBy: [], daysSenceDone: 5, interval: 2 },
    ]; 

    const choreView = data.map((c) =>(
        <Card style={{margin: 10}} key={c.id}>
            <Card.Content style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text variant="titleLarge"> {c.name}</Text>
                {c.doneBy.length? 
                    <Text variant="titleLarge"> {c.doneBy.map(d => (d.icon))}</Text>
                    :
                    <Text variant="titleLarge" style={
                        {backgroundColor: c.daysSenceDone < c.interval? "#535353ff": "#930000ff"
                        , borderRadius: 15, height: 30, width: 30}}> {c.daysSenceDone}</Text>
                }
            </Card.Content>
        </Card>
    ));

    return (
        <ScrollView>
            {choreView}
        </ScrollView>
    )
}