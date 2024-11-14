// feedback.js
document.addEventListener("DOMContentLoaded", () => {
    const feedbackForm = document.getElementById("feedback-form");

    feedbackForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const feedbackText = document.getElementById("fb-text").value;

        try {
            const response = await fetch("http://localhost:8000/fb.html/fb", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, feedback: feedbackText }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit feedback. Server returned error.");
            }

            const result = await response.json();
            alert(result.message);
            feedbackForm.reset();
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Failed to submit feedback. Please try again.");
        }
    });
});
