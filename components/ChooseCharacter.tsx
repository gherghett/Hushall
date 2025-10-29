import { Modal, Portal, Text } from "react-native-paper";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";

export interface Character {
  id: number;
  emoji: string;
  colors: {
    primary: string;
    onPrimary: string;
    secondary: string;
  };
}

interface ChooseCharacterProps {
  visible: boolean;
  onClose: () => void;
  characters: Character[];
  onSelectCharacter?: (character: Character) => void;
}

const NUM_COLUMNS = 4;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CIRCLE_SIZE = (SCREEN_WIDTH - 80) / NUM_COLUMNS;

export default function ChooseCharacter({
  visible,
  onClose,
  characters,
  onSelectCharacter,
}: ChooseCharacterProps) {
  const renderItem = ({ item }: { item: Character }) => (
    <PressableCircle
      character={item}
      onPress={() => {
        onSelectCharacter?.(item);
        onClose();
      }}
    />
  );

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modal}
      >
        <FlatList
          data={characters}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          numColumns={NUM_COLUMNS}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      </Modal>
    </Portal>
  );
}

const PressableCircle = ({
  character,
  onPress,
}: {
  character: Character;
  onPress: () => void;
}) => (
  <View style={{ flex: 1 / NUM_COLUMNS, alignItems: "center", margin: 5 }}>
    <Pressable
      onPress={onPress}
      style={[
        styles.circle,
        {
          backgroundColor: character.colors.primary,
          width: CIRCLE_SIZE,
          height: CIRCLE_SIZE,
        },
      ]}
    >
      <Text style={styles.emoji}>{character.emoji}</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  modal: {
    padding: 20,
    margin: 20,
    borderRadius: 12,
  },
  circle: {
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 36,
  },
});
