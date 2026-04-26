import { Question } from "@/types/question";

export const BINARY_SEARCH_QUESTIONS: Question[] = [
    {
        id: "binary-search",
        title: "Binary Search",
        difficulty: "Easy",
        category: "Binary Search",
        logicTags: ["binary-search"],
        description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with \`O(log n)\` runtime complexity.

### Example 1:
\`\`\`text
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    
};`,
            python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        pass`,
            java: `class Solution {
    public int search(int[] nums, int target) {
        return -1;
    }
}`
        },
        testCases: [
            { input: `[-1,0,3,5,9,12], 9`, expectedOutput: `4` },
            { input: `[-1,0,3,5,9,12], 2`, expectedOutput: `-1` }
        ],
        order: 51,
        nextQuestionId: "search-insert-position"
    },
    {
        id: "search-insert-position",
        title: "Search Insert Position",
        difficulty: "Easy",
        category: "Binary Search",
        logicTags: ["binary-search"],
        description: `Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with \`O(log n)\` runtime complexity.

### Example 1:
\`\`\`text
Input: nums = [1,3,5,6], target = 5
Output: 2
\`\`\`

### Example 2:
\`\`\`text
Input: nums = [1,3,5,6], target = 2
Output: 1
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    
};`,
            python: `class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        pass`,
            java: `class Solution {
    public int searchInsert(int[] nums, int target) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[1,3,5,6], 5`, expectedOutput: `2` },
            { input: `[1,3,5,6], 2`, expectedOutput: `1` },
            { input: `[1,3,5,6], 7`, expectedOutput: `4` }
        ],
        order: 52,
        prerequisites: ["binary-search"],
        nextQuestionId: "find-first-and-last-position-of-element-in-sorted-array"
    },
    {
        id: "peak-index-in-a-mountain-array",
        title: "Peak Index in a Mountain Array",
        difficulty: "Medium",
        category: "Binary Search",
        logicTags: ["binary-search"],
        description: `An array \`arr\` is a **mountain** if the following properties hold:
*   \`arr.length >= 3\`
*   There exists some \`i\` with \`0 < i < arr.length - 1\` such that:
    *   \`arr[0] < arr[1] < ... < arr[i - 1] < arr[i]\` 
    *   \`arr[i] > arr[i + 1] > ... > arr[arr.length - 1]\`

Given a mountain array \`arr\`, return the index \`i\` such that \`arr[0] < arr[1] < ... < arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1]\`.

You must solve it in \`O(log(arr.length))\` time complexity.

### Example 1:
\`\`\`text
Input: arr = [0,1,0]
Output: 1
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} arr
 * @return {number}
 */
var peakIndexInMountainArray = function(arr) {
    
};`,
            python: `class Solution:
    def peakIndexInMountainArray(self, arr: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int peakIndexInMountainArray(int[] arr) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[0,1,0]`, expectedOutput: `1` },
            { input: `[0,2,1,0]`, expectedOutput: `1` },
            { input: `[0,10,5,2]`, expectedOutput: `1` }
        ],
        order: 53
    },
    {
        id: "find-first-and-last-position-of-element-in-sorted-array",
        title: "Find First and Last Position of Element",
        difficulty: "Medium",
        category: "Binary Search",
        logicTags: ["binary-search"],
        description: `Given an array of integers \`nums\` sorted in non-decreasing order, find the starting and ending position of a given \`target\` value.

If \`target\` is not found in the array, return \`[-1, -1]\`.

You must write an algorithm with \`O(log n)\` runtime complexity.

### Example 1:
\`\`\`text
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    
};`,
            python: `class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        pass`,
            java: `class Solution {
    public int[] searchRange(int[] nums, int target) {
        return new int[]{-1, -1};
    }
}`
        },
        testCases: [
            { input: `[5,7,7,8,8,10], 8`, expectedOutput: `[3,4]` },
            { input: `[5,7,7,8,8,10], 6`, expectedOutput: `[-1,-1]` }
        ],
        order: 54
    },
    {
        id: "find-minimum-in-rotated-sorted-array",
        title: "Find Minimum in Rotated Sorted Array",
        difficulty: "Medium",
        category: "Binary Search",
        logicTags: ["binary-search"],
        description: `Suppose an array of length \`n\` sorted in ascending order is rotated between \`1\` and \`n\` times. For example, the array \`nums = [0,1,2,4,5,6,7]\` might become:
*   \`[4,5,6,7,0,1,2]\` if it was rotated 4 times.

Given the sorted rotated array \`nums\` of **unique** elements, return *the minimum element of this array*.

You must write an algorithm that runs in **O(log n)** time.

### Example 1:
\`\`\`text
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    
};`,
            python: `class Solution:
    def findMin(self, nums: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int findMin(int[] nums) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[3,4,5,1,2]`, expectedOutput: `1` },
            { input: `[4,5,6,7,0,1,2]`, expectedOutput: `0` }
        ],
        order: 55
    },
    {
        id: "search-in-rotated-sorted-array",
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        category: "Binary Search",
        logicTags: ["binary-search"],
        description: `There is an integer array \`nums\` sorted in ascending order (with **distinct** values). Returns the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`.

You must write an algorithm with **O(log n)** runtime complexity.

### Example 1:
\`\`\`text
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    
};`,
            python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        pass`,
            java: `class Solution {
    public int search(int[] nums, int target) {
        return -1;
    }
}`
        },
        testCases: [
            { input: `[4,5,6,7,0,1,2], 0`, expectedOutput: `4` },
            { input: `[4,5,6,7,0,1,2], 3`, expectedOutput: `-1` }
        ],
        order: 56
    },
    {
        id: "search-a-2d-matrix",
        title: "Search a 2D Matrix",
        difficulty: "Medium",
        category: "Binary Search",
        logicTags: ["binary-search", "matrix"],
        description: `You are given an \`m x n\` integer matrix \`matrix\` with the following two properties:
1.  Each row is sorted in non-decreasing order.
2.  The first integer of each row is greater than the last integer of the previous row.

Given an integer \`target\`, return \`true\` *if* \`target\` *is in* \`matrix\` *or* \`false\` *otherwise*.

You must write a solution in \`O(log(m * n))\` time complexity.

### Example 1:
\`\`\`text
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    
};`,
            python: `class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        pass`,
            java: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        return false;
    }
}`
        },
        testCases: [
            { input: `[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3`, expectedOutput: `true` },
            { input: `[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13`, expectedOutput: `false` }
        ],
        order: 57
    },
    {
        id: "koko-eating-bananas",
        title: "Koko Eating Bananas",
        difficulty: "Medium",
        category: "Binary Search",
        logicTags: ["binary-search"],
        description: `Koko loves to eat bananas. There are \`n\` piles of bananas, the \`ith\` pile has \`piles[i]\` bananas. The guards have gone and will come back in \`h\` hours.

Koko can decide her bananas-per-hour eating speed of \`k\`. Both \`n\` and \`h\` are integers.

Return *the minimum integer* \`k\` *such that she can eat all the bananas within* \`h\` *hours*.

### Example 1:
\`\`\`text
Input: piles = [3,6,7,11], h = 8
Output: 4
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function(piles, h) {
    
};`,
            python: `class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        pass`,
            java: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[3,6,7,11], 8`, expectedOutput: `4` },
            { input: `[30,11,23,4,20], 5`, expectedOutput: `30` }
        ],
        order: 58
    },
    {
        id: "capacity-to-ship-packages-within-d-days",
        title: "Capacity To Ship Packages Within D Days",
        difficulty: "Medium",
        category: "Binary Search",
        logicTags: ["binary-search"],
        description: `A conveyor belt has packages that must be shipped from one port to another within \`days\` days.

The \`ith\` package on the conveyor belt has a weight of \`weights[i]\`. Each day, we load the ship with packages on the conveyor belt (in the order given by \`weights\`). We may not load more weight than the maximum weight capacity of the ship.

Return *the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within* \`days\` *days*.

### Example 1:
\`\`\`text
Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
Output: 15
Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
1st day: 1, 2, 3, 4, 5
2nd day: 6, 7
3rd day: 8
4th day: 9
5th day: 10

Note that the cargo must be shipped in the order given.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function(weights, days) {
    
};`,
            python: `class Solution:
    def shipWithinDays(self, weights: List[int], days: int) -> int:
        pass`,
            java: `class Solution {
    public int shipWithinDays(int[] weights, int days) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[1,2,3,4,5,6,7,8,9,10], 5`, expectedOutput: `15` },
            { input: `[3,2,2,4,1,4], 3`, expectedOutput: `6` }
        ],
        order: 59
    },
    {
        id: "median-of-two-sorted-arrays",
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        category: "Binary Search",
        logicTags: ["binary-search", "divide-and-conquer"],
        description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return **the median** of the two sorted arrays.

The overall run time complexity should be \`O(log (m+n))\`.

### Example 1:
\`\`\`text
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    
};`,
            python: `class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        pass`,
            java: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        return 0.0;
    }
}`
        },
        testCases: [
            { input: `[1,3], [2]`, expectedOutput: `2.0` },
            { input: `[1,2], [3,4]`, expectedOutput: `2.5` }
        ],
        order: 60
    }
];
