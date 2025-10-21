import IntervalPicker from "@/components/IntervalPicker";
import WeightPicker from "@/components/WeightPicker";
import { AppTheme } from "@/lib/theme";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Surface, TextInput, useTheme } from "react-native-paper";

export default function CreateChore() {
  const theme = useTheme() as AppTheme;

  const [choreTitle, setChoreTitle] = useState("");
  const [choreDescription, setChoreDescription] = useState("");
  const [choreInterval, setChoreInterval] = useState(7);
  const [choreWeight, setChoreWeight] = useState(5);

  return (
    <View style={[theme.styles.container]}>
      <Surface style={[{ padding: 10 }]}>
        <TextInput
          label="Titel"
          value={choreTitle}
          onChangeText={setChoreTitle}
          mode="outlined"
          style={{ marginBottom: 20 }}
        />
        <TextInput
          label="Beskrivning"
          value={choreDescription}
          onChangeText={setChoreDescription}
          mode="outlined"
          multiline={true}
          numberOfLines={3}
          style={{ marginBottom: 20 }}
        />
        <IntervalPicker
          selectedInterval={choreInterval}
          onIntervalChange={setChoreInterval}
        />
        <WeightPicker
          selectedWeight={choreWeight}
          onWeightChange={setChoreWeight}
        />
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({});
