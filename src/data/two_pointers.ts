import { Question } from "@/types/question";

export const TWO_POINTERS_QUESTIONS: Question[] = [
    {
        id: "valid-palindrome",
        title: "Valid Palindrome",
        difficulty: "Easy",
        category: "Two Pointers",
        logicTags: ["two-pointers", "string"],
        description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` *if it is a **palindrome**, or* \`false\` *otherwise*.

### Example 1:
\`\`\`text
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    
};`,
            python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        pass`,
            java: `class Solution {
    public boolean isPalindrome(String s) {
        return false;
    }
}`
        },
        testCases: [
            
        ],
        order: 91
    },
    {
        id: "two-sum-ii-input-array-is-sorted",
        title: "Two Sum II - Input Array Is Sorted",
        difficulty: "Medium",
        category: "Two Pointers",
        logicTags: ["two-pointers", "array", "binary-search"],
        description: `Given a **1-indexed** array of integers \`numbers\` that is already **sorted in non-decreasing order**, find two numbers such that they add up to a specific \`target\` number. Let these two numbers be \`numbers[index1]\` and \`numbers[index2]\` where \`1 <= index1 < index2 <= numbers.length\`.

Return *the indices of the two numbers, value1 and value2, added by one as an integer array* \`[index1, index2]\` *of length 2*.

The tests are generated such that there is **exactly one solution**. You may not use the same element twice.

Your solution must use only constant extra space.

### Example 1:
\`\`\`text
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    
};`,
            python: `class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        pass`,
            java: `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        return new int[]{};
    }
}`
        },
        testCases: [
            
        ],
        order: 92
    },
    {
        id: "3sum",
        title: "3Sum",
        difficulty: "Medium",
        category: "Two Pointers",
        logicTags: ["two-pointers", "array", "sorting"],
        description: `Given an integer array nums, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets.

### Example 1:
\`\`\`text
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    
};`,
            python: `class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        pass`,
            java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            
        ],
        order: 93
    },
    {
        id: "container-with-most-water",
        title: "Container With Most Water",
        difficulty: "Medium",
        category: "Two Pointers",
        logicTags: ["two-pointers", "array", "greedy"],
        description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`ith\` line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return *the maximum amount of water a container can store*.

Notice that you may not slant the container.

### Example 1:
\`\`\`text
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    
};`,
            python: `class Solution:
    def maxArea(self, height: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int maxArea(int[] height) {
        return 0;
    }
}`
        },
        testCases: [
            
        ],
        order: 94
    },
    {
        id: "remove-duplicates-from-sorted-array",
        title: "Remove Duplicates from Sorted Array",
        difficulty: "Easy",
        category: "Two Pointers",
        logicTags: ["two-pointers", "array"],
        description: `Given an integer array \`nums\` sorted in **non-decreasing order**, remove the duplicates **[in-place](https://en.wikipedia.org/wiki/In-place_algorithm)** such that each unique element appears only **once**. The **relative order** of the elements should be kept the same.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the **first part** of the array \`nums\`. More formally, if there are \`k\` elements after removing the duplicates, then the first \`k\` elements of \`nums\` should hold the final result. It does not matter what you leave beyond the first \`k\` elements.

Return \`k\` *after placing the final result in the first* \`k\` *slots of* \`nums\`.

Do not allocate extra space for another array. You must do this by **modifying the input array [in-place](https://en.wikipedia.org/wiki/In-place_algorithm)** with O(1) extra memory.

### Example 1:
\`\`\`text
Input: nums = [1,1,2]
Output: 2
Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    
};`,
            python: `class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int removeDuplicates(int[] nums) {
        return 0;
    }
}`
        },
        testCases: [
            
        ],
        order: 95
    },
    {
        id: "move-zeroes",
        title: "Move Zeroes",
        difficulty: "Easy",
        category: "Two Pointers",
        logicTags: ["two-pointers", "array"],
        description: `Given an integer array \`nums\`, move all \`0\`'s to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.

### Example 1:
\`\`\`text
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    
};`,
            python: `class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        pass`,
            java: `class Solution {
    public void moveZeroes(int[] nums) {
        
    }
}`
        },
        testCases: [
            
        ],
        order: 96
    },
    {
        id: "squares-of-a-sorted-array",
        title: "Squares of a Sorted Array",
        difficulty: "Easy",
        category: "Two Pointers",
        logicTags: ["two-pointers", "array", "sorting"],
        description: `Given an integer array \`nums\` sorted in **non-decreasing** order, return *an array of the squares of each number sorted in non-decreasing order*.

### Example 1:
\`\`\`text
Input: nums = [-4,-1,0,3,10]
Output: [0,1,9,16,100]
Explanation: After squaring, the array becomes [16,1,0,9,100].
After sorting, it becomes [0,1,9,16,100].
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    
};`,
            python: `class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        pass`,
            java: `class Solution {
    public int[] sortedSquares(int[] nums) {
        return new int[]{};
    }
}`
        },
        testCases: [
            
        ],
        order: 97
    },
    {
        id: "rotate-array",
        title: "Rotate Array",
        difficulty: "Medium",
        category: "Two Pointers",
        logicTags: ["two-pointers", "array", "math"],
        description: `Given an integer array \`nums\`, rotate the array to the right by \`k\` steps, where \`k\` is non-negative.

### Example 1:
\`\`\`text
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    
};`,
            python: `class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        pass`,
            java: `class Solution {
    public void rotate(int[] nums, int k) {
        
    }
}`
        },
        testCases: [
            
        ],
        order: 98
    },
    {
        id: "boats-to-save-people",
        title: "Boats to Save People",
        difficulty: "Medium",
        category: "Two Pointers",
        logicTags: ["two-pointers", "greedy", "sorting"],
        description: `You are given an array \`people\` where \`people[i]\` is the weight of the \`ith\` person, and an **infinite number of boats** where each boat can carry a maximum weight of \`limit\`. Each boat carries at most two people at the same time, provided the sum of the weight of those people is at most \`limit\`.

Return *the minimum number of boats to carry every given person*.

### Example 1:
\`\`\`text
Input: people = [1,2], limit = 3
Output: 1
Explanation: 1 boat (1, 2)
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
var numRescueBoats = function(people, limit) {
    
};`,
            python: `class Solution:
    def numRescueBoats(self, people: List[int], limit: int) -> int:
        pass`,
            java: `class Solution {
    public int numRescueBoats(int[] people, int limit) {
        return 0;
    }
}`
        },
        testCases: [
            
        ],
        order: 99
    },
    {
        id: "trapping-rain-water",
        title: "Trapping Rain Water",
        difficulty: "Hard",
        category: "Two Pointers",
        logicTags: ["two-pointers", "array", "dp"],
        description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.

### Example 1:
\`\`\`text
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    
};`,
            python: `class Solution:
    def trap(self, height: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int trap(int[] height) {
        return 0;
    }
}`
        },
        testCases: [
            
        ],
        order: 100
    }
];
