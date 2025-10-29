import { useCurrentHousehold } from "@/atoms/household-atoms";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms/auth-atoms";

export const useCurrentUserCharacterId = () => {
  const household = useCurrentHousehold();
  const user = useAtomValue(userAtom);

  if (!household || !user) return null;

  const member = household.members.find(m => m.userId === user.uid);
  return member?.characterId ?? null;
};
