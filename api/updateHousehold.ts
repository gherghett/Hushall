import { db } from "@/lib/firebase";
import {
  arrayUnion,
  collection,
  getDocs,
  query,
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
    const q = query(collection(db, "households"), where("code", "==", code));
    const querySnap = await getDocs(q);

    if ((await querySnap).empty) {
      return {
        success: false,
        message: "Ingen hushåll hittades med den koden",
      };
    }

    const householdDoc = querySnap.docs[0];

    await updateDoc(householdDoc.ref, {
      members: arrayUnion({
        uid: userId,
        name: userName,
      }),
    });

    return { success: true, message: "Du har gått med i hushållet!" };
  } catch (error) {
    console.error("Error joining household:", error);
    return { success: false, message: "Något gick fel. Försök igen." };
  }
}
