export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface TestCase {
    input: string;          // e.g., "[2, 7, 11, 15], 9"
    expectedOutput: string; // e.g., "[0, 1]"
    isHidden?: boolean;     // If true, user can't see this case in the UI
}

export interface Question {
    id: string;               // e.g., "two-sum"
    title: string;            // e.g., "Two Sum"
    difficulty: Difficulty;
    category: string;         // e.g., "Arrays"
    logicTags: string[];      // Critical for AI: ["hashing", "two-pointers"]
    description: string;      // Markdown text

    // The Code Sandbox Data
    defaultCode: {
        javascript: string;
        python: string;
        java: string;
    };

    // Validation
    testCases: TestCase[];

    order: number;            // For sorting (1, 2, 3...)

    // Skill Tree / Progression
    prerequisites?: string[]; // IDs of questions that MUST be solved first
    nextQuestionId?: string;  // ID of the recommended next question (Direct Bridge)
    similarQuestionIds?: string[]; // IDs for Lateral Moves (Fallback/Explorer mode)
}
