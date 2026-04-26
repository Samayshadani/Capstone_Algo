import { Question } from "@/types/question";

export const DP_1D_QUESTIONS: Question[] = [
    {
        id: "climbing-stairs",
        title: "Climbing Stairs",
        difficulty: "Easy",
        category: "1D Dynamic Programming",
        logicTags: ["dp", "memoization", "math"],
        description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?

### Example 1:
\`\`\`text
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    
};`,
            python: `class Solution:
    def climbStairs(self, n: int) -> int:
        pass`,
            java: `class Solution {
    public int climbStairs(int n) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `2`, expectedOutput: `2` },
            { input: `3`, expectedOutput: `3` }
        ],
        order: 171,
        nextQuestionId: "min-cost-climbing-stairs"
    },
    {
        id: "min-cost-climbing-stairs",
        title: "Min Cost Climbing Stairs",
        difficulty: "Easy",
        category: "1D Dynamic Programming",
        logicTags: ["dp", "array"],
        description: `You are given an integer array \`cost\` where \`cost[i]\` is the cost of \`ith\` step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index \`0\`, or the step with index \`1\`.

Return *the minimum cost to reach the top of the floor*.

### Example 1:
\`\`\`text
Input: cost = [10,15,20]
Output: 15
Explanation: You will start at index 1.
- Pay 15 and climb two steps to reach the top.
The total cost is 15.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
    
};`,
            python: `class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int minCostClimbingStairs(int[] cost) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[10,15,20]`, expectedOutput: `15` },
            { input: `[1,100,1,1,1,100,1,1,100,1]`, expectedOutput: `6` }
        ,
        ],
        order: 172,
        prerequisites: ["climbing-stairs"]
    },
    {
        id: "house-robber",
        title: "House Robber",
        difficulty: "Medium",
        category: "1D Dynamic Programming",
        logicTags: ["dp", "array"],
        description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array \`nums\` representing the amount of money of each house, return *the maximum amount of money you can rob tonight **without alerting the police***.

### Example 1:
\`\`\`text
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    
};`,
            python: `class Solution:
    def rob(self, nums: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int rob(int[] nums) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[1,2,3,1]`, expectedOutput: `4` },
            { input: `[2,7,9,3,1]`, expectedOutput: `12` }
        ,
        ],
        order: 173,
        nextQuestionId: "house-robber-ii"
    },
    {
        id: "house-robber-ii",
        title: "House Robber II",
        difficulty: "Medium",
        category: "1D Dynamic Programming",
        logicTags: ["dp", "array"],
        description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are **arranged in a circle**. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array \`nums\` representing the amount of money of each house, return *the maximum amount of money you can rob tonight **without alerting the police***.

### Example 1:
\`\`\`text
Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    
};`,
            python: `class Solution:
    def rob(self, nums: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int rob(int[] nums) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[2,3,2]`, expectedOutput: `3` },
            { input: `[1,2,3,1]`, expectedOutput: `4` },
            { input: `[1,2,3]`, expectedOutput: `3` }
        ,
        ],
        order: 174,
        prerequisites: ["house-robber"]
    },
    {
        id: "longest-palindromic-substring",
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        category: "1D Dynamic Programming",
        logicTags: ["dp", "string", "two-pointers"],
        description: `Given a string \`s\`, return *the longest palindromic substring* in \`s\`.

### Example 1:
\`\`\`text
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    
};`,
            python: `class Solution:
    def longestPalindrome(self, s: str) -> str:
        pass`,
            java: `class Solution {
    public String longestPalindrome(String s) {
        return "";
    }
}`
        },
        testCases: [
            { input: `"babad"`, expectedOutput: `"bab"` },
            { input: `"cbbd"`, expectedOutput: `"bb"` }
        ],
        order: 175
    },
    {
        id: "palindromic-substrings",
        title: "Palindromic Substrings",
        difficulty: "Medium",
        category: "1D Dynamic Programming",
        logicTags: ["dp", "string", "two-pointers"],
        description: `Given a string \`s\`, return *the number of **palindromic substrings** in it*.

A string is a **palindrome** when it reads the same backward as forward.

A **substring** is a contiguous sequence of characters within the string.

### Example 1:
\`\`\`text
Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
    
};`,
            python: `class Solution:
    def countSubstrings(self, s: str) -> int:
        pass`,
            java: `class Solution {
    public int countSubstrings(String s) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `"abc"`, expectedOutput: `3` },
            { input: `"aaa"`, expectedOutput: `6` }
        ],
        order: 176
    },
    {
        id: "decode-ways",
        title: "Decode Ways",
        difficulty: "Medium",
        category: "1D Dynamic Programming",
        logicTags: ["dp", "string"],
        description: `A message containing letters from \`A-Z\` can be **encoded** into numbers using the following mapping:
'A' -> "1"
'B' -> "2"
...
'Z' -> "26"

To **decode** an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, \`"11106"\` can be mapped into:
*   \`"AAJF"\` with the grouping \`(1 1 10 6)\`
*   \`"KJF"\` with the grouping \`(11 10 6)\`

Note that the grouping \`(1 11 06)\` is invalid because \`"06"\` cannot be mapped into \`'F'\` since \`"6"\` is different from \`"06"\`.

Given a string \`s\` containing only digits, return *the **number** of ways to **decode** it*.

The test cases are generated so that the answer fits in a **32-bit** integer.

### Example 1:
\`\`\`text
Input: s = "12"
Output: 2
Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    
};`,
            python: `class Solution:
    def numDecodings(self, s: str) -> int:
        pass`,
            java: `class Solution {
    public int numDecodings(String s) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `"12"`, expectedOutput: `2` },
            { input: `"226"`, expectedOutput: `3` },
            { input: `"06"`, expectedOutput: `0` }
        ,
        ],
        order: 177
    },
    {
        id: "coin-change",
        title: "Coin Change",
        difficulty: "Medium",
        category: "1D Dynamic Programming",
        logicTags: ["dp", "bfs"],
        description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return *the fewest number of coins that you need to make up that amount*. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.

### Example 1:
\`\`\`text
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    
};`,
            python: `class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        pass`,
            java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[1,2,5], 11`, expectedOutput: `3` },
            { input: `[2], 3`, expectedOutput: `-1` },
            { input: `[1], 0`, expectedOutput: `0` }
        ,
        ],
        order: 178
    },
    {
        id: "maximum-product-subarray",
        title: "Maximum Product Subarray",
        difficulty: "Medium",
        category: "1D Dynamic Programming",
        logicTags: ["dp", "array"],
        description: `Given an integer array \`nums\`, find a subarray that has the largest product, and return *the product*.

The test cases are generated so that the answer will fit in a **32-bit** integer.

### Example 1:
\`\`\`text
Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    
};`,
            python: `class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int maxProduct(int[] nums) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[2,3,-2,4]`, expectedOutput: `6` },
            { input: `[-2,0,-1]`, expectedOutput: `0` }
        ],
        order: 179
    },
    {
        id: "word-break",
        title: "Word Break",
        difficulty: "Medium",
        category: "1D Dynamic Programming",
        logicTags: ["dp", "hash-table", "trie"],
        description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

### Example 1:
\`\`\`text
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    
};`,
            python: `class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        pass`,
            java: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        return false;
    }
}`
        },
        testCases: [
            { input: `"leetcode", ["leet","code"]`, expectedOutput: `true` },
            { input: `"applepenapple", ["apple","pen"]`, expectedOutput: `true` },
            { input: `"catsandog", ["cats","dog","sand","and","cat"]`, expectedOutput: `false` }
        ,
        ],
        order: 180
    }
];
