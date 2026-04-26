import { db } from "@/lib/firebase";
import { collection, doc, writeBatch } from "firebase/firestore";
import { ARRAY_QUESTIONS } from "@/data/arrays";
import { STRING_QUESTIONS } from "@/data/strings";
import { LINKED_LIST_QUESTIONS } from "@/data/linked_lists";
import { BASIC_MATH_QUESTIONS } from "@/data/basic_math";
import { SLIDING_WINDOW_QUESTIONS } from "@/data/sliding_window";
import { BINARY_SEARCH_QUESTIONS } from "@/data/binary_search";
import { SORTING_QUESTIONS } from "@/data/sorting";
import { RECURSION_QUESTIONS } from "@/data/recursion";
import { HASHING_QUESTIONS } from "@/data/hashing";
import { TWO_POINTERS_QUESTIONS } from "@/data/two_pointers";
import { STACKS_QUEUES_QUESTIONS } from "@/data/stacks_queues";
import { BIT_MANIPULATION_QUESTIONS } from "@/data/bit_manipulation";
import { BINARY_TREE_QUESTIONS } from "@/data/binary_trees";
import { BST_QUESTIONS } from "@/data/bst";
import { HEAPS_QUESTIONS } from "@/data/heaps";
import { GREEDY_QUESTIONS } from "@/data/greedy";
import { BACKTRACKING_QUESTIONS } from "@/data/backtracking";
import { DP_1D_QUESTIONS } from "@/data/dp_1d";
import { DP_2D_QUESTIONS } from "@/data/dp_2d";
import { GRAPHS_QUESTIONS } from "@/data/graphs";

export const seedQuestions = async () => {
    console.log("🌱 Starting Seed Process...");

    try {
        const batch = writeBatch(db);
        const ALL_QUESTIONS = [
            ...ARRAY_QUESTIONS,
            ...STRING_QUESTIONS,
            ...LINKED_LIST_QUESTIONS,
            ...BASIC_MATH_QUESTIONS,
            ...SLIDING_WINDOW_QUESTIONS,
            ...BINARY_SEARCH_QUESTIONS,
            ...SORTING_QUESTIONS,
            ...RECURSION_QUESTIONS,
            ...HASHING_QUESTIONS,
            ...TWO_POINTERS_QUESTIONS,
            ...STACKS_QUEUES_QUESTIONS,
            ...BIT_MANIPULATION_QUESTIONS,
            ...BINARY_TREE_QUESTIONS,
            ...BST_QUESTIONS,
            ...HEAPS_QUESTIONS,
            ...GREEDY_QUESTIONS,
            ...BACKTRACKING_QUESTIONS,
            ...DP_1D_QUESTIONS,
            ...DP_2D_QUESTIONS,
            ...GRAPHS_QUESTIONS
        ];

        console.log(`Preparing to seed ${ALL_QUESTIONS.length} questions...`);

        ALL_QUESTIONS.forEach((question) => {
            const docRef = doc(collection(db, "questions"), question.id);
            batch.set(docRef, question);
        });

        await batch.commit();
        console.log(`✅ Successfully seeded ${ALL_QUESTIONS.length} questions across 20 Topics!`);
        
    } catch (error) {
        console.error("❌ Seeding Failed:", error);
        
    }
};
