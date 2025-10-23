import { db } from "@/lib/firebase";
import { Chore } from "@/models/household";
import { doc, getDoc, updateDoc } from "@firebase/firestore";

// Update a chore by id
export async function updateChore({
  choreId,
  householdId,
  updates,
}: {
  choreId: string;
  householdId: string;
  updates: Partial<Chore>;
}) {
  try {
    const householdRef = doc(db, "households", householdId);
    const householdSnap = await getDoc(householdRef);

    if (!householdSnap.exists()) {
      throw new Error("Household not found");
    }

    const householdData = householdSnap.data();
    const chores = householdData.chores || [];

    // Find and update the chore
    const updatedChores = chores.map((chore: Chore) => {
      if (chore.id === choreId) {
        return { ...chore, ...updates };
      }
      return chore;
    });

    // Update the household with the updated chores
    await updateDoc(householdRef, {
      chores: updatedChores,
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating chore:", error);
    throw error;
  }
}

export default updateChore;
