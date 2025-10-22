import { db } from "@/lib/firebase";
import { Chore, CreateChore } from "@/models/household";
import { arrayUnion, doc, updateDoc } from "@firebase/firestore";

export default async function postChore(
  newChore: CreateChore,
  householdId: string
): Promise<Chore> {
  try {
    // Generate a unique ID for the chore
    const choreId = `chore_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create the complete chore object
    const choreToAdd: Chore = {
      id: choreId,
      title: newChore.title,
      description: newChore.description,
      interval: newChore.interval,
      weight: newChore.weight,
      completions: [], // Initialize with empty completions array
    };

    // Add the chore to the household's chores array
    const householdRef = doc(db, "households", householdId);
    await updateDoc(householdRef, {
      chores: arrayUnion(choreToAdd),
    });

    return choreToAdd;
  } catch (error) {
    console.error("Error creating chore:", error);
    throw error;
  }
}
