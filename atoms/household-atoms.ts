import { deleteChore } from "@/api/deleteChore";
import getHouseholds from "@/api/getHouseholds";
import postChore from "@/api/postChore";
import postCompletion from "@/api/postCompletion";
import postHousehold from "@/api/postHousehold";
import queryKeys from "@/api/queryKeys";
import updateChore from "@/api/updateChore";
import joinHousehold, { editHouseholdName } from "@/api/updateHousehold";
import { Household } from "@/models/household";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { atom, useAtomValue } from "jotai";
import { userAtom } from "./auth-atoms";

// React Query hook for fetching households
export const useHouseholdsQuery = (userId: string | null) => {
  return useQuery({
    queryKey: [queryKeys.households],
    queryFn: () => getHouseholds(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Mutation for creating a new household
export const useCreateHouseholdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postHousehold,
    onSuccess: (data, variables) => {
      console.log("Household created successfully:", data);

      // Invalidate and refetch the households query
      queryClient.invalidateQueries({
        queryKey: [queryKeys.households],
      });
    },
    onError: error => {
      console.error("Error creating household:", error);
    },
  });
};

// Mutation for joining a new household
export const useJoinHouseholdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinHousehold,
    onSuccess: (data, variables) => {
      console.log("Household joined successfully:", data);

      // Invalidate and refetch the households query
      queryClient.invalidateQueries({
        queryKey: [queryKeys.households],
      });
    },
    onError: error => {
      console.error("Error joining household:", error);
    },
  });
};

export const useEditHouseholdNameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, id }: { name: any; id: any }) =>
      editHouseholdName(name, id),
    onSuccess: (data, variables) => {
      console.log("Household name edited successfully:", data);

      // Invalidate and refetch the households query
      queryClient.invalidateQueries({
        queryKey: [queryKeys.households],
      });
    },
  });
};

// Mutation for creating a new chore
export const useCreateChoreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      newChore,
      householdId,
    }: {
      newChore: any;
      householdId: string;
    }) => postChore(newChore, householdId),
    onSuccess: (data, variables) => {
      console.log("Chore created successfully:", data);

      // Invalidate and refetch the households query since chores are part of household data
      queryClient.invalidateQueries({
        queryKey: [queryKeys.households],
      });
    },
    onError: error => {
      console.error("Error creating chore:", error);
    },
  });
};

// Custom hook that combines React Query with user state
export const useUserHouseholds = () => {
  const user = useAtomValue(userAtom);
  return useHouseholdsQuery(user?.uid || null);
};

// Atom for currently selected household
export const selectedHouseholdAtom = atom<string | null>(null);

// Derived atom that tracks if user is in any household
export const hasHouseholdAtom = atom<boolean>(get => {
  // This will be used in components that call useUserHouseholds
  // For now, we'll make it simple and let components manage this logic
  return false; // Components will override this by using the query directly
});

// Helper hook for components to get household status
export const useHasHousehold = () => {
  const householdsQuery = useUserHouseholds();

  if (householdsQuery.isSuccess && householdsQuery.data) {
    return householdsQuery.data.length > 0;
  }

  return false;
};

// Helper hook to get households list
export const useHouseholdsList = () => {
  const householdsQuery = useUserHouseholds();
  return householdsQuery.data || [];
};

// Helper hook to get current household
export const useCurrentHousehold: () => Household | null = () => {
  const selectedId = useAtomValue(selectedHouseholdAtom);
  const households = useHouseholdsList();

  // If a specific household is selected, return it
  if (selectedId) {
    const selected = households.find((h: any) => h.id === selectedId);
    if (selected) return selected;
  }

  // Default to first household if no selection or selected not found
  return households[0] || null;
};

export const useIsOwnerOfCurrentHousehold = () => {
  const currentHousehold = useCurrentHousehold();
  const user = useAtomValue(userAtom);
  if (user === null || currentHousehold === null) {
    return false;
  }
  const member = currentHousehold.members.find(m => m.userId === user.uid);
  return member?.role === "owner";
};

export const useCurrentMembers = () => {
  const currentHousehold = useCurrentHousehold();
  return currentHousehold?.members ?? null;
};

export const useMemberCompletionValue = (startDate: Date, endDate: Date) => {
  const currentHousehold = useCurrentHousehold();
  if (!currentHousehold) return null;

  const weightByMember: Record<string, number> = {};

  currentHousehold.chores.forEach(chore => {
    chore.completions.forEach(completion => {
      const date: Date = new Date(completion.completedAt);
      completion.completedBy.forEach(member => {
        if (date >= startDate && date <= endDate)
          weightByMember[member.id] =
            (weightByMember[member.id] || 0) + chore.weight;
      });
    });
  });
  return weightByMember;
};

export const useChoresWithLastDone = () => {
  const currentHousehold = useCurrentHousehold();
  if (!currentHousehold) return null;

  return currentHousehold.chores.map(c => {
    // console.log(`Processing chore: ${c.title}`);
    const { completions, ...rest } = c;
    // console.log(`Completions count: ${completions.length}`);

    const lastCompletion = [...completions].sort(
      (a, b) =>
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    )[0];

    // console.log(`Last completion:`, lastCompletion);

    const daysSinceDone = lastCompletion
      ? Math.floor(
          (Date.now() - new Date(lastCompletion.completedAt).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : null;

    if (lastCompletion) {
      const now = Date.now();
      const completedTime = new Date(lastCompletion.completedAt).getTime();
      const timeDiff = now - completedTime;
      // console.log(
      //   `Now: ${now}, Completed: ${completedTime}, Diff: ${timeDiff}ms`
      // );
      // console.log(`Days since done: ${daysSinceDone}`);
    } else {
      // console.log(`No completions found, daysSinceDone: null`);
    }

    return {
      ...rest,
      daysSinceDone: daysSinceDone,
      doneBy: lastCompletion?.completedBy || null,
    };
  });
};

export const useCompleteChoreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      choreId,
      householdId,
      completedBy,
    }: {
      choreId: string;
      householdId: string;
      completedBy: any;
    }) => postCompletion(choreId, householdId, completedBy),
    onSuccess: (data, variables) => {
      console.log("Chore completed successfully:", data);
      console.log("Completed by:", variables.completedBy.name);

      // Invalidate and refetch the households query
      queryClient.invalidateQueries({
        queryKey: [queryKeys.households],
      });
    },
    onError: error => {
      console.error("Error completing chore:", error);
    },
  });
};

// Mutation for deleting a chore
export const useDeleteChoreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      choreId,
      householdId,
    }: {
      choreId: string;
      householdId: string;
    }) => deleteChore({ choreId, householdId }),
    onSuccess: (data, variables) => {
      console.log("Chore deleted successfully:", data);

      // Invalidate and refetch the households query
      queryClient.invalidateQueries({
        queryKey: [queryKeys.households],
      });
    },
    onError: error => {
      console.error("Error deleting chore:", error);
    },
  });
};

// Mutation for updating a chore
export const useUpdateChoreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      choreId,
      householdId,
      updates,
    }: {
      choreId: string;
      householdId: string;
      updates: any;
    }) => updateChore({ choreId, householdId, updates }),
    onSuccess: (data, variables) => {
      console.log("Chore updated successfully:", data);

      // Invalidate and refetch the households query
      queryClient.invalidateQueries({
        queryKey: [queryKeys.households],
      });
    },
    onError: error => {
      console.error("Error updating chore:", error);
    },
  });
};
