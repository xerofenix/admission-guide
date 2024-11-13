// routes/feedback.ts
import { Router } from "https://deno.land/x/oak/mod.ts";
import { saveFeedback } from "../models/feedbackModel.ts";

const router = new Router();

router.post("/feedback", async (context) => {
    try {
        const { email, feedback } = await context.request.body().value;

        if (!email || !feedback) {
            context.response.status = 400;
            context.response.body = { message: "Email and feedback are required." };
            return;
        }

        await saveFeedback(email, feedback);
        context.response.status = 201;
        context.response.body = { message: "Thank you for your feedback!" };
    } catch (error) {
        console.error("Error saving feedback:", error);
        context.response.status = 500;
        context.response.body = { message: "Server error, please try again later." };
    }
});

export default router;
