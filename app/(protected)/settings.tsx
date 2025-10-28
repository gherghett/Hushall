import {
  useCurrentHousehold,
  useEditHouseholdNameMutation,
} from "@/atoms/household-atoms";
import ChooseCharacter from "@/components/ChooseCharacter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Character, useCharacters } from "@/hooks/useCharacters";
import SelectedCharacter from "@/components/SelectedCharacter";
import { AppTheme } from "@/lib/theme";
import { useEffect, useState } from "react";
import { View, StyleSheet, Button, TextInput } from "react-native";
import { Divider, List, Surface, Text, useTheme, TouchableRipple } from "react-native-paper";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms/auth-atoms";
import { useUpdateUserCharacterMutation, useUpdateMemberNameMutation } from "@/atoms/userAtoms";
import { useCurrentUserCharacterId } from "@/hooks/getCurrentCharacter";

export default function SettingsScreen() {
  const theme = useTheme() as AppTheme;
  const user = useAtomValue(userAtom);
  const household = useCurrentHousehold();
  const currentMember = household?.members?.find(m => m.userId === user?.uid);
  const userCharacterId = useCurrentUserCharacterId();
  const characters = useCharacters();
  const { mutateAsync: updateCharacter } = useUpdateUserCharacterMutation();
  const { mutateAsync: updateMemberName } = useUpdateMemberNameMutation();
  const editNameMutation = useEditHouseholdNameMutation();
  const char = characters.find(c => c.id === userCharacterId) ?? characters[0];
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(char);
  const [memberName, setMemberName] = useState(currentMember?.name || "");

  const handleCharacterChange = async (char: Character) => {
    setSelectedCharacter(char);
    await updateCharacter(char.id)
  };

  // här ser du hur man ändrar namnet---- du behöver såklart skicka in det namnet som användaren skrivit in i textruta eller vad det kan bara
  const handleTestEditName = () => {
    if (!household) return;
    editNameMutation.mutate({
      name: "TestName" + Math.floor(Math.random() * 1000),
      id: household.id,
    });
  };

  useEffect(() => {
    setMemberName(currentMember?.name || "");
  }, [currentMember]);

  return (
    <View style={[styles.bodyContainer]}>
      <Surface>

        <View>
          <Text style={[theme.styles.title, styles.textTitle]}> Profil</Text>
          <Divider style={styles.dividerColor} />
        </View>

        <View style={styles.characterRow}>
          <SelectedCharacter
            characters={characters}
            selectedCharacter={selectedCharacter}
            onCharacterChange={handleCharacterChange}
          />

          <TextInput
            style={styles.nameInput}
            value={memberName}
            onChangeText={setMemberName}
            onBlur={() => updateMemberName(memberName)}
            placeholder="Användarnamn"
            placeholderTextColor="#999"
          />
        </View>

        <View>
          <Divider style={styles.dividerColor} />
          <Text style={[theme.styles.title, styles.textTitle]}>Hushåll</Text>
          <Divider style={styles.dividerColor} />
        </View>

        <View>
          <Text>Input field namn på hushåll, går att ändra</Text>
        </View>

        <View>
          <Text>Inbjudningskod för hushållet</Text>
        </View>

        <View>
          <Text>Lista med alla hushållsmedlemmar</Text>
          <Text>Plus knapp för att skapa ny medlem</Text>
        </View>

        <View>
          <Divider style={styles.dividerColor} />
          <Text style={[theme.styles.title, styles.textTitle]}>Global</Text>
          <Divider style={styles.dividerColor} />
        </View>


        <Divider style={styles.dividerColor} />
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
  characterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  nameInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    flex: 1,
    marginLeft: 20,
    backgroundColor: "#fff",
  },
})
