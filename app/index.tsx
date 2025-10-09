import { View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { ThemeToggle } from "../components/ThemeToggle";
// import { readAllDocs } from "../firebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { AppTheme } from "../lib/theme";

export default function Index() {
  const theme = useTheme() as AppTheme;

  async function testFirestore() {
    // 1) Write
    const ref = await addDoc(collection(db, "test"), {
      createdAt: Date.now(),
      hello: "world",
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

  async function testAuth() {
    try {
      // 1) Sign in with test credentials
      console.log("Attempting to sign in...");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        "test@test.test",
        "test12345678"
      );
      console.log("Signed in successfully! User:", userCredential.user.email);
      console.log("User UID:", userCredential.user.uid);

      // 2) Listen for auth state changes
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          console.log("Auth state changed - User is signed in:", user.email);
        } else {
          console.log("Auth state changed - User is signed out");
        }
      });

      // 3) Sign out after 3 seconds
      setTimeout(async () => {
        console.log("Signing out...");
        await signOut(auth);
        console.log("Signed out successfully!");
        unsubscribe(); // Clean up the listener
      }, 3000);
    } catch (error) {
      console.error("Auth test failed:", error);
    }
  }

  // Tema test content
  return (
    <View
      style={[
        theme.styles.container,
        { backgroundColor: theme.colors.background },
      ]}
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
            Temat funkar finnemang
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
        onPress={() => testAuth()}
        style={{ marginBottom: 32 }}
      >
        Test Auth
      </Button>

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
    </View>
  );
}
