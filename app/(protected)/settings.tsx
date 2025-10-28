import {
  useCurrentHousehold,
  useEditHouseholdNameMutation,
} from "@/atoms/household-atoms";
import ChooseCharacter from "@/components/ChooseCharacter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCharacters } from "@/hooks/useCharacters";
import { AppTheme } from "@/lib/theme";
import { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Divider, List, Surface, Text, useTheme, TouchableRipple} from "react-native-paper";


export default function SettingsScreen() {
  const theme = useTheme() as AppTheme;
  const characters = useCharacters();
  const household = useCurrentHousehold();
  const editNameMutation = useEditHouseholdNameMutation();

  // här ser du hur man ändrar namnet---- du behöver såklart skicka in det namnet som användaren skrivit in i textruta eller vad det kan bara
  const handleTestEditName = () => {
    if (!household) return;
    editNameMutation.mutate({
      name: "TestName" + Math.floor(Math.random() * 1000),
      id: household.id,
    });
  };

  const [showCharacterModal, setShowCharacterModal] = useState(false);

  return (
    <View style={[styles.bodyContainer]}>
      <Surface>

        <View>
          <Text style={[theme.styles.title, styles.textTitle]}> Profil</Text>
          < Divider style={styles.dividerColor} />
        </View>

        <View>
          <TouchableRipple onPress={() => setShowCharacterModal(true)}>
            <Text>Rund cirkel med karaktären användaren valt/blivit tilldelad</Text>
          </TouchableRipple>
          <Text>Input field där namnet på användaren står, ska gå att ändra</Text>
         
          <ChooseCharacter
            visible={showCharacterModal}
            onClose={() => setShowCharacterModal(false)}
          />
        </View>

        <View>
          < Divider style={styles.dividerColor} />
          <Text style={[theme.styles.title, styles.textTitle]}>Hushåll</Text>
          < Divider style={styles.dividerColor} />
        </View>

        <View>
          <Text>Input field namn på hushåll, går att ändra</Text>
        </View>

        <View>
          <Text>
            Inbjudningskod för hushållet
          </Text>
        </View>

        <View>
          <Text>Lista med alla hushållsmedlemmar</Text>
          <Text>Plus knapp för att skapa ny medlem</Text>
        </View>

        <View>
          < Divider style={styles.dividerColor} />
          <Text style={[theme.styles.title, styles.textTitle]}>Global</Text>
          < Divider style={styles.dividerColor} />
        </View>


        < Divider style={styles.dividerColor} />
        <ThemeToggle /> {/* Reminder: Dark/light/auto switch */}

        <Divider></Divider>
        <Button title="Test Edit Household Name" onPress={handleTestEditName} />
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  dividerColor: {
    backgroundColor: "black",
  },
  textTitle: {
    textAlign: "center",
    padding: 20,
    paddingBottom: 0,
    fontSize: 20,
  },
})
