import { Question } from "@/types/question";

export const RECURSION_QUESTIONS: Question[] = [
    {
        id: "fibonacci-number",
        title: "Fibonacci Number",
        difficulty: "Easy",
        category: "Recursion",
        logicTags: ["recursion", "memoization", "math"],
        description: `The **Fibonacci numbers**, commonly denoted \`F(n)\` form a sequence, called the **Fibonacci sequence**, such that each number is the sum of the two preceding ones, starting from \`0\` and \`1\`. That is,

\`F(0) = 0, F(1) = 1\`
\`F(n) = F(n - 1) + F(n - 2)\`, for \`n > 1\`.

Given \`n\`, calculate \`F(n)\`.

### Example 1:
\`\`\`text
Input: n = 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
    
};`,
            python: `class Solution:
    def fib(self, n: int) -> int:
        pass`,
            java: `class Solution {
    public int fib(int n) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `2`, expectedOutput: `1` },
            { input: `3`, expectedOutput: `2` },
            { input: `4`, expectedOutput: `3` }
        ,
        ],
        order: 71
    },
    {
        id: "climbing-stairs",
        title: "Climbing Stairs",
        difficulty: "Easy",
        category: "Recursion",
        logicTags: ["recursion", "memoization", "dp"],
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
        ,
        ],
        order: 72
    },
    {
        id: "power-of-two",
        title: "Power of Two",
        difficulty: "Easy",
        category: "Recursion",
        logicTags: ["recursion", "bit-manipulation", "math"],
        description: `Given an integer \`n\`, return \`true\` *if it is a power of two. Otherwise, return* \`false\`.

An integer \`n\` is a power of two, if there exists an integer \`x\` such that \`n == 2^x\`.

### Example 1:
\`\`\`text
Input: n = 1
Output: true
Explanation: 2^0 = 1
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function(n) {
    
};`,
            python: `class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        pass`,
            java: `class Solution {
    public boolean isPowerOfTwo(int n) {
        return false;
    }
}`
        },
        testCases: [
            { input: `1`, expectedOutput: `true` },
            { input: `16`, expectedOutput: `true` },
            { input: `3`, expectedOutput: `false` }
        ,
        ],
        order: 73
    },
    {
        id: "reverse-string",
        title: "Reverse String",
        difficulty: "Easy",
        category: "Recursion",
        logicTags: ["recursion", "two-pointers"],
        description: `Write a function that reverses a string. The input string is given as an array of characters \`s\`.

You must do this by modifying the input array **[in-place](https://en.wikipedia.org/wiki/In-place_algorithm)** with \`O(1)\` extra memory.

### Example 1:
\`\`\`text
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    
};`,
            python: `class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        pass`,
            java: `class Solution {
    public void reverseString(char[] s) {
        
    }
}`
        },
        testCases: [
            { input: `["h","e","l","l","o"]`, expectedOutput: `["o","l","l","e","h"]` },
            { input: `["H","a","n","n","a","h"]`, expectedOutput: `["h","a","n","n","a","H"]` }
        ,
        ],
        order: 74
    },
    {
        id: "swap-nodes-in-pairs-recursion",
        title: "Swap Nodes in Pairs",
        difficulty: "Medium",
        category: "Recursion",
        logicTags: ["recursion", "linked-list"],
        description: `Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

### Example 1:
\`\`\`text
Input: head = [1,2,3,4]
Output: [2,1,4,3]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    
};`,
            python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        pass`,
            java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode swapPairs(ListNode head) {
        return null;
    }
}`
        },
        testCases: [
            { input: `[1,2,3,4]`, expectedOutput: `[2,1,4,3]` },
            { input: `[]`, expectedOutput: `[]` }
        ,
        ],
        order: 75
    },
    {
        id: "powx-n-recursion",
        title: "Pow(x, n)",
        difficulty: "Medium",
        category: "Recursion",
        logicTags: ["recursion", "math"],
        description: `Implement [pow(x, n)](http://www.cplusplus.com/reference/valarray/pow/), which calculates \`x\` raised to the power \`n\` (i.e., \`x^n\`).

### Example 1:
\`\`\`text
Input: x = 2.00000, n = 10
Output: 1024.00000
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    
};`,
            python: `class Solution:
    def myPow(self, x: float, n: int) -> float:
        pass`,
            java: `class Solution {
    public double myPow(double x, int n) {
        return 0.0;
    }
}`
        },
        testCases: [
            { input: `2.00000, 10`, expectedOutput: `1024.00000` },
            { input: `2.10000, 3`, expectedOutput: `9.26100` }
        ,
        ],
        order: 76
    },
    {
        id: "decode-string",
        title: "Decode String",
        difficulty: "Medium",
        category: "Recursion",
        logicTags: ["recursion", "stack", "string"],
        description: `Given an encoded string, return its decoded string.

The encoding rule is: \`k[encoded_string]\`, where the \`encoded_string\` inside the square brackets is being repeated exactly \`k\` times. Note that \`k\` is guaranteed to be a positive integer.

You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, \`k\`. For example, there will not be input like \`3a\` or \`2[4]\`.

### Example 1:
\`\`\`text
Input: s = "3[a]2[bc]"
Output: "aaabcbc"
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
    
};`,
            python: `class Solution:
    def decodeString(self, s: str) -> str:
        pass`,
            java: `class Solution {
    public String decodeString(String s) {
        return "";
    }
}`
        },
        testCases: [
            { input: `"3[a]2[bc]"`, expectedOutput: `"aaabcbc"` },
            { input: `"3[a2[c]]"`, expectedOutput: `"accaccacc"` }
        ,
        ],
        order: 77
    },
    {
        id: "k-th-symbol-in-grammar",
        title: "K-th Symbol in Grammar",
        difficulty: "Medium",
        category: "Recursion",
        logicTags: ["recursion", "bit-manipulation"],
        description: `We build a table of \`n\` rows (1-indexed). We start by writing \`0\` in the \`1st\` row. Now in every subsequent row, we look at the previous row and replace each occurrence of \`0\` with \`01\`, and each occurrence of \`1\` with \`10\`.

*   For example, for \`n = 3\`, the \`1st\` row is \`0\`, the \`2nd\` row is \`01\`, and the \`3rd\` row is \`0110\`.

Given two integer \`n\` and \`k\`, return the \`kth\` (1-indexed) symbol in the \`nth\` row of a table of \`n\` rows.

### Example 1:
\`\`\`text
Input: n = 1, k = 1
Output: 0
Explanation: row 1: 0
\`\`\`

### Example 2:
\`\`\`text
Input: n = 2, k = 1
Output: 0
Explanation: 
row 1: 0
row 2: 01
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var kthGrammar = function(n, k) {
    
};`,
            python: `class Solution:
    def kthGrammar(self, n: int, k: int) -> int:
        pass`,
            java: `class Solution {
    public int kthGrammar(int n, int k) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `1, 1`, expectedOutput: `0` },
            { input: `2, 1`, expectedOutput: `0` },
            { input: `2, 2`, expectedOutput: `1` }
        ,
        ],
        order: 78
    },
    {
        id: "different-ways-to-add-parentheses",
        title: "Different Ways to Add Parentheses",
        difficulty: "Medium",
        category: "Recursion",
        logicTags: ["recursion", "memoization"],
        description: `Given a string \`expression\` of numbers and operators, return *all possible results from computing all the different possible ways to group numbers and operators*. You may return the answer in **any order**.

The test cases are generated such that the output values fit in a 32-bit integer and the number of different results does not exceed \`104\`.

### Example 1:
\`\`\`text
Input: expression = "2-1-1"
Output: [0,2]
Explanation:
((2-1)-1) = 0 
(2-(1-1)) = 2
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} expression
 * @return {number[]}
 */
var diffWaysToCompute = function(expression) {
    
};`,
            python: `class Solution:
    def diffWaysToCompute(self, expression: str) -> List[int]:
        pass`,
            java: `class Solution {
    public List<Integer> diffWaysToCompute(String expression) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `"2-1-1"`, expectedOutput: `[0,2]` },
            { input: `"2*3-4*5"`, expectedOutput: `[-34,-14,-10,-10,10]` }
        ,
        ],
        order: 79
    },
    {
        id: "predict-the-winner",
        title: "Predict the Winner",
        difficulty: "Medium",
        category: "Recursion",
        logicTags: ["recursion", "minimax", "dp"],
        description: `You are given an integer array \`nums\`. Two players are playing a game with this array: player 1 and player 2.

Player 1 and player 2 take turns, with player 1 starting first. Both players start the game with a score of \`0\`. At each turn, the player takes one of the numbers from either end of the array (i.e., \`nums[0]\` or \`nums[nums.length - 1]\`) which reduces the size of the array by 1. The player adds the chosen number to their score. The game ends when there are no more elements in the array.

Return \`true\` if Player 1 can win the game. If the scores of both players are equal, then player 1 is still the winner, and you should also return \`true\`. You may assume that both players are playing optimally.

### Example 1:
\`\`\`text
Input: nums = [1,5,2]
Output: false
Explanation: Initially, player 1 can choose between 1 and 2. 
If he chooses 2 (or 1), then player 2 can choose from 1 (or 2) and 5. If player 2 chooses 5, then player 1 will be left with 1 (or 2). 
So, final score of player 1 is 1 + 2 = 3, and player 2 is 5. 
Hence, player 1 will never be the winner and you need to return false.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
var predictTheWinner = function(nums) {
    
};`,
            python: `class Solution:
    def predictTheWinner(self, nums: List[int]) -> bool:
        pass`,
            java: `class Solution {
    public boolean predictTheWinner(int[] nums) {
        return false;
    }
}`
        },
        testCases: [
            { input: `[1,5,2]`, expectedOutput: `false` },
            { input: `[1,5,233,7]`, expectedOutput: `true` }
        ,
        ],
        order: 80
    }
];
