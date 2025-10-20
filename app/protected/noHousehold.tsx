import { inHousehold } from "@/atoms/household-atoms";
import { useAtom } from "jotai";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function NoHousehold() {
    const [inhousehold, setinhousehold] = useAtom(inHousehold)
    return(
        <View>
            <Text> Create/Join</Text>
            <Button onPress={() => setinhousehold(true)}> temp </Button>
        </View>
    );
};