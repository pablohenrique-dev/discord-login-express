import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),
  DISCORD_REDIRECT_URL: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  BASE_CLIENT_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid environment variables!", _env.error.format());

  throw new Error("Invalid environment variables!");
}
export const env = _env.data;
