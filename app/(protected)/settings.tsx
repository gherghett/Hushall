import { ThemeToggle } from "@/components/ThemeToggle";
import { useCharacters } from "@/hooks/useCharacters";
import { AppTheme } from "@/lib/theme";
import { View, StyleSheet } from "react-native";
import {  Divider, List, Surface, Text, useTheme } from "react-native-paper";


export default function SettingsScreen() {
  const theme = useTheme() as AppTheme;
  const characters = useCharacters();

  return (
    <View style={[styles.bodyContainer]}>
      <Surface>
        <View>
          <Text style={[theme.styles.title, styles.textTitle ]}> Profil</Text>
          < Divider style={styles.dividerColor} />
        </View>
        <View>
          <Text>Rund cirkel med karaktären användaren valt/blivit tilldelad</Text>
          <Text>Input field där namnet på användaren står, ska gå att ändra</Text>
        </View>
        <View>
          < Divider style={styles.dividerColor} />
          <Text style={[theme.styles.title, styles.textTitle ]}>Hushåll</Text>
          < Divider style={styles.dividerColor} />
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
        <View>
          < Divider style={styles.dividerColor} />
          <Text style={[theme.styles.title, styles.textTitle ]}>Global</Text>
          < Divider style={styles.dividerColor} />
        </View>
        <Text>Light/dark/auto mode switch</Text>
        < Divider style={styles.dividerColor} />
        <ThemeToggle /> {/* Reminder: Dark/light/auto switch */}
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create ({
  bodyContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  dividerColor:{
    backgroundColor: "black",
  },
  textTitle: {
    textAlign: "center",
    padding: 20,
    paddingBottom: 0,
    fontSize: 20,
  },

})
