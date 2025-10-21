import { z } from "zod";

export const memberSchema = z.object({
  id: z.string(),
  userId: z.string().optional(), //potentiellProblem
  name: z.string().min(1, "Name is required"), //potentiellProblem
  characterId: z.string().min(1, "Need avatar"), //potentiellProblem
});

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
  applications: z.array(memberSchema).default([]),
  members: z.array(memberSchema).default([]),
});
