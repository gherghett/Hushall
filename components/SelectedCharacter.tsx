import * as React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import ChooseCharacter, { Character } from "@/components/ChooseCharacter";

const CIRCLE_SIZE = 80;

interface SelectedCharacterProps {
  characters: Character[];
  selectedCharacter: Character | null;
  onCharacterChange: (character: Character) => void;
}

export default function SelectedCharacter({
  characters,
  selectedCharacter,
  onCharacterChange,
}: SelectedCharacterProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{ alignItems: "center" }}>
      <Pressable onPress={() => setShowModal(true)}>
        <View
          style={[
            styles.circle,
            { backgroundColor: selectedCharacter?.colors.primary || "#ccc", width: CIRCLE_SIZE, height: CIRCLE_SIZE },
          ]}
        >
          <Text style={styles.emoji}>{selectedCharacter?.emoji || "?"}</Text>
        </View>
      </Pressable>

      {showModal && (
        <ChooseCharacter
          visible={showModal}
          onClose={() => setShowModal(false)}
          characters={characters}
          onSelectCharacter={(char) => {
            onCharacterChange(char);
            setShowModal(false);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 36,
  },
});
