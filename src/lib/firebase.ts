import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, updateDoc, arrayUnion, increment, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

import { getXPForDifficulty } from "./gamification";

// Helper to update user progress
export const updateUserProgress = async (uid: string, questionId: string, difficulty: string, title: string, category: string = "General") => {
    const userRef = doc(db, "users", uid);

    try {
        const snap = await getDoc(userRef);
        let currentStreak = 0;
        let lastSolvedDate = "";
        let solvedIds: string[] = [];
        let stats: any = {};
        let skills: any = {};

        if (snap.exists()) {
            const data = snap.data();
            solvedIds = data.solvedQuestionIds || [];
            stats = data.stats || {};
            skills = data.skills || {};
            currentStreak = stats.streak || 0;
            lastSolvedDate = stats.lastSolvedDate || "";
        }

        const updates: any = {};
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        // --- 1. Streak Logic (Updates regardless of whether question is new) ---
        // If we haven't solved anything today yet...
        if (lastSolvedDate !== today) {
            let newStreak = currentStreak;
            if (lastSolvedDate === yesterday) {
                newStreak += 1; // Continuing streak
            } else {
                newStreak = 1; // Broken streak or fresh start
            }

            updates["stats.streak"] = newStreak;
            updates["stats.lastSolvedDate"] = today;
        }

        // --- 2. New Solve Logic (Solved Count, XP, History, Skills) ---
        if (!solvedIds.includes(questionId)) {
            // Stats: Solved Count
            updates["stats.solved"] = increment(1);

            // Arrays
            updates.solvedQuestionIds = arrayUnion(questionId);

            // History
            const historyItem = {
                id: questionId,
                title: title,
                difficulty: difficulty,
                category: category,
                completedAt: Date.now()
            };
            updates.solvedHistory = arrayUnion(historyItem);

            // XP
            const xpAmount = getXPForDifficulty(difficulty);
            updates.xp = increment(xpAmount);

            // Skills
            const lowerCat = category.toLowerCase();
            let skillToUpdate = 'algos';
            if (['tree', 'graph', 'linked list', 'stack', 'queue', 'heap', 'hash', 'map'].some(k => lowerCat.includes(k))) skillToUpdate = 'ds';
            else if (['system', 'design', 'database', 'network'].some(k => lowerCat.includes(k))) skillToUpdate = 'system';
            else if (['debug', 'test'].some(k => lowerCat.includes(k))) skillToUpdate = 'debug';
            else if (['bit', 'math', 'optimization', 'greedy', 'dynamic'].some(k => lowerCat.includes(k))) skillToUpdate = 'optim';

            updates[`skills.${skillToUpdate}`] = increment(5);
        }

        // Only update if there are changes
        if (Object.keys(updates).length > 0) {
            await updateDoc(userRef, updates);
        }

    } catch (error) {
        console.error("Error updating user progress:", error);
    }
};
