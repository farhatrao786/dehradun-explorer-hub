import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export function createPublicSupabase() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    },
  );
}

export const postInputSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z
    .string()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only"),
  excerpt: z.string().max(400).nullable().optional(),
  content: z.string().max(50000).nullable().optional(),
  category: z.string().max(60).nullable().optional(),
  read_time: z.string().max(30).nullable().optional(),
  published: z.boolean(),
});

export type PostInput = z.infer<typeof postInputSchema>;
