import { userAtom } from "@/atoms/auth-atoms";
import {
  useChoresWithLastDone,
  useCompleteChoreMutation,
  useCurrentHousehold,
  useCurrentMembers,
  useDeleteChoreMutation,
  useIsOwnerOfCurrentHousehold,
} from "@/atoms/household-atoms";
import { Character, useCharacters } from "@/hooks/useCharacters";
import { AppTheme } from "@/lib/theme";
import { Member } from "@/models/household";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Button,
  Card,
  Checkbox,
  Dialog,
  FAB,
  Icon,
  Modal,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";

interface MemberPickerProps {
  visible: boolean;
  onDismiss: () => void;
  onMemberSelect: (members: Member[]) => void;
  chore: any | undefined;
  members: Member[];
  currentUserId: string | null;
  characters: Character[];
}

const MemberPicker = ({
  visible,
  onDismiss,
  onMemberSelect,
  members,
  chore,
  currentUserId,
  characters,
}: MemberPickerProps) => {
  const theme = useTheme() as AppTheme;

  const currentUserMember = members.find(m => m.userId === currentUserId);

  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(
    currentUserMember ? [currentUserMember.id] : []
  );

  const toggleMember = (memberId: string) => {
    setSelectedMemberIds(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSubmit = () => {
    const selectedMembers = members.filter(m =>
      selectedMemberIds.includes(m.id)
    );
    onMemberSelect(selectedMembers);
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.modalContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text variant="titleLarge" style={styles.modalTitle}>
          Vem har gjort sysslan?
        </Text>

        {chore && (
          <>
            <Text style={[{ textAlign: "center" }]}>{chore.title}</Text>
            <Text>{chore.description}</Text>
          </>
        )}

        {/* List of members with checkboxes */}
        {members.map(member => (
          <TouchableOpacity
            key={member.id}
            style={styles.memberRow}
            onPress={() => toggleMember(member.id)}
          >
            <Checkbox
              status={
                selectedMemberIds.includes(member.id) ? "checked" : "unchecked"
              }
              onPress={() => toggleMember(member.id)}
            />
            <Text style={styles.memberText}>
              {member.userId === currentUserId ? "Jag (" : ""}
              {characters[member.characterId]?.emoji || ""} {member.name}
              {member.userId === currentUserId ? ")" : ""}
            </Text>
          </TouchableOpacity>
        ))}

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
          disabled={selectedMemberIds.length === 0}
        >
          Bekräfta
        </Button>

        <Button mode="text" onPress={onDismiss} style={styles.cancelButton}>
          Avbryt
        </Button>
      </Modal>
    </Portal>
  );
};

export default function ChoreView() {
  const theme = useTheme() as AppTheme;
  const household = useCurrentHousehold();
  const isOwner = useIsOwnerOfCurrentHousehold();
  const characters = useCharacters();
  const members = useCurrentMembers();
  const completeChoreMutation = useCompleteChoreMutation();
  const deleteChoreMutation = useDeleteChoreMutation();
  const user = useAtomValue(userAtom);

  const [editMode, setEditMode] = useState(false);

  const [memberPickerVisible, setMemberPickerVisible] = useState(false);
  const [selectedChoreId, setSelectedChoreId] = useState<string | null>(null);

  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [choreToDelete, setChoreToDelete] = useState<string | null>(null);

  const chores = useChoresWithLastDone();
  if (household == null || chores === null) {
    router.dismissAll();
    return null;
  }

  const donebyMap = (list: string[]) => {
    const output = list.map(d => {
      const member = members?.find(m => m.id === d);
      const character = member ? characters[member.characterId] : null;
      return character?.emoji || "❓";
    });
    return compressString(output.join(""));
  };

  const compressString = (str: string) => {
    const counts = new Map();
    const seen = new Set();
    let result = "";

    for (const char of str) {
      counts.set(char, (counts.get(char) || 0) + 1);
    }

    for (const char of str) {
      if (!seen.has(char)) {
        seen.add(char);
        const count = counts.get(char);
        result += char + (count > 1 ? "," + count : "");
      }
    }
    console.log(result);
    return result;
  };

  const handleChorePress = (choreId: string) => {
    setSelectedChoreId(choreId);
    setMemberPickerVisible(true);
  };

  const handleMemberSelect = async (members: Member[]) => {
    if (!household || !selectedChoreId) return;

    try {
      await completeChoreMutation.mutateAsync({
        choreId: selectedChoreId,
        householdId: household.id,
        completedBy: members,
      });
    } catch (error) {
      console.error("Failed to complete chore:", error);
    }
  };

  const handleEditChore = (choreId: string) => {
    router.push(`/(protected)/createChore?choreId=${choreId}`);
  };

  const handleDeleteChore = (choreId: string) => {
    setChoreToDelete(choreId);
    setDeleteDialogVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (!household || !choreToDelete) return;

    try {
      await deleteChoreMutation.mutateAsync({
        choreId: choreToDelete,
        householdId: household.id,
      });

      console.log(`Chore ${choreToDelete} deleted`);
    } catch (error) {
      console.error("Failed to delete chore:", error);
    }

    setDeleteDialogVisible(false);
    setChoreToDelete(null);
  };

  const choreView = chores.map(c => {
    return (
      <TouchableOpacity
        key={c.id}
        disabled={editMode}
        onPress={() => handleChorePress(c.id)}
      >
        <Card style={styles.cardContainer}>
          <Card.Content style={styles.cardContent}>
            <Text
              variant="titleMedium"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ maxWidth: "60%" }}
            >
              {" "}
              {c.title}
            </Text>
            <View style={styles.rightSection}>
              {!editMode && (
                <>
                  {c.daysSinceDone !== null && c.daysSinceDone === 0
                    ? c.daysSinceDone !== null &&
                      c.daysSinceDone <= c.interval && (
                        <Text
                          variant="titleMedium"
                          numberOfLines={1} // single line
                          ellipsizeMode="tail" // shows "..." at the end
                          style={{ maxWidth: 100, flexShrink: 1 }}
                        >
                          {" "}
                          {donebyMap(c.doneBy)}
                        </Text>
                      )
                    : c.daysSinceDone !== null && (
                        <Text
                          variant="titleMedium"
                          style={[
                            styles.daysBadge,
                            {
                              color:
                                c.daysSinceDone < c.interval
                                  ? theme.colors.onSecondaryContainer
                                  : theme.colors.onError,
                              backgroundColor:
                                c.daysSinceDone < c.interval
                                  ? theme.colors.secondaryContainer
                                  : theme.colors.error,
                            },
                          ]}
                        >
                          {c.daysSinceDone}
                        </Text>
                      )}
                </>
              )}
              {editMode && (
                <>
                  <TouchableOpacity
                    style={{ padding: 0, margin: 0 }}
                    onPress={() => handleEditChore(c.id)}
                  >
                    <Text style={{ marginRight: 16 }}>
                      <Icon
                        size={25}
                        color={theme.colors.secondary}
                        source="pencil"
                      />
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ padding: 0, margin: 0 }}
                    onPress={() => handleDeleteChore(c.id)}
                  >
                    <Text style={{}}>
                      <Icon
                        size={25}
                        color={theme.colors.secondary}
                        source="trash-can"
                      />
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  });

  return (
    <>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {choreView}
      </ScrollView>

      {/* Member Picker Modal */}
      {members && (
        <MemberPicker
          visible={memberPickerVisible}
          onDismiss={() => setMemberPickerVisible(false)}
          onMemberSelect={handleMemberSelect}
          members={members}
          chore={chores.find(c => c.id === selectedChoreId)}
          currentUserId={user?.uid || null}
          characters={characters}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Portal>
        <Dialog
          visible={deleteDialogVisible}
          onDismiss={() => setDeleteDialogVisible(false)}
        >
          <Dialog.Title>Bekräfta borttagning</Dialog.Title>
          <Dialog.Content>
            <Text>{`Är du säker på att du vill ta bort "${chores.find(c => c.id === choreToDelete)?.title}"?`}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>
              Avbryt
            </Button>
            <Button onPress={handleConfirmDelete}>Ta bort</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Bottom left button */}
      {isOwner && (
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => router.push("/(protected)/createChore")}
        />
      )}

      {isOwner && (
        <FAB
          icon={!editMode ? "pencil" : "close"}
          style={[
            styles.fab,
            {
              right: 0,
            },
          ]}
          onPress={() => setEditMode(!editMode)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 16,
    marginBottom: 0,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 64,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "40%",
  },
  daysBadge: {
    marginLeft: 15,
    borderRadius: 15,
    height: 30,
    width: 30,
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 30,
  },
  fab: {
    position: "absolute",
    margin: 16,
    bottom: 0,
    opacity: 0.7,
  },
  modalContainer: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    textAlign: "center",
    marginBottom: 20,
  },
  memberButton: {
    marginVertical: 8,
  },
  primaryButton: {
    marginBottom: 16,
  },
  secondaryButton: {
    // Additional styling for secondary buttons if needed
  },
  cancelButton: {
    marginTop: 16,
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  memberText: {
    marginLeft: 8,
  },
  submitButton: {
    marginTop: 16,
  },
});
