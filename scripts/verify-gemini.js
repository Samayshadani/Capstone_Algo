const https = require('https');
const fs = require('fs');
const path = require('path');

// 1. Get Key from .env.local
const envPath = path.join(__dirname, '../.env.local');
let rawKeys = '';

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);
    if (match && match[1]) {
        rawKeys = match[1].trim();
        // Remove surrounding quotes if present
        if ((rawKeys.startsWith('"') && rawKeys.endsWith('"')) || (rawKeys.startsWith("'") && rawKeys.endsWith("'"))) {
            rawKeys = rawKeys.substring(1, rawKeys.length - 1);
        }
    }
} catch (e) {
    console.error("Could not read .env.local");
    process.exit(1);
}

if (!rawKeys) {
    console.error("No API Key found in .env.local");
    process.exit(1);
}

const keys = rawKeys.split(',').map(k => k.trim()).filter(k => k.length > 0);
console.log(`Found ${keys.length} API Key(s). Verifying each...`);

async function verifyKey(key, index) {
    return new Promise((resolve) => {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.error) {
                        console.error(`❌ Key #${index + 1} (...${key.slice(-4)}) Failed:`, json.error.message);
                        resolve(false);
                    } else if (json.models) {
                        const count = json.models.filter(m => m.supportedGenerationMethods.includes("generateContent")).length;
                        console.log(`✅ Key #${index + 1} (...${key.slice(-4)}) works! Access to ${count} models.`);
                        resolve(true);
                    } else {
                        console.log(`Key #${index + 1} Response:`, json);
                        resolve(false);
                    }
                } catch (e) {
                    console.error(`Key #${index + 1} Parse Error`);
                    resolve(false);
                }
            });
        }).on('error', (e) => {
            console.error(`Key #${index + 1} Network Error:`, e);
            resolve(false);
        });
    });
}

(async () => {
    let successCount = 0;
    for (let i = 0; i < keys.length; i++) {
        const passed = await verifyKey(keys[i], i);
        if (passed) successCount++;
    }

    console.log(`\nVerification Complete: ${successCount}/${keys.length} keys are active.`);
})();
