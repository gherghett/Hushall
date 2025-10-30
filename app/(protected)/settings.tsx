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
<<<<<<< HEAD
import { View } from "react-native";
=======
import { ScrollView, StyleSheet, View } from "react-native";
>>>>>>> main
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
<<<<<<< HEAD
    <View>
      <Surface style={theme.styles.Surface}>
        <View>
          <Text variant="displaySmall"> Profil</Text>
=======
    <ScrollView style={[styles.bodyContainer]}>
      <Surface>
        <View>
          <Text style={[theme.styles.title, styles.textTitle]}> Profil</Text>
>>>>>>> main
          <Divider />
        </View>
        <View>
          <SelectedCharacter
            characters={availableCharacters}
            selectedCharacter={selectedCharacter}
            onCharacterChange={handleCharacterChange}
          />
          <TextInput
<<<<<<< HEAD
            label="Byt namn på medlem."
=======
            style={styles.nameInput}
            value={memberName}
            onChangeText={setMemberName}
            onBlur={() => handleMemberNameChange(memberName)}
            placeholder="Användarnamn"
            // placeholderTextColor="#999"
>>>>>>> main
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
<<<<<<< HEAD
          <TextInput
            label="But manm på hushåll." />
=======
          <Divider />
          <Text style={[theme.styles.title, styles.textTitle]}>Hushåll</Text>
          <Divider />
        </View>
        <View style={styles.householdRow}>
          <TextInput
            style={styles.householdInput}
            value={householdName}
            onChangeText={setHouseholdName}
            onBlur={() => handleHouseholdNameChange(householdName)}
            placeholder="Hushållsnamn"
            // placeholderTextColor="#999"
          />
>>>>>>> main
        </View>
        <View>
          <Text>{household?.code || "Ingen kod"}</Text>
        </View>
        <View>
          <View>
            {members?.map(m => (
              <View
                style={[
                  styles.memberListItem,
                  {
                    backgroundColor:
                      characters[m.characterId]?.colors.primary ?? "#444",
                  },
                ]}
                key={m.id}
              >
                <Text
                  variant="titleMedium"
                  style={[
                    {
                      color:
                        characters[m.characterId]?.colors?.onPrimary ?? "#fff",
                    },
                  ]}
                >
                  {characters[m.characterId]?.emoji} - {m.name}
                </Text>
              </View>
            ))}
          </View>
          <Text>Plus knapp för att skapa ny medlem</Text>
        </View>
        <View>
          <Divider />
<<<<<<< HEAD
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
=======
          <Text style={[theme.styles.title, styles.textTitle]}>Global</Text>
          <Divider />
        </View>
        <Divider />
        <ThemeToggle />
        <Divider style={[{ marginBottom: 132 }]}></Divider>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
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
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    flex: 1,
    marginLeft: 20,
  },
  householdRow: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  householdInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    width: "100%",
  },
  codeText: {
    fontSize: 18,
    textAlign: "center",
  },
  codeContainer: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  memberListItem: {
    padding: 16,
    margin: 16,
    borderCurve: "circular",
    borderRadius: 8,
  },
});
>>>>>>> main
