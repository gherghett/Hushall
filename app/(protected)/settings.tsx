import { userAtom } from "@/atoms/auth-atoms";
import {
  useCurrentHousehold,
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
import { View } from "react-native";
import {
  Divider,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

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
    <View>
      <Surface style={theme.styles.Surface}>
        <View>
          <Text variant="displaySmall"> Profil</Text>
          <Divider />
        </View>
        <View>
          <SelectedCharacter
            characters={availableCharacters}
            selectedCharacter={selectedCharacter}
            onCharacterChange={handleCharacterChange}
          />

          <TextInput
            label="Byt namn på medlem."
          />
        </View>
      </Surface>
      <Surface>
        <View>

          <Divider />
          <Text variant="displaySmall">Hushåll</Text>
          <Divider />
        </View>
        <View>
          <TextInput
            label="But manm på hushåll." />
        </View>
        <View>
          <Text>{household?.code || "Ingen kod"}</Text>
        </View>
        <View>
          <Text>Lista med användare - VG-krav</Text>
          <Text>Plus knapp för att skapa ny medlem</Text>
        </View>
        <View>
          <Divider />
          <Text >Global</Text>
          <Divider />
        </View>
      </Surface >
      <Divider />
      <ThemeToggle /> {/* Reminder: Dark/light/auto switch */}
      <Divider></Divider>

    </View >
  );
}
