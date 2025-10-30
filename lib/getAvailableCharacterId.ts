import { Member } from "@/models/household";

const CHARACTER_POOL = [1, 2, 3, 4, 5, 6, 7, 8];

export function getAvailableCharacterId(members: Member[]): number | null {
  if (members.length === 0) {
    return CHARACTER_POOL[Math.floor(Math.random() * CHARACTER_POOL.length)];
  }

  const usedIds = members.map(m => m.characterId).filter(id => id != null);

  const availableIds = CHARACTER_POOL.filter(id => !usedIds.includes(id));

  if (availableIds.length === 0) {
    return null;
  }

  return availableIds[Math.floor(Math.random() * availableIds.length)];
}
