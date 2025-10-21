import IntervalPicker from "@/components/IntervalPicker";
import WeightPicker from "@/components/WeightPicker";
import { AppTheme } from "@/lib/theme";
import { choreSchema } from "@/models/household";
import { useState } from "react";
import { View } from "react-native";
import {
  Button,
  HelperText,
  Snackbar,
  Surface,
  TextInput,
  useTheme,
} from "react-native-paper";
import { z } from "zod";

// Create a schema for the form data (without id and completions which are generated)
const createChoreFormSchema = choreSchema.omit({ id: true, completions: true });

export default function CreateChore() {
  const theme = useTheme() as AppTheme;

  const [choreTitle, setChoreTitle] = useState("");
  const [choreDescription, setChoreDescription] = useState("");
  const [choreInterval, setChoreInterval] = useState(7);
  const [choreWeight, setChoreWeight] = useState(5);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCreateChore = () => {
    try {
      // Validate the form data
      const formData = {
        title: choreTitle,
        description: choreDescription,
        interval: choreInterval,
        weight: choreWeight,
      };

      const validatedData = createChoreFormSchema.parse(formData);

      // Clear any previous errors
      setErrors({});

      // TODO: Here you would actually create the chore
      // For now, just show success message
      console.log("Valid chore data:", validatedData);
      setSnackbarMessage("Syssla skapad!");
      setSnackbarVisible(true);

      // Reset form
      setChoreTitle("");
      setChoreDescription("");
      setChoreInterval(7);
      setChoreWeight(5);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const errorMap: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            errorMap[err.path[0] as string] = err.message;
          }
        });
        setErrors(errorMap);
        setSnackbarMessage("Kontrollera att alla fält är korrekt ifyllda");
        setSnackbarVisible(true);
      }
    }
  };

  return (
    <View style={[theme.styles.container]}>
      <Surface style={[{ padding: 10 }]}>
        <TextInput
          label="Titel"
          value={choreTitle}
          onChangeText={setChoreTitle}
          mode="outlined"
          style={{ marginBottom: errors.title ? 0 : 20 }}
          error={!!errors.title}
        />
        {errors.title && (
          <HelperText type="error" style={{ marginBottom: 20 }}>
            {errors.title}
          </HelperText>
        )}
        <TextInput
          label="Beskrivning"
          value={choreDescription}
          onChangeText={setChoreDescription}
          mode="outlined"
          multiline={true}
          numberOfLines={3}
          style={{ marginBottom: errors.description ? 0 : 20 }}
          error={!!errors.description}
        />
        {errors.description && (
          <HelperText type="error" style={{ marginBottom: 20 }}>
            {errors.description}
          </HelperText>
        )}
        <IntervalPicker
          selectedInterval={choreInterval}
          onIntervalChange={setChoreInterval}
        />
        <WeightPicker
          selectedWeight={choreWeight}
          onWeightChange={setChoreWeight}
        />
        <Button
          style={[{ marginTop: 20 }]}
          mode="contained"
          onPress={handleCreateChore}
        >
          Skapa
        </Button>
      </Surface>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}
