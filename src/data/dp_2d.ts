import { Question } from "@/types/question";

export const DP_2D_QUESTIONS: Question[] = [
    {
        id: "unique-paths",
        title: "Unique Paths",
        difficulty: "Medium",
        category: "2D Dynamic Programming",
        logicTags: ["dp", "math", "combinatorics"],
        description: `There is a robot on an \`m x n\` grid. The robot is initially located at the **top-left corner** (i.e., \`grid[0][0]\`). The robot tries to move to the **bottom-right corner** (i.e., \`grid[m - 1][n - 1]\`). The robot can only move either down or right at any point in time.

Given the two integers \`m\` and \`n\`, return *the number of possible unique paths that the robot can take to reach the bottom-right corner*.

The test cases are generated so that the answer will be less than or equal to \`2 * 10^9\`.

### Example 1:
\`\`\`text
Input: m = 3, n = 7
Output: 28
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    
};`,
            python: `class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        pass`,
            java: `class Solution {
    public int uniquePaths(int m, int n) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `3, 7`, expectedOutput: `28` },
            { input: `3, 2`, expectedOutput: `3` }
        ,
        ],
        order: 181
    },
    {
        id: "longest-common-subsequence",
        title: "Longest Common Subsequence",
        difficulty: "Medium",
        category: "2D Dynamic Programming",
        logicTags: ["dp", "string"],
        description: `Given two strings \`text1\` and \`text2\`, return *the length of their longest **common subsequence**.* If there is no **common subsequence**, return \`0\`.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

*   For example, \`"ace"\` is a subsequence of \`"abcde"\`.

A **common subsequence** of two strings is a subsequence that is common to both strings.

### Example 1:
\`\`\`text
Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    
};`,
            python: `class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        pass`,
            java: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `"abcde", "ace"`, expectedOutput: `3` },
            { input: `"abc", "abc"`, expectedOutput: `3` },
            { input: `"abc", "def"`, expectedOutput: `0` }
        ,
        ],
        order: 182
    },
    {
        id: "best-time-to-buy-and-sell-stock-with-cooldown",
        title: "Best Time to Buy and Sell Stock with Cooldown",
        difficulty: "Medium",
        category: "2D Dynamic Programming",
        logicTags: ["dp", "array"],
        description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`ith\` day.

Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:

*   After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

### Example 1:
\`\`\`text
Input: prices = [1,2,3,0,2]
Output: 3
Explanation: transactions = [buy, sell, cooldown, buy, sell]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    
};`,
            python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int maxProfit(int[] prices) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[1,2,3,0,2]`, expectedOutput: `3` },
            { input: `[1]`, expectedOutput: `0` }
        ],
        order: 183
    },
    {
        id: "coin-change-ii",
        title: "Coin Change II",
        difficulty: "Medium",
        category: "2D Dynamic Programming",
        logicTags: ["dp", "array"],
        description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return *the number of combinations that make up that amount*. If that amount of money cannot be made up by any combination of the coins, return \`0\`.

You may assume that you have an infinite number of each kind of coin.

The answer is **guaranteed** to fit into a signed 32-bit integer.

### Example 1:
\`\`\`text
Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {
    
};`,
            python: `class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int change(int amount, int[] coins) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `5, [1,2,5]`, expectedOutput: `4` },
            { input: `3, [2]`, expectedOutput: `0` },
            { input: `10, [10]`, expectedOutput: `1` }
        ,
        ],
        order: 184
    },
    {
        id: "target-sum",
        title: "Target Sum",
        difficulty: "Medium",
        category: "2D Dynamic Programming",
        logicTags: ["dp", "backtracking", "array"],
        description: `You are given an integer array \`nums\` and an integer \`target\`.

You want to build an expression out of nums by adding one of the symbols \`'+'\` and \`'-'\` before each integer in nums and then concatenate all the integers.

*   For example, if \`nums = [2, 1]\`, you can add a \`'+'\` before \`2\` and a \`'-'\` before \`1\` and concatenate them to build the expression \`"+2-1"\`.

Return the number of different expressions that you can build, which evaluates to \`target\`.

### Example 1:
\`\`\`text
Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function(nums, target) {
    
};`,
            python: `class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        pass`,
            java: `class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[1,1,1,1,1], 3`, expectedOutput: `5` },
            { input: `[1], 1`, expectedOutput: `1` }
        ,
        ],
        order: 185
    },
    {
        id: "interleaving-string",
        title: "Interleaving String",
        difficulty: "Medium",
        category: "2D Dynamic Programming",
        logicTags: ["dp", "string"],
        description: `Given strings \`s1\`, \`s2\`, and \`s3\`, find whether \`s3\` is formed by an **interleaving** of \`s1\` and \`s2\`.

An **interleaving** of two strings \`s\` and \`t\` is a configuration where \`s\` and \`t\` are divided into \`n\` and \`m\` substrings respectively, such that:

*   \`s = s1 + s2 + ... + sn\`
*   \`t = t1 + t2 + ... + tm\`
*   \`|n - m| <= 1\`
*   The **interleaving** is \`s1 + t1 + s2 + t2 + s3 + t3 + ...\` or \`t1 + s1 + t2 + s2 + t3 + s3 + ...\`

Note: \`a + b\` is the concatenation of strings \`a\` and \`b\`.

### Example 1:
\`\`\`text
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function(s1, s2, s3) {
    
};`,
            python: `class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        pass`,
            java: `class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {
        return false;
    }
}`
        },
        testCases: [
            { input: `"aabcc", "dbbca", "aadbbcbcac"`, expectedOutput: `true` },
            { input: `"aabcc", "dbbca", "aadbbbaccc"`, expectedOutput: `false` },
            { input: `"", "", ""`, expectedOutput: `true` }
        ],
        order: 186
    },
    {
        id: "longest-increasing-path-in-a-matrix",
        title: "Longest Increasing Path in a Matrix",
        difficulty: "Hard",
        category: "2D Dynamic Programming",
        logicTags: ["dp", "dfs", "graph"],
        description: `Given an \`m x n\` integers \`matrix\`, return *the length of the longest increasing path in* \`matrix\`.

From each cell, you can either move in four directions: left, right, up, or down. You **may not** move diagonally or move outside the boundary (i.e., wrap-around is not allowed).

### Example 1:
\`\`\`text
Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
Output: 4
Explanation: The longest increasing path is [1, 2, 6, 9].
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function(matrix) {
    
};`,
            python: `class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        pass`,
            java: `class Solution {
    public int longestIncreasingPath(int[][] matrix) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[[9,9,4],[6,6,8],[2,1,1]]`, expectedOutput: `4` },
            { input: `[[3,4,5],[3,2,6],[2,2,1]]`, expectedOutput: `4` },
            { input: `[[1]]`, expectedOutput: `1` }
        ],
        order: 187
    },
    {
        id: "distinct-subsequences",
        title: "Distinct Subsequences",
        difficulty: "Hard",
        category: "2D Dynamic Programming",
        logicTags: ["dp", "string"],
        description: `Given two strings \`s\` and \`t\`, return *the number of distinct* **subsequences** *of* \`s\` *which equals* \`t\`.

The test cases are generated so that the answer fits on a 32-bit signed integer.

### Example 1:
\`\`\`text
Input: s = "rabbbit", t = "rabbit"
Output: 3
Explanation:
As shown below, there are 3 ways you can generate "rabbit" from s.
rabbbit
rabbbit
rabbbit
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function(s, t) {
    
};`,
            python: `class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        pass`,
            java: `class Solution {
    public int numDistinct(String s, String t) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `"rabbbit", "rabbit"`, expectedOutput: `3` },
            { input: `"babgbag", "bag"`, expectedOutput: `5` }
        ],
        order: 188
    },
    {
        id: "edit-distance",
        title: "Edit Distance",
        difficulty: "Medium",
        category: "2D Dynamic Programming",
        logicTags: ["dp", "string"],
        description: `Given two strings \`word1\` and \`word2\`, return *the minimum number of operations required to convert \`word1\` to \`word2\`*.

You have the following three operations permitted on a word:
1.  Insert a character
2.  Delete a character
3.  Replace a character

### Example 1:
\`\`\`text
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    
};`,
            python: `class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        pass`,
            java: `class Solution {
    public int minDistance(String word1, String word2) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `"horse", "ros"`, expectedOutput: `3` },
            { input: `"intention", "execution"`, expectedOutput: `5` }
        ,
        ],
        order: 189
    },
    {
        id: "maximal-square",
        title: "Maximal Square",
        difficulty: "Medium",
        category: "2D Dynamic Programming",
        logicTags: ["dp", "matrix"],
        description: `Given an \`m x n\` binary \`matrix\` filled with \`0\`'s and \`1\`'s, *find the largest square containing only* \`1\`'s *and return its area*.

### Example 1:
\`\`\`text
Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 4
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
    
};`,
            python: `class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        pass`,
            java: `class Solution {
    public int maximalSquare(char[][] matrix) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]`, expectedOutput: `4` },
            { input: `[["0","1"],["1","0"]]`, expectedOutput: `1` },
            { input: `[["0"]]`, expectedOutput: `0` }
        ,
        ],
        order: 190
    }
];
