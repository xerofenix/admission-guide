// models/feedbackModel.ts
import { Client } from "https://deno.land/x/mysql/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

const client = await new Client().connect({
    hostname: Deno.env.get("DB_HOST")!,
    username: Deno.env.get("DB_USER")!,
    password: Deno.env.get("DB_PASSWORD")!,
    db: Deno.env.get("DB_NAME")!,
    
});

export async function saveFeedback(email: string, feedback: string) {
    await client.execute(
        `INSERT INTO feedback (email, feedback) VALUES (?, ?)`,
        [email, feedback]
    );
}
