import { View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { ThemeToggle } from "../components/ThemeToggle";
import { AppTheme } from "../lib/theme";

export default function Index() {
  const theme = useTheme() as AppTheme;

  // Tema test content
  return (
    <View style={[theme.styles.container, { backgroundColor: theme.colors.background }]}>
      <Text 
        variant="headlineMedium" 
        style={[theme.styles.title, { color: theme.colors.onBackground }]}
      >
        Hushåll
      </Text>
      
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            Temat funkar finnemang
          </Text>
        </Card.Content>
      </Card>

      <Button 
        mode="contained" 
        onPress={() => console.log('Button pressed!')}
        style={{ marginBottom: 16 }}
      >
        Test Button
      </Button>

      <Button 
        mode="outlined" 
        onPress={() => console.log('Outlined button pressed!')}
        style={{ marginBottom: 32 }}
      >
        Outlined Button
      </Button>

      <ThemeToggle />
      
      <Text 
        variant="bodySmall" 
        style={{ 
          color: theme.colors.onBackground, 
          textAlign: 'center', 
          marginTop: 20,
          opacity: 0.7 
        }}
      >
        Använd knapparna för att byta tema
      </Text>
    </View>
  );
}
