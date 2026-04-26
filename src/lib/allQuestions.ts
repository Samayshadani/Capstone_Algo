import { Question } from "@/types/question";
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

// Aggregate all questions
export const ALL_QUESTIONS: Question[] = [
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
    ...GRAPHS_QUESTIONS,
];

// Map Topic ID (slug) to Category Name used in Question objects
// Note: This mapping needs to align with src/lib/topics.ts IDs and src/types/question.ts Categories
// Ideally, we should normalize this, but for now we map manually.
export const TOPIC_ID_TO_CATEGORY: Record<string, string> = {
    "arrays": "Arrays",
    "strings": "Strings",
    "linked-lists": "Linked Lists",
    "math-logic": "Basic Math & Logic",
    "sliding-window": "Sliding Window",
    "binary-search": "Binary Search",
    "sorting": "Sorting Algorithms",
    "recursion": "Recursion",
    "hashing": "Hashing",
    "two-pointers": "Two Pointers",
    "stacks-queues": "Stacks & Queues",
    "bit-manipulation": "Bit Manipulation",
    "binary-trees": "Binary Trees",
    "bst": "Binary Search Trees",
    "heaps": "Heaps & Priority Queues",
    "greedy": "Greedy Algorithms",
    "backtracking": "Backtracking",
    "dp-1d": "1D Dynamic Programming",
    "dp-2d": "2D Dynamic Programming",
    "graphs": "Graphs",
};

export const getQuestionsByTopicId = (topicId: string): Question[] => {
    const category = TOPIC_ID_TO_CATEGORY[topicId];
    if (!category) return [];
    return ALL_QUESTIONS.filter(q => q.category === category);
};
