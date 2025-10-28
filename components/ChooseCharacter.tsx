import * as React from 'react';
import { useState } from 'react';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface ChooseCharacterProps {
  visible: boolean;
  onClose: () => void;
}

export default function ChooseCharacter({ visible, onClose } : ChooseCharacterProps) {
  return (

    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modal} >
        <Text>Example Modal.  Click outside this area to dismiss.</Text>
      </Modal>
      <Button onPress={onClose}>
        Close
      </Button>
    </Portal>
  );
};
  
  const styles = StyleSheet.create({
    modal: {
      backgroundColor: "#fff",
      padding: 20, 
      margin: 20, 
      borderRadius: 8
    },
})
