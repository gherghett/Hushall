import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Text, TextInput, useTheme } from "react-native-paper";
import { useAuth } from "../hooks/useAuth";
import { AppTheme } from "../lib/theme";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const theme = useTheme() as AppTheme;
  const { signIn, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const result = await signIn({ email, password });
    if (!result.success) {
      setError(result.error || "Login failed");
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="headlineSmall" style={styles.title}>
          Welcome Back
        </Text>

        {error ? (
          <Text
            variant="bodyMedium"
            style={[styles.error, { color: theme.colors.error }]}
          >
            {error}
          </Text>
        ) : null}

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          disabled={isLoading}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          disabled={isLoading}
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          loading={isLoading}
          disabled={isLoading}
          style={styles.button}
        >
          Sign In
        </Button>

        <Button
          mode="text"
          onPress={onSwitchToRegister}
          disabled={isLoading}
          style={styles.switchButton}
        >
          Don&apos;t have an account? Sign Up
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
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
  },
  switchButton: {
    marginTop: 8,
  },
  error: {
    textAlign: "center",
    marginBottom: 16,
  },
});
