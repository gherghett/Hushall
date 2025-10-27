import { ThemeToggle } from "@/components/ThemeToggle";
import { useCharacters } from "@/hooks/useCharacters";
import { AppTheme } from "@/lib/theme";
import { View, StyleSheet } from "react-native";
import { Divider, List, Surface, Text, useTheme } from "react-native-paper";


export default function SettingsScreen() {
  const theme = useTheme() as AppTheme;
  const characters = useCharacters();

  return (
    <View style={[theme.styles.container]}>
      <Surface>
        <Text> Inställningar</Text>
        <View>
          <Text style={theme.styles.title}> Profil</Text>
        </View>
        <View>
          <Text>Rund cirkel med karaktären användaren valt/blivit tilldelad</Text>
          <Text>Input field där namnet på användaren står, ska gå att ändra</Text>
        </View>
        <View>
          <Text style={theme.styles.title}>Hushåll</Text>
        </View>
        <View>
          <Text>Input field namn på hushåll, går att ändra</Text>
        </View>
        <View>
          <Text>
            Inbjudningskod för hushållet
          </Text>
        </View>
        <View>
          <Text>Lista med alla hushållsmedlemmar</Text>
          <Text>Plus knapp för att skapa ny medlem</Text>
        </View>
        <Text style={theme.styles.title}>Global</Text>
        <Text>Light/dark/auto mode switch</Text>
        <Divider></Divider>
        <ThemeToggle />
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create ({
  headerContainer: {

  },
  textTitle: {
    textAlign: "center",

  },

})
