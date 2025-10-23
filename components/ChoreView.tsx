import { userAtom } from "@/atoms/auth-atoms";
import {
  useChoresWithLastDone,
  useCompleteChoreMutation,
  useCurrentHousehold,
  useCurrentMembers,
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
  FAB,
  Modal,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";

interface MemberPickerProps {
  visible: boolean;
  onDismiss: () => void;
  onMemberSelect: (member: Member) => void;
  members: Member[];
  currentUserId: string | null;
  characters: Character[];
}

const MemberPicker = ({
  visible,
  onDismiss,
  onMemberSelect,
  members,
  currentUserId,
  characters,
}: MemberPickerProps) => {
  const theme = useTheme() as AppTheme;

  const currentUserMember = members.find(m => m.userId === currentUserId);
  const otherMembers = members.filter(m => m.userId !== currentUserId);

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

        {/* Primary button for current user */}
        {currentUserMember && (
          <Button
            mode="contained"
            style={[styles.memberButton, styles.primaryButton]}
            onPress={() => {
              onMemberSelect(currentUserMember);
              onDismiss();
            }}
          >
            {`Jag (${characters[currentUserMember.characterId]?.emoji || ""} ${currentUserMember.name})`}
          </Button>
        )}

        {/* Secondary/tertiary buttons for other members */}
        {otherMembers.map(member => (
          <Button
            key={member.id}
            mode="outlined"
            style={[styles.memberButton, styles.secondaryButton]}
            onPress={() => {
              onMemberSelect(member);
              onDismiss();
            }}
          >
            {`${characters[member.characterId]?.emoji || ""} ${member.name}`}
          </Button>
        ))}

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
  const user = useAtomValue(userAtom);

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

  const handleMemberSelect = async (member: Member) => {
    if (!household || !selectedChoreId) return;

    try {
      await completeChoreMutation.mutateAsync({
        choreId: selectedChoreId,
        householdId: household.id,
        completedBy: member,
      });
    } catch (error) {
      console.error("Failed to complete chore:", error);
    }
  };

  const choreView = chores.map(c => {
    return (
      <TouchableOpacity key={c.id} onPress={() => handleChorePress(c.id)}>
        <Card style={styles.cardContainer}>
          <Card.Content style={styles.cardContent}>
            <Text variant="titleMedium"> {c.title}</Text>
            <View style={styles.rightSection}>
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
          currentUserId={user?.uid || null}
          characters={characters}
        />
      )}

      {/* Bottom left button */}
      {isOwner && (
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => router.push("/protected/createChore")}
        />
      )}

      {/* Bottom right button - you can uncomment this when needed */}
      {/*
      <FAB
        icon="cog"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={() => console.log('Bottom right button pressed')}
      />
      */}
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
    left: 0,
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
});
