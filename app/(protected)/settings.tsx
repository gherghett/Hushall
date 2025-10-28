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
  const [householdName, setHouseholdName] = useState(household?.name || "");

  const handleCharacterChange = async (char: Character) => {
    setSelectedCharacter(char);
    await updateCharacter(char.id)
  };

  const handleMemberNameChange = async (newName: string) => {
    if (!household || !user) return;
    await updateMemberName(newName);
  };

  const handleHouseholdNameChange = async (newName: string) => {
    if (!household) return;
    await editNameMutation.mutateAsync({ name: newName, id: household.id });
  };

  useEffect(() => {
    setMemberName(currentMember?.name || "");
    setHouseholdName(household?.name || "");
  }, [currentMember, household]);

  useEffect(() => {
    if (household && user) {
      const member = household.members.find((m) => m.userId === user.uid);
      if (member) {
        setMemberName(member.name || "");
      }
    }
  }, [household, user]);

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
            onBlur={() => handleMemberNameChange(memberName)}
            placeholder="Användarnamn"
            placeholderTextColor="#999"
          />
        </View>

        <View>
          <Divider style={styles.dividerColor} />
          <Text style={[theme.styles.title, styles.textTitle]}>Hushåll</Text>
          <Divider style={styles.dividerColor} />
        </View>

        <View style={styles.householdRow}>
          <TextInput
            style={styles.householdInput}
            value={householdName}
            onChangeText={setHouseholdName}
            onBlur={() => handleHouseholdNameChange(householdName)}
            placeholder="Hushållsnamn"
            placeholderTextColor="#999"
          />
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
  householdRow: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  householdInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    width: "100%",
    backgroundColor: "#fff",
  },
});