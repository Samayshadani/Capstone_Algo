import { Question } from "@/types/question";

export const HASHING_QUESTIONS: Question[] = [
    {
        id: "intersection-of-two-arrays-hashing",
        title: "Intersection of Two Arrays",
        difficulty: "Easy",
        category: "Hashing",
        logicTags: ["hashing", "set"],
        description: `Given two integer arrays \`nums1\` and \`nums2\`, return *an array of their intersection*. Each element in the result must be **unique** and you may return the result in **any order**.

### Example 1:
\`\`\`text
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]
\`\`\`

### Example 2:
\`\`\`text
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]
Explanation: [4,9] is also accepted.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
    
};`,
            python: `class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        pass`,
            java: `class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        return new int[]{};
    }
}`
        },
        testCases: [
            { input: `[1,2,2,1], [2,2]`, expectedOutput: `[2]` },
            { input: `[4,9,5], [9,4,9,8,4]`, expectedOutput: `[9,4]` }
        ,
        ],
        order: 81
    },
    {
        id: "happy-number",
        title: "Happy Number",
        difficulty: "Easy",
        category: "Hashing",
        logicTags: ["hashing", "math"],
        description: `Write an algorithm to determine if a number \`n\` is "happy".

A happy number is a number defined by the following process:
*   Starting with any positive integer, replace the number by the sum of the squares of its digits.
*   Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
*   Those numbers for which this process ends in 1 are happy.

Return \`true\` *if* \`n\` *is a happy number, and* \`false\` *if not*.

### Example 1:
\`\`\`text
Input: n = 19
Output: true
Explanation:
1^2 + 9^2 = 82
8^2 + 2^2 = 68
6^2 + 8^2 = 100
1^2 + 0^2 + 0^2 = 1
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
    
};`,
            python: `class Solution:
    def isHappy(self, n: int) -> bool:
        pass`,
            java: `class Solution {
    public boolean isHappy(int n) {
        return false;
    }
}`
        },
        testCases: [
            { input: `19`, expectedOutput: `true` },
            { input: `2`, expectedOutput: `false` }
        ,
        ],
        order: 82
    },
    {
        id: "isomorphic-strings",
        title: "Isomorphic Strings",
        difficulty: "Easy",
        category: "Hashing",
        logicTags: ["hashing", "string"],
        description: `Given two strings \`s\` and \`t\`, determine if they are isomorphic.

Two strings \`s\` and \`t\` are isomorphic if the characters in \`s\` can be replaced to get \`t\`.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

### Example 1:
\`\`\`text
Input: s = "egg", t = "add"
Output: true
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
    
};`,
            python: `class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        pass`,
            java: `class Solution {
    public boolean isIsomorphic(String s, String t) {
        return false;
    }
}`
        },
        testCases: [
            { input: `"egg", "add"`, expectedOutput: `true` },
            { input: `"foo", "bar"`, expectedOutput: `false` },
            { input: `"paper", "title"`, expectedOutput: `true` }
        ,
        ],
        order: 83
    },
    {
        id: "word-pattern",
        title: "Word Pattern",
        difficulty: "Easy",
        category: "Hashing",
        logicTags: ["hashing", "string"],
        description: `Given a \`pattern\` and a string \`s\`, find if \`s\` follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in \`pattern\` and a **non-empty** word in \`s\`.

### Example 1:
\`\`\`text
Input: pattern = "abba", s = "dog cat cat dog"
Output: true
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function(pattern, s) {
    
};`,
            python: `class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        pass`,
            java: `class Solution {
    public boolean wordPattern(String pattern, String s) {
        return false;
    }
}`
        },
        testCases: [
            { input: `"abba", "dog cat cat dog"`, expectedOutput: `true` },
            { input: `"abba", "dog cat cat fish"`, expectedOutput: `false` },
            { input: `"aaaa", "dog cat cat dog"`, expectedOutput: `false` }
        ,
        ],
        order: 84
    },
    {
        id: "design-hashmap",
        title: "Design HashMap",
        difficulty: "Easy",
        category: "Hashing",
        logicTags: ["hashing", "design"],
        description: `Design a HashMap without using any built-in hash table libraries.

Implement the \`MyHashMap\` class:

*   \`MyHashMap()\`: initializes the object with an empty map.
*   \`void put(int key, int value)\`: inserts a \`(key, value)\` pair into the HashMap. If the \`key\` already exists in the map, update the corresponding \`value\`.
*   \`int get(int key)\`: returns the \`value\` to which the specified \`key\` is mapped, or \`-1\` if this map contains no mapping for the \`key\`.
*   \`void remove(int key)\`: removes the \`key\` and its corresponding \`value\` if the map contains the mapping for the \`key\`.

### Example 1:
\`\`\`text
Input: ["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
[[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
Output: [null, null, null, 1, -1, null, 1, null, -1]
\`\`\`
`,
        defaultCode: {
            javascript: `
var MyHashMap = function() {
    
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function(key, value) {
    
};

/** 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function(key) {
    
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function(key) {
    
};`,
            python: `class MyHashMap:

    def __init__(self):
        pass

    def put(self, key: int, value: int) -> None:
        pass

    def get(self, key: int) -> int:
        pass

    def remove(self, key: int) -> None:
        pass`,
            java: `class MyHashMap {

    public MyHashMap() {
        
    }
    
    public void put(int key, int value) {
        
    }
    
    public int get(int key) {
        return -1;
    }
    
    public void remove(int key) {
        
    }
}`
        },
        testCases: [
            { input: `["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"], [[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]`, expectedOutput: `[null, null, null, 1, -1, null, 1, null, -1]` }
        ],
        order: 85
    },
    {
        id: "subarray-sum-equals-k",
        title: "Subarray Sum Equals K",
        difficulty: "Medium",
        category: "Hashing",
        logicTags: ["hashing", "prefix-sum"],
        description: `Given an array of integers \`nums\` and an integer \`k\`, return *the total number of subarrays whose sum equals to* \`k\`.

A subarray is a contiguous non-empty sequence of elements within an array.

### Example 1:
\`\`\`text
Input: nums = [1,1,1], k = 2
Output: 2
\`\`\`

### Example 2:
\`\`\`text
Input: nums = [1,2,3], k = 3
Output: 2
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    
};`,
            python: `class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        pass`,
            java: `class Solution {
    public int subarraySum(int[] nums, int k) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[1,1,1], 2`, expectedOutput: `2` },
            { input: `[1,2,3], 3`, expectedOutput: `2` }
        ,
        ],
        order: 86
    },
    {
        id: "longest-consecutive-sequence",
        title: "Longest Consecutive Sequence",
        difficulty: "Medium",
        category: "Hashing",
        logicTags: ["hashing", "union-find"],
        description: `Given an unsorted array of integers \`nums\`, return *the length of the longest consecutive elements sequence*.

You must write an algorithm that runs in \`O(n)\` time.

### Example 1:
\`\`\`text
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    
};`,
            python: `class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int longestConsecutive(int[] nums) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[100,4,200,1,3,2]`, expectedOutput: `4` },
            { input: `[0,3,7,2,5,8,4,6,0,1]`, expectedOutput: `9` }
        ,
        ],
        order: 87
    },
    {
        id: "find-all-duplicates-in-an-array",
        title: "Find All Duplicates in an Array",
        difficulty: "Medium",
        category: "Hashing",
        logicTags: ["hashing", "array"],
        description: `Given an integer array \`nums\` of length \`n\` where all the integers of \`nums\` are in the range \`[1, n]\` and each integer appears **once** or **twice**, return *an array of all the integers that appears **twice***.

You must write an algorithm that runs in \`O(n)\` time and uses only constant extra space.

### Example 1:
\`\`\`text
Input: nums = [4,3,2,7,8,2,3,1]
Output: [2,3]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function(nums) {
    
};`,
            python: `class Solution:
    def findDuplicates(self, nums: List[int]) -> List[int]:
        pass`,
            java: `class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `[4,3,2,7,8,2,3,1]`, expectedOutput: `[2,3]` },
            { input: `[1,1,2]`, expectedOutput: `[1]` },
            { input: `[1]`, expectedOutput: `[]` }
        ,
        ],
        order: 88
    },
    {
        id: "first-unique-character-in-a-string",
        title: "First Unique Character in a String",
        difficulty: "Easy",
        category: "Hashing",
        logicTags: ["hashing", "string", "queue"],
        description: `Given a string \`s\`, find the first non-repeating character in it and return its index. If it does not exist, return \`-1\`.

### Example 1:
\`\`\`text
Input: s = "leetcode"
Output: 0
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    
};`,
            python: `class Solution:
    def firstUniqChar(self, s: str) -> int:
        pass`,
            java: `class Solution {
    public int firstUniqChar(String s) {
        return -1;
    }
}`
        },
        testCases: [
            { input: `"leetcode"`, expectedOutput: `0` },
            { input: `"loveleetcode"`, expectedOutput: `2` },
            { input: `"aabb"`, expectedOutput: `-1` }
        ,
        ],
        order: 89
    },
    {
        id: "4sum",
        title: "4Sum",
        difficulty: "Medium",
        category: "Hashing",
        logicTags: ["hashing", "two-pointers"],
        description: `Given an array \`nums\` of \`n\` integers, return *an array of all the **unique** quadruplets* \`[nums[a], nums[b], nums[c], nums[d]]\` such that:

*   \`0 <= a, b, c, d < n\`
*   \`a\`, \`b\`, \`c\`, and \`d\` are **distinct**.
*   \`nums[a] + nums[b] + nums[c] + nums[d] == target\`

You may return the answer in **any order**.

### Example 1:
\`\`\`text
Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    
};`,
            python: `class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        pass`,
            java: `class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `[1,0,-1,0,-2,2], 0`, expectedOutput: `[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]` },
            { input: `[2,2,2,2,2], 8`, expectedOutput: `[[2,2,2,2]]` }
        ,
        ],
        order: 90
    }
];
