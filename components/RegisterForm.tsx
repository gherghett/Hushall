import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Text, TextInput, useTheme } from "react-native-paper";
import { useAuth } from "../hooks/useAuth";
import { AppTheme } from "../lib/theme";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const theme = useTheme() as AppTheme;
  const { signUp, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    // enkel validering byta ut mot zod?
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const result = await signUp({
      email,
      password,
      confirmPassword,
      displayName: displayName.trim() || undefined,
    });

    if (!result.success) {
      setError(result.error || "Registration failed");
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="headlineSmall" style={styles.title}>
          Create Account
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
          label="Display Name (Optional)"
          value={displayName}
          onChangeText={setDisplayName}
          mode="outlined"
          style={styles.input}
          disabled={isLoading}
        />

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

        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          disabled={isLoading}
        />

        <Button
          mode="contained"
          onPress={handleRegister}
          loading={isLoading}
          disabled={isLoading}
          style={styles.button}
        >
          Sign Up
        </Button>

        <Button
          mode="text"
          onPress={onSwitchToLogin}
          disabled={isLoading}
          style={styles.switchButton}
        >
          Already have an account? Sign In
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
