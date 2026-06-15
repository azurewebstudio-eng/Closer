export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {

        const { product, price, message } = req.body;

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "system",
                            content:
                                "You are an expert ecommerce sales closer. Generate persuasive and natural DM replies that help brands increase conversions."
                        },
                        {
                            role: "user",
                            content: `
Product: ${product}

Price: ${price}

Customer Message: ${message}

Generate:

1. Friendly Reply

2. Sales Reply

3. Premium Reply

4. Urgency Reply

5. Follow-Up Message

Keep replies short, natural, human and conversion-focused.
`
                        }
                    ],
                    temperature: 0.8,
                    max_tokens: 800
                })
            }
        );

        const data = await response.json();

        return res.status(200).json({
            reply: data.choices[0].message.content
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Failed to generate reply"
        });
    }
}