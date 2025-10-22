const admin = require("firebase-admin");
const mockData = require("./seedData.json");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert("./serviceAccountKey.json"), // relative path from /data
});

const db = admin.firestore();

// Utility to clear a collection
async function clearCollection(collectionName) {
  const snapshot = await db.collection(collectionName).get();
  const batch = db.batch();
  snapshot.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
  console.log(`🧹 Cleared collection: ${collectionName}`);
}

// Seed Firestore
async function seed() {
  console.log("🌱 Starting Firestore seeding...");

  await clearCollection("household");
  await clearCollection("membership");

  for (const [id, household] of Object.entries(mockData.households)) {
    await db.collection("households").doc(id).set(household);
    console.log(`✅ Added household: ${household.name}`);
  }

  for (const [id, membership] of Object.entries(mockData.memberships)) {
    await db.collection("memberships").doc(id).set(membership);
    console.log(`✅ Added membership for user: ${id}`);
  }

  console.log("🎉 Done seeding Firestore!");
}

seed().catch(console.error);
