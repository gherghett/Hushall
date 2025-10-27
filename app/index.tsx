import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingVertical: 20,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
