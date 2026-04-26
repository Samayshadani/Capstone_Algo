import { Question } from "@/types/question";

export const BIT_MANIPULATION_QUESTIONS: Question[] = [
    {
        id: "single-number",
        title: "Single Number",
        difficulty: "Easy",
        category: "Bit Manipulation",
        logicTags: ["bit-manipulation", "array"],
        description: `Given a **non-empty** array of integers \`nums\`, every element appears *twice* except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

### Example 1:
\`\`\`text
Input: nums = [2,2,1]
Output: 1
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    
};`,
            python: `class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int singleNumber(int[] nums) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[2,2,1]`, expectedOutput: `1` },
            { input: `[4,1,2,1,2]`, expectedOutput: `4` },
            { input: `[1]`, expectedOutput: `1` }
        ,
        ],
        order: 111
    },
    {
        id: "number-of-1-bits",
        title: "Number of 1 Bits",
        difficulty: "Easy",
        category: "Bit Manipulation",
        logicTags: ["bit-manipulation"],
        description: `Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the [Hamming weight](http://en.wikipedia.org/wiki/Hamming_weight)).

### Example 1:
\`\`\`text
Input: n = 11
Output: 3
Explanation: The input binary string 00000000000000000000000000001011 has a total of three set bits.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function(n) {
    
};`,
            python: `class Solution:
    def hammingWeight(self, n: int) -> int:
        pass`,
            java: `class Solution {
    public int hammingWeight(int n) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `11`, expectedOutput: `3` },
            { input: `128`, expectedOutput: `1` },
            { input: `2147483645`, expectedOutput: `30` }
        ,
        ],
        order: 112
    },
    {
        id: "counting-bits",
        title: "Counting Bits",
        difficulty: "Easy",
        category: "Bit Manipulation",
        logicTags: ["bit-manipulation", "dp"],
        description: `Given an integer \`n\`, return *an array* \`ans\` *of length* \`n + 1\` *such that for each* \`i\` (\`0 <= i <= n\`), \`ans[i]\` *is the **number of*** \`1\`***'s** in the binary representation of* \`i\`.

### Example 1:
\`\`\`text
Input: n = 2
Output: [0,1,1]
Explanation:
0 --> 0
1 --> 1
2 --> 10
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
    
};`,
            python: `class Solution:
    def countBits(self, n: int) -> List[int]:
        pass`,
            java: `class Solution {
    public int[] countBits(int n) {
        return new int[]{};
    }
}`
        },
        testCases: [
            { input: `2`, expectedOutput: `[0,1,1]` },
            { input: `5`, expectedOutput: `[0,1,1,2,1,2]` }
        ,
        ],
        order: 113
    },
    {
        id: "reverse-bits",
        title: "Reverse Bits",
        difficulty: "Easy",
        category: "Bit Manipulation",
        logicTags: ["bit-manipulation", "divide-and-conquer"],
        description: `Reverse bits of a given 32 bits unsigned integer.

### Example 1:
\`\`\`text
Input: n = 00000010100101000001111010011100
Output:    964176192 (00111001011110000010100101000000)
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} n
 * @return {number}
 */
var reverseBits = function(n) {
    
};`,
            python: `class Solution:
    def reverseBits(self, n: int) -> int:
        pass`,
            java: `class Solution {
    public int reverseBits(int n) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `43261596`, expectedOutput: `964176192` }
        ,
        ],
        order: 114
    },
    {
        id: "missing-number",
        title: "Missing Number",
        difficulty: "Easy",
        category: "Bit Manipulation",
        logicTags: ["bit-manipulation", "array", "math"],
        description: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return *the only number in the range that is missing from the array*.

### Example 1:
\`\`\`text
Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    
};`,
            python: `class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int missingNumber(int[] nums) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[3,0,1]`, expectedOutput: `2` },
            { input: `[0,1]`, expectedOutput: `2` },
            { input: `[9,6,4,2,3,5,7,0,1]`, expectedOutput: `8` }
        ,
        ],
        order: 115
    },
    {
        id: "sum-of-two-integers",
        title: "Sum of Two Integers",
        difficulty: "Medium",
        category: "Bit Manipulation",
        logicTags: ["bit-manipulation", "math"],
        description: `Given two integers \`a\` and \`b\`, return *the sum of the two integers without using the operators* \`+\` *and* \`-\`.

### Example 1:
\`\`\`text
Input: a = 1, b = 2
Output: 3
\`\`\`

### Example 2:
\`\`\`text
Input: a = 2, b = 3
Output: 5
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function(a, b) {
    
};`,
            python: `class Solution:
    def getSum(self, a: int, b: int) -> int:
        pass`,
            java: `class Solution {
    public int getSum(int a, int b) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `1, 2`, expectedOutput: `3` },
            { input: `2, 3`, expectedOutput: `5` }
        ,
        ],
        order: 116
    },
    {
        id: "reverse-integer",
        title: "Reverse Integer",
        difficulty: "Medium",
        category: "Bit Manipulation",
        logicTags: ["bit-manipulation", "math"],
        description: `Given a signed 32-bit integer \`x\`, return \`x\` *with its digits reversed*. If reversing \`x\` causes the value to go outside the signed 32-bit integer range \`[-2^31, 2^31 - 1]\`, then return \`0\`.

**Assume the environment does not allow you to store 64-bit integers (signed or unsigned).**

### Example 1:
\`\`\`text
Input: x = 123
Output: 321
\`\`\`

### Example 2:
\`\`\`text
Input: x = -123
Output: -321
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    
};`,
            python: `class Solution:
    def reverse(self, x: int) -> int:
        pass`,
            java: `class Solution {
    public int reverse(int x) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `123`, expectedOutput: `321` },
            { input: `-123`, expectedOutput: `-321` },
            { input: `120`, expectedOutput: `21` }
        ,
        ],
        order: 117
    },
    {
        id: "single-number-iii",
        title: "Single Number III",
        difficulty: "Medium",
        category: "Bit Manipulation",
        logicTags: ["bit-manipulation", "array"],
        description: `Given an integer array \`nums\`, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in **any order**.

You must write an algorithm that runs in linear runtime complexity and uses only constant extra space.

### Example 1:
\`\`\`text
Input: nums = [1,2,1,3,2,5]
Output: [3,5]
Explanation:  [5, 3] is also a valid answer.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function(nums) {
    
};`,
            python: `class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        pass`,
            java: `class Solution {
    public int[] singleNumber(int[] nums) {
        return new int[]{};
    }
}`
        },
        testCases: [
            { input: `[1,2,1,3,2,5]`, expectedOutput: `[3,5]` },
            { input: `[-1,0]`, expectedOutput: `[-1,0]` }
        ,
        ],
        order: 118
    },
    {
        id: "minimum-flips-to-make-a-or-b-equal-to-c",
        title: "Minimum Flips to Make a OR b Equal to c",
        difficulty: "Medium",
        category: "Bit Manipulation",
        logicTags: ["bit-manipulation"],
        description: `Given 3 positives numbers \`a\`, \`b\` and \`c\`. Return the minimum flips required in some bits of \`a\` and \`b\` to make ( \`a\` OR \`b\` == \`c\` ). (bitwise OR operation).
Flip operation consists of change **any** single bit 1 to 0 or change the bit 0 to 1 in their binary representation.

### Example 1:
\`\`\`text
Input: a = 2, b = 6, c = 5
Output: 3
Explanation: After flips a = 1 , b = 4 , c = 5 such that (a OR b == c)
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var minFlips = function(a, b, c) {
    
};`,
            python: `class Solution:
    def minFlips(self, a: int, b: int, c: int) -> int:
        pass`,
            java: `class Solution {
    public int minFlips(int a, int b, int c) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `2, 6, 5`, expectedOutput: `3` },
            { input: `4, 2, 7`, expectedOutput: `1` },
            { input: `1, 2, 3`, expectedOutput: `0` }
        ,
        ],
        order: 119
    },
    {
        id: "power-of-four",
        title: "Power of Four",
        difficulty: "Easy",
        category: "Bit Manipulation",
        logicTags: ["bit-manipulation", "math", "recursion"],
        description: `Given an integer \`n\`, return \`true\` if it is a power of four. Otherwise, return \`false\`.

An integer \`n\` is a power of four, if there exists an integer \`x\` such that \`n == 4^x\`.

### Example 1:
\`\`\`text
Input: n = 16
Output: true
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function(n) {
    
};`,
            python: `class Solution:
    def isPowerOfFour(self, n: int) -> bool:
        pass`,
            java: `class Solution {
    public boolean isPowerOfFour(int n) {
        return false;
    }
}`
        },
        testCases: [
            { input: `16`, expectedOutput: `true` },
            { input: `5`, expectedOutput: `false` },
            { input: `1`, expectedOutput: `true` }
        ,
        ],
        order: 120
    }
];
