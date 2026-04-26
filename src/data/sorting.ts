import { Question } from "@/types/question";

export const SORTING_QUESTIONS: Question[] = [
    {
        id: "merge-sorted-array",
        title: "Merge Sorted Array",
        difficulty: "Easy",
        category: "Sorting Algorithms",
        logicTags: ["sorting", "two-pointers"],
        description: `You are given two integer arrays \`nums1\` and \`nums2\`, sorted in **non-decreasing order**, and two integers \`m\` and \`n\`, representing the number of elements in \`nums1\` and \`nums2\` respectively.

Merge \`nums1\` and \`nums2\` into a single array sorted in **non-decreasing order**.

The final sorted array should not be returned by the function, but instead be stored inside the array \`nums1\`. To accommodate this, \`nums1\` has a length of \`m + n\`.

### Example 1:
\`\`\`text
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    
};`,
            python: `class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        """
        Do not return anything, modify nums1 in-place instead.
        """
        pass`,
            java: `class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        
    }
}`
        },
        testCases: [
            { input: `[1,2,3,0,0,0], 3, [2,5,6], 3`, expectedOutput: `[1,2,2,3,5,6]` },
            { input: `[1], 1, [], 0`, expectedOutput: `[1]` },
            { input: `[0], 0, [1], 1`, expectedOutput: `[1]` }
        ],
        order: 61
    },
    {
        id: "majority-element",
        title: "Majority Element",
        difficulty: "Easy",
        category: "Sorting Algorithms",
        logicTags: ["sorting", "array", "counting"],
        description: `Given an array \`nums\` of size \`n\`, return *the majority element*.

The majority element is the element that appears more than \`⌊n / 2⌋\` times. You may assume that the majority element always exists in the array.

### Example 1:
\`\`\`text
Input: nums = [3,2,3]
Output: 3
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    
};`,
            python: `class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int majorityElement(int[] nums) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[3,2,3]`, expectedOutput: `3` },
            { input: `[2,2,1,1,1,2,2]`, expectedOutput: `2` }
        ],
        order: 62
    },
    {
        id: "sort-colors",
        title: "Sort Colors",
        difficulty: "Medium",
        category: "Sorting Algorithms",
        logicTags: ["sorting", "two-pointers"],
        description: `Given an array \`nums\` with \`n\` objects colored red, white, or blue, sort them **[in-place](https://en.wikipedia.org/wiki/In-place_algorithm)** so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers \`0\`, \`1\`, and \`2\` to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

### Example 1:
\`\`\`text
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    
};`,
            python: `class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        pass`,
            java: `class Solution {
    public void sortColors(int[] nums) {
        
    }
}`
        },
        testCases: [
            { input: `[2,0,2,1,1,0]`, expectedOutput: `[0,0,1,1,2,2]` },
            { input: `[2,0,1]`, expectedOutput: `[0,1,2]` }
        ],
        order: 63
    },
    {
        id: "kth-largest-element-in-an-array",
        title: "Kth Largest Element in an Array",
        difficulty: "Medium",
        category: "Sorting Algorithms",
        logicTags: ["sorting", "heap"],
        description: `Given an integer array \`nums\` and an integer \`k\`, return *the* \`kth\` *largest element in the array*.

Note that it is the \`kth\` largest element in the sorted order, not the \`kth\` distinct element.

Can you solve it without sorting?

### Example 1:
\`\`\`text
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    
};`,
            python: `class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        pass`,
            java: `class Solution {
    public int findKthLargest(int[] nums, int k) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[3,2,1,5,6,4], 2`, expectedOutput: `5` },
            { input: `[3,2,3,1,2,4,5,5,6], 4`, expectedOutput: `4` }
        ],
        order: 64
    },
    {
        id: "top-k-frequent-elements",
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        category: "Sorting Algorithms",
        logicTags: ["sorting", "heap", "hash-table"],
        description: `Given an integer array \`nums\` and an integer \`k\`, return *the* \`k\` *most frequent elements*. You may return the answer in **any order**.

### Example 1:
\`\`\`text
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    
};`,
            python: `class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        pass`,
            java: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        return new int[]{};
    }
}`
        },
        testCases: [
            { input: `[1,1,1,2,2,3], 2`, expectedOutput: `[1,2]` },
            { input: `[1], 1`, expectedOutput: `[1]` }
        ],
        order: 65
    },
    {
        id: "merge-intervals",
        title: "Merge Intervals",
        difficulty: "Medium",
        category: "Sorting Algorithms",
        logicTags: ["sorting", "array"],
        description: `Given an array of \`intervals\` where \`intervals[i] = [starti, endi]\`, merge all overlapping intervals, and return *an array of the non-overlapping intervals that cover all the intervals in the input*.

### Example 1:
\`\`\`text
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    
};`,
            python: `class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        pass`,
            java: `class Solution {
    public int[][] merge(int[][] intervals) {
        return new int[][]{};
    }
}`
        },
        testCases: [
            { input: `[[1,3],[2,6],[8,10],[15,18]]`, expectedOutput: `[[1,6],[8,10],[15,18]]` },
            { input: `[[1,4],[4,5]]`, expectedOutput: `[[1,5]]` }
        ],
        order: 66
    },
    {
        id: "insert-interval",
        title: "Insert Interval",
        difficulty: "Medium",
        category: "Sorting Algorithms",
        logicTags: ["sorting", "array"],
        description: `You are given an array of non-overlapping intervals \`intervals\` where \`intervals[i] = [starti, endi]\` represent the start and the end of the \`ith\` interval and \`intervals\` is sorted in ascending order by \`starti\`. You are also given an interval \`newInterval = [start, end]\` that represents the start and end of another interval.

Insert \`newInterval\` into \`intervals\` such that \`intervals\` is still sorted in ascending order by \`starti\` and \`intervals\` still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return \`intervals\` *after the insertion*.

### Example 1:
\`\`\`text
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
    
};`,
            python: `class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        pass`,
            java: `class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        return new int[][]{};
    }
}`
        },
        testCases: [
            { input: `[[1,3],[6,9]], [2,5]`, expectedOutput: `[[1,5],[6,9]]` },
            { input: `[[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8]`, expectedOutput: `[[1,2],[3,10],[12,16]]` }
        ],
        order: 67
    },
    {
        id: "non-overlapping-intervals",
        title: "Non-overlapping Intervals",
        difficulty: "Medium",
        category: "Sorting Algorithms",
        logicTags: ["sorting", "greedy"],
        description: `Given an array of intervals \`intervals\` where \`intervals[i] = [starti, endi]\`, return *the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping*.

### Example 1:
\`\`\`text
Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    
};`,
            python: `class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        pass`,
            java: `class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[[1,2],[2,3],[3,4],[1,3]]`, expectedOutput: `1` },
            { input: `[[1,2],[1,2],[1,2]]`, expectedOutput: `2` }
        ],
        order: 68
    },
    {
        id: "largest-number",
        title: "Largest Number",
        difficulty: "Medium",
        category: "Sorting Algorithms",
        logicTags: ["sorting", "string", "greedy"],
        description: `Given a list of non-negative integers \`nums\`, arrange them such that they form the largest number and return it.

Since the result may be very large, so you need to return a string instead of an integer.

### Example 1:
\`\`\`text
Input: nums = [10,2]
Output: "210"
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function(nums) {
    
};`,
            python: `class Solution:
    def largestNumber(self, nums: List[int]) -> str:
        pass`,
            java: `class Solution {
    public String largestNumber(int[] nums) {
        return "";
    }
}`
        },
        testCases: [
            { input: `[10,2]`, expectedOutput: `"210"` },
            { input: `[3,30,34,5,9]`, expectedOutput: `"9534330"` }
        ],
        order: 69
    },
    {
        id: "rank-teams-by-votes",
        title: "Rank Teams by Votes",
        difficulty: "Medium",
        category: "Sorting Algorithms",
        logicTags: ["sorting", "hash-table", "string"],
        description: `In a special ranking system, each voter gives a rank from highest to lowest to all teams participated in the competition.

The ordering of teams is decided by who received the most position-one votes. If two or more teams tie in the first position, we consider the second position to resolve the conflict, if they tie again, we continue this process until the ties are resolved. If two or more teams are still tied after considering all positions, we rank them alphabetically based on their team letter.

Given an array of strings \`votes\` which is the votes of all voters in the ranking systems. Sort all teams according to the ranking system described above.

Return *a string of all teams sorted by the ranking system*.

### Example 1:
\`\`\`text
Input: votes = ["ABC","ACB","ABC","ACB","ACB"]
Output: "ACB"
Explanation: Team A was ranked first place by 5 voters. No other team was voted as first place so team A is the first team.
Team B was ranked second by 2 voters and third by 3 voters.
Team C was ranked second by 3 voters and third by 2 voters.
As most of the voters ranked C second, team C is the second team and team B is the third.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string[]} votes
 * @return {string}
 */
var rankTeams = function(votes) {
    
};`,
            python: `class Solution:
    def rankTeams(self, votes: List[str]) -> str:
        pass`,
            java: `class Solution {
    public String rankTeams(String[] votes) {
        return "";
    }
}`
        },
        testCases: [
            { input: `["ABC","ACB","ABC","ACB","ACB"]`, expectedOutput: `"ACB"` },
            { input: `["WXYZ","XYZW"]`, expectedOutput: `"XWYZ"` }
        ],
        order: 70
    }
];
