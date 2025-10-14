import { StyleSheet } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { useAuth } from "../hooks/useAuth";
import { AppTheme } from "../lib/theme";

export function UserProfile() {
  const theme = useTheme() as AppTheme;
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user) return null;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="headlineSmall" style={styles.title}>
          Profile Test View
        </Text>

        <Text
          variant="bodyLarge"
          style={[styles.info, { color: theme.colors.onSurface }]}
        >
          <Text style={{ fontWeight: "bold" }}>Name:</Text>{" "}
          {user.displayName || "Not set"}
        </Text>

        <Text
          variant="bodyLarge"
          style={[styles.info, { color: theme.colors.onSurface }]}
        >
          <Text style={{ fontWeight: "bold" }}>Email:</Text> {user.email}
        </Text>

        <Text
          variant="bodySmall"
          style={[styles.info, { color: theme.colors.onSurface, opacity: 0.7 }]}
        >
          <Text style={{ fontWeight: "bold" }}>User ID:</Text> {user.uid}
        </Text>

        <Button
          mode="outlined"
          onPress={handleSignOut}
          style={styles.signOutButton}
        >
          Sign Out
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 8,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  info: {
    marginBottom: 12,
  },
  signOutButton: {
    marginTop: 20,
  },
});
