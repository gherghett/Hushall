import { userAtom } from "@/atoms/auth-atoms";
import {
  useCurrentHousehold,
  useCurrentMembers,
  useEditHouseholdNameMutation,
} from "@/atoms/household-atoms";
import {
  useUpdateMemberNameMutation,
  useUpdateUserCharacterMutation,
} from "@/atoms/userAtoms";
import SelectedCharacter from "@/components/SelectedCharacter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCurrentUserCharacterId } from "@/hooks/getCurrentCharacter";
import { Character, useCharacters } from "@/hooks/useCharacters";
import { AppTheme } from "@/lib/theme";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Surface, Text, TextInput, useTheme } from "react-native-paper";

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
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    char
  );
  const [memberName, setMemberName] = useState(currentMember?.name || "");
  const [householdName, setHouseholdName] = useState(household?.name || "");
  const members = useCurrentMembers();

  const handleCharacterChange = async (char: Character) => {
    setSelectedCharacter(char);
    await updateCharacter(char.id);
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
      const member = household.members.find(m => m.userId === user.uid);
      if (member) {
        setMemberName(member.name || "");
      }
    }
  }, [household, user]);

  const usedCharacterIds =
    household?.members
      ?.filter(m => m.userId !== user?.uid)
      .map(m => m.characterId) || [];

  const effectiveUsedCharacterIds = [
    ...usedCharacterIds,
    selectedCharacter?.id,
  ].filter(Boolean);

  const availableCharacters = characters.filter(
    c => !effectiveUsedCharacterIds.includes(c.id)
  );

  return (
    <ScrollView style={theme.styles.containerPadding}>
      <Surface style={[theme.styles.surface, { marginBottom: 32 }]}>
        <View>
          <Text variant="headlineMedium"> Profil</Text>
        </View>
        <View>
          <SelectedCharacter
            characters={availableCharacters}
            selectedCharacter={selectedCharacter}
            onCharacterChange={handleCharacterChange}
          />
          <TextInput
            value={memberName}
            onChangeText={value => setMemberName(value)}
            onBlur={async () => await handleMemberNameChange(memberName)}
          />{" "}
        </View>
      </Surface>

      <Surface style={[theme.styles.surface, { marginBottom: 32 }]}>
        <View>
          <Text variant="headlineMedium">Hushåll</Text>
        </View>
        <View>
          <TextInput
            value={householdName}
            onChangeText={value => setHouseholdName(value)}
            onBlur={async () => await handleHouseholdNameChange(householdName)}
          />
        </View>
        <View>
          <Text variant="headlineSmall">
            KOD: {household?.code || "Ingen kod"}
          </Text>
        </View>
      </Surface>
      <Surface style={[theme.styles.surface, { marginBottom: 32 }]}>
        <View style={styles.characterRow}>
          {members?.map(m => (
            <View
              key={m.id}
              style={[
                theme.styles.surface,
                {
                  backgroundColor: characters[m.characterId]?.colors.primary,
                  width: "100%",
                  marginBottom: 16,
                },
              ]}
            >
              <Text variant="titleLarge">
                {characters[m.characterId]?.emoji} - {m.name}
              </Text>
            </View>
          ))}
        </View>
        <Button mode="outlined">
          <Text>Plus knapp för att skapa ny medlem</Text>
        </Button>
      </Surface>
      <Surface style={[theme.styles.surface, { marginBottom: 32 }]}>
        <View>
          <Text variant="headlineMedium">Global</Text>
        </View>

        <ThemeToggle />
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  characterRow: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 12,
  },
});
