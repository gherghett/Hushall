import getHouseholds from "@/api/getHouseholds";
import postHousehold from "@/api/postHousehold";
import queryKeys from "@/api/queryKeys";
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
export const useCurrentHousehold = () => {
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
