import { Question } from "@/types/question";

export const BACKTRACKING_QUESTIONS: Question[] = [
    {
        id: "subsets",
        title: "Subsets",
        difficulty: "Medium",
        category: "Backtracking",
        logicTags: ["backtracking", "bit-manipulation"],
        description: `Given an integer array \`nums\` of **unique** elements, return *all possible subsets (the power set)*.

The solution set **must not** contain duplicate subsets. Return the solution in **any order**.

### Example 1:
\`\`\`text
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    
};`,
            python: `class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        pass`,
            java: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `[1,2,3]`, expectedOutput: `[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]` },
            { input: `[0]`, expectedOutput: `[[],[0]]` }
        ,
        ],
        order: 161
    },
    {
        id: "subsets-ii",
        title: "Subsets II",
        difficulty: "Medium",
        category: "Backtracking",
        logicTags: ["backtracking", "bit-manipulation"],
        description: `Given an integer array \`nums\` that may contain duplicates, return *all possible subsets (the power set)*.

The solution set **must not** contain duplicate subsets. Return the solution in **any order**.

### Example 1:
\`\`\`text
Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    
};`,
            python: `class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        pass`,
            java: `class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `[1,2,2]`, expectedOutput: `[[],[1],[1,2],[1,2,2],[2],[2,2]]` },
            { input: `[0]`, expectedOutput: `[[],[0]]` }
        ,
        ],
        order: 162
    },
    {
        id: "permutations",
        title: "Permutations",
        difficulty: "Medium",
        category: "Backtracking",
        logicTags: ["backtracking"],
        description: `Given an array \`nums\` of distinct integers, return *all the possible permutations*. You can return the answer in **any order**.

### Example 1:
\`\`\`text
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    
};`,
            python: `class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        pass`,
            java: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `[1,2,3]`, expectedOutput: `[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]` },
            { input: `[0,1]`, expectedOutput: `[[0,1],[1,0]]` }
        ,
        ],
        order: 163
    },
    {
        id: "combination-sum",
        title: "Combination Sum",
        difficulty: "Medium",
        category: "Backtracking",
        logicTags: ["backtracking", "array"],
        description: `Given an array of **distinct** integers \`candidates\` and a target integer \`target\`, return *a list of all **unique combinations** of* \`candidates\` *where the chosen numbers sum to* \`target\`. You may return the combinations in **any order**.

The **same** number may be chosen from \`candidates\` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

### Example 1:
\`\`\`text
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    
};`,
            python: `class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        pass`,
            java: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `[2,3,6,7], 7`, expectedOutput: `[[2,2,3],[7]]` },
            { input: `[2,3,5], 8`, expectedOutput: `[[2,2,2,2],[2,3,3],[3,5]]` }
        ,
        ],
        order: 164
    },
    {
        id: "combination-sum-ii",
        title: "Combination Sum II",
        difficulty: "Medium",
        category: "Backtracking",
        logicTags: ["backtracking", "array"],
        description: `Given a collection of candidate numbers (\`candidates\`) and a target number (\`target\`), find all unique combinations in \`candidates\` where the candidate numbers sum to \`target\`.

Each number in \`candidates\` may only be used **once** in the combination.

Note: The solution set must not contain duplicate combinations.

### Example 1:
\`\`\`text
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    
};`,
            python: `class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        pass`,
            java: `class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `[10,1,2,7,6,1,5], 8`, expectedOutput: `[[1,1,6],[1,2,5],[1,7],[2,6]]` },
            { input: `[2,5,2,1,2], 5`, expectedOutput: `[[1,2,2],[5]]` }
        ,
        ],
        order: 165
    },
    {
        id: "word-search",
        title: "Word Search",
        difficulty: "Medium",
        category: "Backtracking",
        logicTags: ["backtracking", "array", "matrix"],
        description: `Given an \`m x n\` grid of characters \`board\` and a string \`word\`, return \`true\` *if* \`word\` *exists in the grid*.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

### Example 1:
\`\`\`text
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    
};`,
            python: `class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        pass`,
            java: `class Solution {
    public boolean exist(char[][] board, String word) {
        return false;
    }
}`
        },
        testCases: [
            { input: `[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"`, expectedOutput: `true` },
            { input: `[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE"`, expectedOutput: `true` },
            { input: `[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB"`, expectedOutput: `false` }
        ,
        ],
        order: 166
    },
    {
        id: "palindrome-partitioning",
        title: "Palindrome Partitioning",
        difficulty: "Medium",
        category: "Backtracking",
        logicTags: ["backtracking", "string", "dp"],
        description: `Given a string \`s\`, partition \`s\` such that every substring of the partition is a **palindrome**. Return *all possible palindrome partitioning of* \`s\`.

### Example 1:
\`\`\`text
Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    
};`,
            python: `class Solution:
    def partition(self, s: str) -> List[List[str]]:
        pass`,
            java: `class Solution {
    public List<List<String>> partition(String s) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `"aab"`, expectedOutput: `[["a","a","b"],["aa","b"]]` },
            { input: `"a"`, expectedOutput: `[["a"]]` }
        ,
        ],
        order: 167
    },
    {
        id: "letter-combinations-of-a-phone-number",
        title: "Letter Combinations of a Phone Number",
        difficulty: "Medium",
        category: "Backtracking",
        logicTags: ["backtracking", "string", "hash-table"],
        description: `Given a string containing digits from \`2-9\` inclusive, return all possible letter combinations that the number could represent. Return the answer in **any order**.

A mapping of digits to letters (just like on the telephone buttons) is as follows. Note that 1 does not map to any letters.
2: "abc"
3: "def"
4: "ghi"
5: "jkl"
6: "mno"
7: "pqrs"
8: "tuv"
9: "wxyz"

### Example 1:
\`\`\`text
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    
};`,
            python: `class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        pass`,
            java: `class Solution {
    public List<String> letterCombinations(String digits) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `"23"`, expectedOutput: `["ad","ae","af","bd","be","bf","cd","ce","cf"]` },
            { input: `""`, expectedOutput: `[]` },
            { input: `"2"`, expectedOutput: `["a","b","c"]` }
        ,
        ],
        order: 168
    },
    {
        id: "n-queens",
        title: "N-Queens",
        difficulty: "Hard",
        category: "Backtracking",
        logicTags: ["backtracking", "array"],
        description: `The **n-queens** puzzle is the problem of placing \`n\` queens on an \`n x n\` chessboard such that no two queens attack each other.

Given an integer \`n\`, return *all distinct solutions to the **n-queens puzzle***. You may return the answer in **any order**.

Each solution contains a distinct board configuration of the n-queens' placement, where \`'Q'\` and \`'.'\` both indicate a queen and an empty space, respectively.

### Example 1:
\`\`\`text
Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    
};`,
            python: `class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        pass`,
            java: `class Solution {
    public List<List<String>> solveNQueens(int n) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `4`, expectedOutput: `[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]` },
            { input: `1`, expectedOutput: `[["Q"]]` }
        ,
        ],
        order: 169
    },
    {
        id: "sudoku-solver",
        title: "Sudoku Solver",
        difficulty: "Hard",
        category: "Backtracking",
        logicTags: ["backtracking", "matrix", "hash-table"],
        description: `Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy all of the following rules:
1.  Each of the digits \`1-9\` must occur exactly once in each row.
2.  Each of the digits \`1-9\` must occur exactly once in each column.
3.  Each of the digits \`1-9\` must occur exactly once in each of the 9 \`3x3\` sub-boxes of the grid.

The \`'.'\` character indicates empty cells.

### Example 1:
\`\`\`text
Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
    
};`,
            python: `class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        pass`,
            java: `class Solution {
    public void solveSudoku(char[][] board) {
        
    }
}`
        },
        testCases: [
            { input: `[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]`, expectedOutput: `[["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]` }
        ],
        order: 170
    }
];
