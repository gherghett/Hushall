import { db } from "@/lib/firebase";
import { getAvailableCharacterId } from "@/lib/getAvailableCharacterId";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

interface JoinHouseholdProps {
  code: string;
  userId: string;
  userName: string;
}

export default async function joinHousehold({
  code,
  userId,
  userName,
}: JoinHouseholdProps): Promise<{ success: boolean; message: string }> {
  try {
    const q = query(
      collection(db, "households"),
      where("code", "==", code.trim().toUpperCase())
    );
    const querySnap = await getDocs(q);

    if ((await querySnap).empty) {
      return {
        success: false,
        message: "Ingen hushåll hittades med den koden",
      };
    }

    const householdDoc = querySnap.docs[0];
    const data = householdDoc.data();

    const alreadyMember = data.members?.some(
      (member: any) => member.userId === userId
    );
    if (alreadyMember) {
      return {
        success: false,
        message: "Du är redan medlem i det här hushållet.",
      };
    }

    const assignedCharacterId = getAvailableCharacterId(data.members);

    if (!assignedCharacterId) {
      return {
        success: false,
        message: "Inga fler ikoner är tillgängliga i det här hushållet.",
      };
    }

    await updateDoc(householdDoc.ref, {
      members: arrayUnion({
        id: userId, // detta behövs okej
        characterId: assignedCharacterId,
        userId: userId,
        name: userName,
        role: "member",
      }),
    });

    await setDoc(
      doc(db, "memberships", userId),
      {
        userId: userId,
        households: arrayUnion(householdDoc.ref.id),
      },
      { merge: true } // This enables upsert behavior
    );

    return { success: true, message: "Du har gått med i hushållet!" };
  } catch (error) {
    console.error("Error joining household:", error);
    return { success: false, message: "Något gick fel. Försök igen." };
  }
}

export async function editHouseholdName(name: string, id: string) {
  const q = query(collection(db, "households"), where("id", "==", id));
  const querySnap = await getDocs(q);

  const householdDoc = querySnap.docs[0];

  await updateDoc(householdDoc.ref, {
    name: name,
  });
  return { success: true, message: "Hushålls namn ändrat!" };
}
