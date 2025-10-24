import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "@firebase/firestore";

// Delete a chore by id from a household
export async function deleteChore({
  choreId,
  householdId,
}: {
  choreId: string;
  householdId: string;
}) {
  try {
    const householdRef = doc(db, "households", householdId);
    const householdSnap = await getDoc(householdRef);

    if (!householdSnap.exists()) {
      throw new Error("Household not found");
    }

    const householdData = householdSnap.data();
    const chores = householdData.chores || [];

    // Filter out the chore to delete
    const updatedChores = chores.filter((chore: any) => chore.id !== choreId);

    // Update the household with the filtered chores
    await updateDoc(householdRef, {
      chores: updatedChores,
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting chore:", error);
    throw error;
  }
}

export default deleteChore;
