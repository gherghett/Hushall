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

        {chore && <Text>{chore.description}</Text>}

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

  const chores = useChoresWithLastDone();
  if (household == null || chores === null) {
    router.dismissAll();
    return null;
  }

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

  const handleDeleteChore = async (choreId: string) => {
    if (!household) return;

    try {
      await deleteChoreMutation.mutateAsync({
        choreId,
        householdId: household.id,
      });

      console.log(`Chore ${choreId} deleted`);
    } catch (error) {
      console.error("Failed to delete chore:", error);
    }
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
            <Text variant="titleMedium"> {c.title}</Text>
            <View style={styles.rightSection}>
              {!editMode && (
                <>
                  {c.daysSinceDone !== null && c.daysSinceDone === 0
                    ? c.daysSinceDone !== null &&
                      c.daysSinceDone <= c.interval && (
                        <Text variant="titleMedium">
                          {" "}
                          {c.doneBy.map(d => characters[d.characterId].emoji)}
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
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>{choreView}</ScrollView>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  cardContainer: {
    margin: 10,
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
