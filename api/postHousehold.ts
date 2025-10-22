import { db } from "@/lib/firebase";
import generateInviteCode from "@/lib/generateInviteCode";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
} from "@firebase/firestore";

export default async function postHousehold(newHousehold: {
  name: string;
  ownerId: string;
  ownerName: string;
}) {
  try {
    const inviteCode = await generateInviteCode();
    const ref = await addDoc(collection(db, "households"), {
      name: newHousehold.name,
      code: inviteCode,
      applications: [],
      members: [
        {
          userId: newHousehold.ownerId,
          name: newHousehold.ownerName,
          role: "owner",
          characterId: 0,
        },
      ],
      chores: [],
    });

    // Create or update membership using upsert
    await setDoc(
      doc(db, "memberships", newHousehold.ownerId),
      {
        userId: newHousehold.ownerId,
        households: arrayUnion(ref.id),
      },
      { merge: true } // This enables upsert behavior
    );

    return { id: ref.id, ...newHousehold, code: inviteCode };
  } catch (error) {
    console.error("Error creating household:", error);
  }
}
