import {
    Calculator,
    Hash,
    Type,
    MousePointer2,
    MoveHorizontal,
    Search,
    ArrowUpDown,
    RotateCw,
    Database,
    Link,
    Layers,
    Binary,
    Network,
    GitFork,
    ListOrdered,
    TrendingUp,
    Undo2,
    Box,
    Grid,
    Share2
} from "lucide-react";

export const LEVELS = [
    { id: 1, title: "Level 1: Syntax & Logic (Basics)" },
    { id: 2, title: "Level 2: Fundamental Algorithms" },
    { id: 3, title: "Level 3: Intermediate Data Structures" },
    { id: 4, title: "Level 4: Non-Linear Data Structures" },
    { id: 5, title: "Level 5: Advanced & Expert" },
];

export const TOPICS = [
    // --- LEVEL 1 ---
    {
        id: 'math-logic',
        title: 'Basic Math & Logic',
        description: 'Fundamental logic and mathematical operations.',
        total: 10,
        level: 1,
        icon: Calculator
    },
    {
        id: 'arrays',
        title: 'Arrays (Basics)',
        description: 'Working with contiguous memory blocks.',
        total: 10,
        level: 1,
        icon: Hash
    },
    {
        id: 'strings',
        title: 'String Manipulation',
        description: 'Parsing and mutating text data.',
        total: 10,
        level: 1,
        icon: Type
    },

    // --- LEVEL 2 ---
    {
        id: 'two-pointers',
        title: 'Two Pointers',
        description: 'Optimizing time using multiple cursors.',
        total: 10,
        level: 2,
        icon: MousePointer2
    },
    {
        id: 'sliding-window',
        title: 'Sliding Window',
        description: 'Analyzing subarrays efficiently.',
        total: 10,
        level: 2,
        icon: MoveHorizontal
    },
    {
        id: 'binary-search',
        title: 'Binary Search',
        description: 'Finding elements in logarithmic time.',
        total: 10,
        level: 2,
        icon: Search
    },
    {
        id: 'sorting',
        title: 'Sorting Algorithms',
        description: 'Ordering data for efficient retrieval.',
        total: 10,
        level: 2,
        icon: ArrowUpDown
    },
    {
        id: 'recursion',
        title: 'Recursion (Basic)',
        description: 'Solving problems by self-reference.',
        total: 10,
        level: 2,
        icon: RotateCw
    },

    // --- LEVEL 3 ---
    {
        id: 'hashing',
        title: 'Hashing (HashMaps)',
        description: 'Fast lookups using key-value pairs.',
        total: 10,
        level: 3,
        icon: Database
    },
    {
        id: 'linked-lists',
        title: 'Linked Lists',
        description: 'Linear collections of nodes.',
        total: 10,
        level: 3,
        icon: Link
    },
    {
        id: 'stacks-queues',
        title: 'Stacks & Queues',
        description: 'LIFO and FIFO data structures.',
        total: 10,
        level: 3,
        icon: Layers
    },
    {
        id: 'bit-manipulation',
        title: 'Bit Manipulation',
        description: 'Optimization at the binary level.',
        total: 10,
        level: 3,
        icon: Binary
    },

    // --- LEVEL 4 ---
    {
        id: 'binary-trees',
        title: 'Binary Trees',
        description: 'Hierarchical node structures.',
        total: 10,
        level: 4,
        icon: Network
    },
    {
        id: 'bst',
        title: 'Binary Search Trees',
        description: 'Ordered trees for fast operations.',
        total: 10,
        level: 4,
        icon: GitFork
    },
    {
        id: 'heaps',
        title: 'Heaps & Priority Queues',
        description: 'Managing maximum or minimum elements.',
        total: 10,
        level: 4,
        icon: ListOrdered
    },

    // --- LEVEL 5 ---
    {
        id: 'greedy',
        title: 'Greedy Algorithms',
        description: 'Making locally optimal choices.',
        total: 10,
        level: 5,
        icon: TrendingUp
    },
    {
        id: 'backtracking',
        title: 'Backtracking',
        description: 'Solving constraint satisfaction problems.',
        total: 10,
        level: 5,
        icon: Undo2
    },
    {
        id: 'dp-1d',
        title: 'Dynamic Programming (1D)',
        description: 'Optimizing linear recursive problems.',
        total: 10,
        level: 5,
        icon: Box
    },
    {
        id: 'dp-2d',
        title: 'Dynamic Programming (2D)',
        description: 'Optimizing grid-based problems.',
        total: 10,
        level: 5,
        icon: Grid
    },
    {
        id: 'graphs',
        title: 'Graphs (BFS/DFS)',
        description: 'Traversing complex networks.',
        total: 10,
        level: 5,
        icon: Share2
    },
];
