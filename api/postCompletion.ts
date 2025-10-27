import { db } from "@/lib/firebase";
import { Member } from "@/models/household";
import { doc, getDoc, updateDoc } from "@firebase/firestore";

export default async function postCompletion(
  choreId: string,
  householdId: string,
  completedBy: Member[]
): Promise<void> {
  try {
    // Get the current household data
    const householdRef = doc(db, "households", householdId);
    const householdDoc = await getDoc(householdRef);

    if (!householdDoc.exists()) {
      throw new Error("Household not found");
    }

    const householdData = householdDoc.data();
    const chores = householdData.chores || [];

    // Find the specific chore and update it
    const updatedChores = chores.map((chore: any) => {
      if (chore.id === choreId) {
        const newCompletion = {
          completedBy: completedBy,
          completedAt: new Date().toISOString(),
        };

        return {
          ...chore,
          completions: [...(chore.completions || []), newCompletion],
        };
      }
      return chore;
    });

    // Update the household with the modified chores array
    await updateDoc(householdRef, {
      chores: updatedChores,
    });

    // console.log(`Chore ${choreId} completed by ${completedBy.name}`);
  } catch (error) {
    console.error("Error adding completion:", error);
    throw error;
  }
}
