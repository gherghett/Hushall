import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useCurrentHousehold } from "./household-atoms";
import { userAtom } from "./auth-atoms";
import { useAtomValue } from "jotai";

export const useUpdateUserCharacterMutation = () => {
  const user = useAtomValue(userAtom);
  const household = useCurrentHousehold();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (characterId: number) => {
      if (!user || !household) throw new Error("Ingen användare eller hushåll");
      const householdRef = doc(db, "households", household.id);
      const snap = await getDoc(householdRef);
      const data = snap.data();

      if (!data) throw new Error("Household not found in Firestore");

      const updatedMembers = (data.members || []).map((m: any) =>
        m.userId === user.uid ? { ...m, characterId } : m
      );

      await updateDoc(householdRef, { members: updatedMembers });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["households"] });

      if (household) {
        queryClient.invalidateQueries({
          queryKey: ["households", household.id],
        });
      }
    },
  });
};
