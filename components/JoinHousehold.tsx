import { userAtom } from "@/atoms/auth-atoms";
import { AppTheme } from "@/lib/theme";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import {
  Button,
  Card,
  Modal,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

export default function CreateHoushold() {
  const theme = useTheme() as AppTheme;
  const user = useAtomValue(userAtom);
  const [householdCode, setHouseholdCode] = useState("");
  const [modalVisible, setModalVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinHouseholdSubmit = async () => {
    setIsLoading(true);
  };

  return (
    <Modal visible={modalVisible}>
      <Card>
        <Card.Content>
          <Text variant="titleLarge">Gå med hushåll</Text>
          <TextInput
            label={"kod"}
            onChangeText={setHouseholdCode}
            mode="outlined"
          />
          <Button
            mode="contained"
            loading={isLoading}
            disabled={isLoading}
            onPress={() => {
              setModalVisible(!modalVisible);
              handleJoinHouseholdSubmit();
            }}
          >
            Join
          </Button>
        </Card.Content>
      </Card>
    </Modal>
  );
}
