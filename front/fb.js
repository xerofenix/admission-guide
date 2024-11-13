// feedback.js
document.addEventListener("DOMContentLoaded", () => {
    const feedbackForm = document.getElementById("fb-form");

    feedbackForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const feedbackText = document.getElementById("fb-text").value;

        try {
            const response = await fetch("http://localhost:8000/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, feedback: feedbackText }),
            });

            const result = await response.json();
            alert(result.message);
            feedbackForm.reset();
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Failed to submit feedback. Please try again.");
        }
    });
});
