import { z } from "zod";

export const memberSchema = z.object({
  id: z.string(),
  userId: z.string().optional(), //potentiellProblem
  name: z.string().min(1, "Name is required"), //potentiellProblem
  characterId: z.enum(["0", "1", "2", "3", "4", "5", "6", "7", "8"]),
  role: z.enum(["owner", "member"]),
});

export type Member = z.infer<typeof memberSchema>;

export const completionSchema = z.object({
  completedBy: z.array(memberSchema).default([]),
  completedAt: z.string(),
});

export const choreSchema = z.object({
  id: z.string(),
  description: z.string(),
  interval: z.string().optional(),
  weight: z.string(),
  completions: z.array(completionSchema).default([]),
});

export const householdSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  applications: z.array(z.string()).default([]),
  members: z.array(memberSchema).default([]),
});

export type Household = z.infer<typeof householdSchema>;
