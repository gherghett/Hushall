import { inHoushold } from "@/atoms/auth-atoms";
import { useAtom } from "jotai";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function NoHousehold() {
    const [inhousehold, setinhousehold] = useAtom(inHoushold)
    return(
        <View>
            <Text> Create/Join</Text>
            <Button onPress={() => setinhousehold(true)}> temp </Button>
        </View>
    );
};