async function generateReply() {

    const product = document.getElementById("product").value.trim();
    const price = document.getElementById("price").value.trim();
    const message = document.getElementById("message").value.trim();

    const output = document.getElementById("output");
    const loading = document.getElementById("loading");

    if (!product || !price || !message) {
        output.innerText = "Please fill all fields.";
        return;
    }

    loading.style.display = "block";
    output.innerText = "";

    try {

        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                product,
                price,
                message
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
        }

        output.innerText = data.reply;

    } catch (error) {

        console.error(error);

        output.innerText =
            "Failed to generate reply. Please try again.";
    }

    loading.style.display = "none";
}