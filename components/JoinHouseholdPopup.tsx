import { useState } from "react";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";

interface JoinHouseholdProps {
  visible: boolean;
  onDismiss: () => void;
}

export default function JoinHouseholdPopup({
  visible,
  onDismiss,
}: JoinHouseholdProps) {
  const [inviteCode, setInviteCode] = useState("");

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Gå med i hushåll</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Inbjudningskod"
            value={inviteCode}
            onChangeText={setInviteCode}
            mode="outlined"
            style={{ marginBottom: 10 }}
          />
        </Dialog.Content>
        <Dialog.Actions
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Button
            onPress={onDismiss}
            style={{ flex: 1, marginRight: 8 }}
            mode="outlined"
          >
            Avbryt
          </Button>
          <Button onPress={() => {}} style={{ flex: 1 }} mode="contained">
            Gå med
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
