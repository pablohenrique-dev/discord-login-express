import { z } from "zod";

export const userTokenParamSchema = z.object({
  id: z.string(),
});