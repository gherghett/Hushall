import { z } from "zod";
import { householdSchema } from "./household";

export const userSchema = z.object({
  id: z.string(),
  households: z.array(householdSchema),
});
