document.getElementById("feedback-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get input values
    const email = document.getElementById("email").value;
    const feedback = document.getElementById("fb-text").value;

    // Validate input
    if (!email || !feedback) {
        alert("Please fill out all fields.");
        return;
    }

    // Send data to the server
    try {
        const response = await fetch("http://127.0.0.1:5000/api/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, feedback }),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            document.getElementById("feedback-form").reset();
        } else {
            alert("Error: " + result.error);
        }
    } catch (err) {
        console.error(err);
        alert("Failed to submit feedback. Please try again later.");
    }
});
