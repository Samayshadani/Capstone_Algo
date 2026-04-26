import { Question } from "@/types/question";

export const SLIDING_WINDOW_QUESTIONS: Question[] = [
    {
        id: "maximum-average-subarray-i",
        title: "Maximum Average Subarray I",
        difficulty: "Easy",
        category: "Sliding Window",
        logicTags: ["sliding-window", "array"],
        description: `You are given an integer array \`nums\` consisting of \`n\` elements, and an integer \`k\`.

Find a contiguous subarray whose length is equal to \`k\` that has the maximum average value and return *this value*. Any answer with a calculation error less than \`10^-5\` will be accepted.

### Example 1:
\`\`\`text
Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75000
Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
    
};`,
            python: `class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:
        pass`,
            java: `class Solution {
    public double findMaxAverage(int[] nums, int k) {
        return 0.0;
    }
}`
        },
        testCases: [
            { input: `[1,12,-5,-6,50,3], 4`, expectedOutput: `12.75000` },
            { input: `[5], 1`, expectedOutput: `5.00000` }
        ],
        order: 41
    },
    {
        id: "max-consecutive-ones-iii",
        title: "Max Consecutive Ones III",
        difficulty: "Medium",
        category: "Sliding Window",
        logicTags: ["sliding-window", "two-pointers"],
        description: `Given a binary array \`nums\` and an integer \`k\`, return *the maximum number of consecutive* \`1\`*'s in the array if you can flip at most* \`k\` \`0\`*'s*.

### Example 1:
\`\`\`text
Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function(nums, k) {
    
};`,
            python: `class Solution:
    def longestOnes(self, nums: List[int], k: int) -> int:
        pass`,
            java: `class Solution {
    public int longestOnes(int[] nums, int k) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[1,1,1,0,0,0,1,1,1,1,0], 2`, expectedOutput: `6` },
            { input: `[0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3`, expectedOutput: `10` }
        ],
        order: 42
    },
    {
        id: "permutation-in-string",
        title: "Permutation in String",
        difficulty: "Medium",
        category: "Sliding Window",
        logicTags: ["sliding-window", "two-pointers", "hash-table"],
        description: `Given two strings \`s1\` and \`s2\`, return \`true\` *if* \`s2\` *contains a permutation of* \`s1\`*, or* \`false\` *otherwise*.

In other words, return \`true\` if one of \`s1\`'s permutations is the substring of \`s2\`.

### Example 1:
\`\`\`text
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    
};`,
            python: `class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        pass`,
            java: `class Solution {
    public boolean checkInclusion(String s1, String s2) {
        return false;
    }
}`
        },
        testCases: [
            { input: `"ab", "eidbaooo"`, expectedOutput: `true` },
            { input: `"ab", "eidboaoo"`, expectedOutput: `false` }
        ],
        order: 43
    },
    {
        id: "find-all-anagrams-in-a-string",
        title: "Find All Anagrams in a String",
        difficulty: "Medium",
        category: "Sliding Window",
        logicTags: ["sliding-window", "hash-table"],
        description: `Given two strings \`s\` and \`p\`, return *an array of all the start indices of* \`p\`*'s anagrams in* \`s\`. You may return the answer in **any order**.

### Example 1:
\`\`\`text
Input: s = "cbaebabacd", p = "abc"
Output: [0,6]
Explanation:
The substring with start index = 0 is "cba", which is an anagram of "abc".
The substring with start index = 6 is "bac", which is an anagram of "abc".
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    
};`,
            python: `class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        pass`,
            java: `class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `"cbaebabacd", "abc"`, expectedOutput: `[0,6]` },
            { input: `"abab", "ab"`, expectedOutput: `[0,1,2]` }
        ],
        order: 44
    },
    {
        id: "longest-repeating-character-replacement",
        title: "Longest Repeating Character Replacement",
        difficulty: "Medium",
        category: "Sliding Window",
        logicTags: ["sliding-window", "hash-table"],
        description: `You are given a string \`s\` and an integer \`k\`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most \`k\` times.

Return *the length of the longest substring containing the same letter you can get after performing the above operations*.

### Example 1:
\`\`\`text
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
    
};`,
            python: `class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        pass`,
            java: `class Solution {
    public int characterReplacement(String s, int k) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `"ABAB", 2`, expectedOutput: `4` },
            { input: `"AABABBA", 1`, expectedOutput: `4` }
        ],
        order: 45
    },
    {
        id: "fruit-into-baskets",
        title: "Fruit Into Baskets",
        difficulty: "Medium",
        category: "Sliding Window",
        logicTags: ["sliding-window", "hash-table"],
        description: `You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array \`fruits\` where \`fruits[i]\` is the **type** of fruit the \`ith\` tree produces.

You want to collect as much fruit as possible. However, the owner has some strict rules:
1.  You only have **two** baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.
2.  Starting from any tree of your choice, you must pick exactly one fruit from **every** tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
3.  Once you reach a tree with fruit that cannot fit in your baskets, you must stop.

Given the integer array \`fruits\`, return *the maximum number of fruits you can pick*.

### Example 1:
\`\`\`text
Input: fruits = [1,2,1]
Output: 3
Explanation: We can pick from all 3 trees.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function(fruits) {
    
};`,
            python: `class Solution:
    def totalFruit(self, fruits: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int totalFruit(int[] fruits) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[1,2,1]`, expectedOutput: `3` },
            { input: `[0,1,2,2]`, expectedOutput: `3` },
            { input: `[1,2,3,2,2]`, expectedOutput: `4` }
        ],
        order: 46
    },
    {
        id: "minimum-size-subarray-sum",
        title: "Minimum Size Subarray Sum",
        difficulty: "Medium",
        category: "Sliding Window",
        logicTags: ["sliding-window", "array", "binary-search"],
        description: `Given an array of positive integers \`nums\` and a positive integer \`target\`, return *the **minimal length** of a contiguous subarray* \`[numsl, numsl+1, ..., numsr-1, numsr]\` *of which the sum is greater than or equal to* \`target\`. If there is no such subarray, return \`0\` instead.

### Example 1:
\`\`\`text
Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    
};`,
            python: `class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `7, [2,3,1,2,4,3]`, expectedOutput: `2` },
            { input: `4, [1,4,4]`, expectedOutput: `1` },
            { input: `11, [1,1,1,1,1,1,1,1]`, expectedOutput: `0` }
        ],
        order: 47
    },
    {
        id: "sliding-window-maximum",
        title: "Sliding Window Maximum",
        difficulty: "Hard",
        category: "Sliding Window",
        logicTags: ["sliding-window", "queue", "heap"],
        description: `You are given an array of integers \`nums\`, there is a sliding window of size \`k\` which is moving from the very left of the array to the very right. You can only see the \`k\` numbers in the window. Each time the sliding window moves right by one position.

Return *the max sliding window*.

### Example 1:
\`\`\`text
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    
};`,
            python: `class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        pass`,
            java: `class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        return new int[]{};
    }
}`
        },
        testCases: [
            { input: `[1,3,-1,-3,5,3,6,7], 3`, expectedOutput: `[3,3,5,5,6,7]` },
            { input: `[1], 1`, expectedOutput: `[1]` }
        ],
        order: 48
    },
    {
        id: "substring-with-concatenation-of-all-words",
        title: "Substring with Concatenation of All Words",
        difficulty: "Hard",
        category: "Sliding Window",
        logicTags: ["sliding-window", "hash-table"],
        description: `You are given a string \`s\` and an array of strings \`words\`. All the strings of \`words\` are of **the same length**.

A **concatenated substring** in \`s\` is a substring that contains all the strings of any permutation of \`words\` concatenated.

Return *the starting indices of all the concatenated substrings in* \`s\`. You can return the answer in **any order**.

### Example 1:
\`\`\`text
Input: s = "barfoothefoobarman", words = ["foo","bar"]
Output: [0,9]
Explanation: Since words.length == 2 and words[i].length == 3, the concatenated substring has to be of length 6.
The substring starting at 0 is "barfoo". It is the concatenation of ["bar","foo"] which is a permutation of words.
The substring starting at 9 is "foobar". It is the concatenation of ["foo","bar"] which is a permutation of words.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) {
    
};`,
            python: `class Solution:
    def findSubstring(self, s: str, words: List[str]) -> List[int]:
        pass`,
            java: `class Solution {
    public List<Integer> findSubstring(String s, String[] words) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `"barfoothefoobarman", ["foo","bar"]`, expectedOutput: `[0,9]` },
            { input: `"wordgoodgoodgoodbestword", ["word","good","best","word"]`, expectedOutput: `[]` }
        ],
        order: 49
    },
    {
        id: "frequency-of-the-most-frequent-element",
        title: "Frequency of the Most Frequent Element",
        difficulty: "Medium",
        category: "Sliding Window",
        logicTags: ["sliding-window", "sorting", "prefix-sum"],
        description: `The **frequency** of an element is the number of times it occurs in an array.

You are given an integer array \`nums\` and an integer \`k\`. In one operation, you can choose an index of \`nums\` and increment the element at that index by \`1\`.

Return *the **maximum possible frequency** of an element after performing **at most*** \`k\` *operations*.

### Example 1:
\`\`\`text
Input: nums = [1,2,4], k = 5
Output: 3
Explanation: Increment the first element three times and the second element two times to make nums = [4,4,4].
4 has a frequency of 3.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxFrequency = function(nums, k) {
    
};`,
            python: `class Solution:
    def maxFrequency(self, nums: List[int], k: int) -> int:
        pass`,
            java: `class Solution {
    public int maxFrequency(int[] nums, int k) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[1,2,4], 5`, expectedOutput: `3` },
            { input: `[1,4,8,13], 5`, expectedOutput: `2` }
        ],
        order: 50
    }
];
