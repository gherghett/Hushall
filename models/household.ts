import { z } from "zod";

export const memberSchema = z.object({
  id: z.string(),
  userId: z.string().optional(), //potentiellProblem
  name: z.string().min(1, "Name is required"), //potentiellProblem
  characterId: z.enum(["0", "1", "2", "3", "4", "5", "6", "7", "8"]),
  role: z.enum(["owner", "member"]),
});

export type Member = z.infer<typeof memberSchema>;

export const completionSchema = z.object ({
    completedBy: z.array(z.string()).default ([]), //memberId
    completedAt: z.string(),
})

export const choreSchema = z.object({
  id: z.string(),
  title: z.string().min(4).max(20),
  description: z.string().min(0).max(200),
  interval: z.number().int().min(1).max(31),
  weight: z.number().int().min(1).max(10),
  completions: z.array(completionSchema).default([]),
});

export const householdSchema = z.object ({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    chores: z.array(choreSchema),
    applications: z.array(memberSchema).default([]),
    members: z.array(memberSchema).default([]),
})
