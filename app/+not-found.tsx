import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useAuth } from "../hooks/useAuth";

export default function NotFoundScreen() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log("NotFoundScreen rendered - isAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);

  const handleGoHome = () => {
    console.log(
      "NotFoundScreen: handleGoHome called, isAuthenticated:",
      isAuthenticated
    );
    if (isAuthenticated) {
      router.replace("/protected" as any);
    } else {
      router.replace("/auth" as any);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Oops!
          </Text>
          <Text variant="bodyLarge" style={styles.message}>
            The page you&apos;re looking for doesn&apos;t exist.
          </Text>
          <Button mode="contained" onPress={handleGoHome} style={styles.button}>
            Go Home
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  card: {
    padding: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
  },
  message: {
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    marginTop: 16,
  },
});
