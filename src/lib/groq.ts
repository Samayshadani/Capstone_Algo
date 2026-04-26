import Groq from "groq-sdk";

/**
 * Rotates through available GROQ_API_KEYs from environment variables.
 * Supports: GROQ_API_KEY, GROQ_API_KEY_1, GROQ_API_KEY_2, ... up to 10.
 */
export const getGroqClient = () => {
    const keys: string[] = [];

    // 1. Check main key
    if (process.env.GROQ_API_KEY) keys.push(process.env.GROQ_API_KEY);

    // 2. Check numbered keys (1 to 10)
    for (let i = 1; i <= 10; i++) {
        const key = process.env[`GROQ_API_KEY_${i}`];
        if (key) keys.push(key);
    }

    if (keys.length === 0) {
        console.error("❌ No GROQ_API_KEY found in environment variables!");
        throw new Error("Missing Groq API Key");
    }

    // 3. Pick a random key
    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    // Log (Masked) for debugging
    // console.log(`🔑 Using Groq Key: ...${randomKey.slice(-4)} (Pool Size: ${keys.length})`);

    return new Groq({
        apiKey: randomKey
    });
};
