import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  DATABASE_POOL_MAX: z.number().default(50),
  DATABASE_URL: z
    .string()
    .default("postgres://user:password@localhost:5432/postgres"),
  HOST: z.string().default("127.0.0.1"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("5050"),
});

type Env = z.infer<typeof envSchema>;
const env = envSchema.parse(process.env);

export default env;
export type { Env };
