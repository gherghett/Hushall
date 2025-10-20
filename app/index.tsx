import CreateHoushold from "@/components/CreateHousehold";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { ScrollView } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { ThemeToggle } from "../components/ThemeToggle";
import { UserProfile } from "../components/UserProfile";
import { useAuth } from "../hooks/useAuth";
import { db } from "../lib/firebase";
import { AppTheme } from "../lib/theme";

export default function Index() {
  const theme = useTheme() as AppTheme;
  const { user, signOut } = useAuth();

  async function testFirestore() {
    // 1) Write
    const ref = await addDoc(collection(db, "test"), {
      createdAt: Date.now(),
      hello: "world",
      userId: user?.uid,
    });
    console.log("Wrote doc id:", ref.id);

    // 2) Read once
    const snap = await getDoc(doc(db, "test", ref.id));
    console.log("Read back:", snap.data());

    // 3) Realtime listener (optional)
    const unsub = onSnapshot(doc(db, "test", ref.id), s => {
      console.log("Realtime update:", s.data());
    });

    // Update after 2s to watch the snapshot fire
    setTimeout(async () => {
      await addDoc(collection(db, "test"), { ping: "pong", ts: Date.now() });
      unsub();
    }, 2000);
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={[theme.styles.container, { paddingBottom: 40 }]}
    >
      <Text
        variant="headlineMedium"
        style={[theme.styles.title, { color: theme.colors.onBackground }]}
      >
        Hushåll
      </Text>

      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            Welcome, {user?.displayName || user?.email}!
          </Text>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurface, opacity: 0.7 }}
          >
            You are successfully authenticated.
          </Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={() => testFirestore()}
        style={{ marginBottom: 16 }}
      >
        Test Firestore
      </Button>

      <Button
        mode="outlined"
        onPress={handleSignOut}
        style={{ marginBottom: 32 }}
      >
        Sign Out
      </Button>

      <UserProfile />

      <ThemeToggle />

      <Text
        variant="bodySmall"
        style={{
          color: theme.colors.onBackground,
          textAlign: "center",
          marginTop: 20,
          opacity: 0.7,
        }}
      >
        Använd knapparna för att byta tema
      </Text>
    </ScrollView>
  );
}
