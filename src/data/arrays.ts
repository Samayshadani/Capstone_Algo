import { Question } from "@/types/question";

export const ARRAY_QUESTIONS: Question[] = [
    {
        id: "two-sum",
        title: "Two Sum",
        difficulty: "Easy",
        category: "Arrays",
        logicTags: ["hashing"],
        description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the *same* element twice.

You can return the answer in any order.

### Example 1:
\`\`\`text
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

### Example 2:
\`\`\`text
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your code here
    
};`,
            python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        pass`,
            java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[]{};
    }
}`
        },
        testCases: [
            { input: `[2,7,11,15], 9`, expectedOutput: `[0,1]` },
            { input: `[3,2,4], 6`, expectedOutput: `[1,2]` },
            { input: `[3,3], 6`, expectedOutput: `[0,1]` },
            { input: `[1,2,3,4,5], 9`, expectedOutput: `[3,4]`, isHidden: true },
            { input: `[0,4,3,0], 0`, expectedOutput: `[0,3]`, isHidden: true },
            { input: `[-1,-2,-3,-4,-5], -8`, expectedOutput: `[2,4]`, isHidden: true },
            { input: `[1,5,8,3,9], 4`, expectedOutput: `[0,2]`, isHidden: false },
            { input: `[100,200,300,400], 700`, expectedOutput: `[2,3]`, isHidden: true },
            { input: `[2,5,5,11], 10`, expectedOutput: `[1,2]`, isHidden: true },
            { input: `[11,15,6,8,9,10], 16`, expectedOutput: `[0,1]`, isHidden: false },
        ],
        order: 1,
        nextQuestionId: "3sum"
    },
    {
        id: "best-time-to-buy-and-sell-stock",
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        category: "Arrays",
        logicTags: ["sliding-window", "dp"],
        description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`ith\` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return *the maximum profit you can achieve from this transaction*. If you cannot achieve any profit, return \`0\`.

### Example 1:
\`\`\`text
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
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
            { input: `[7,1,5,3,6,4]`, expectedOutput: `5` },
            { input: `[7,6,4,3,1]`, expectedOutput: `0` },
            { input: `[1,2]`, expectedOutput: `1`, isHidden: true },
            { input: `[2,1]`, expectedOutput: `0`, isHidden: true },
            { input: `[1]`, expectedOutput: `0`, isHidden: true },
            { input: `[3,3,3,3]`, expectedOutput: `0`, isHidden: true },
            { input: `[1,2,3,4,5]`, expectedOutput: `4`, isHidden: true },
        ],
        order: 2
    },
    {
        id: "contains-duplicate",
        title: "Contains Duplicate",
        difficulty: "Easy",
        category: "Arrays",
        logicTags: ["hashing", "sets"],
        description: `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.

### Example 1:
\`\`\`text
Input: nums = [1,2,3,1]
Output: true
\`\`\`

### Example 2:
\`\`\`text
Input: nums = [1,2,3,4]
Output: false
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    
};`,
            python: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        pass`,
            java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        return false;
    }
}`
        },
        testCases: [
            { input: `[1,2,3,1]`, expectedOutput: `true` },
            { input: `[1,2,3,4]`, expectedOutput: `false` },
            { input: `[1,1,1,3,3,4,3,2,4,2]`, expectedOutput: `true`, isHidden: true },
            { input: `[1]`, expectedOutput: `false`, isHidden: true },
            { input: `[]`, expectedOutput: `false`, isHidden: true },
            { input: `[0,0]`, expectedOutput: `true`, isHidden: true },
            { input: `[-1,-2,-3,-1]`, expectedOutput: `true`, isHidden: true },
        ],
        order: 3
    },
    {
        id: "product-of-array-except-self",
        title: "Product of Array Except Self",
        difficulty: "Medium",
        category: "Arrays",
        logicTags: ["prefix-sum"],
        description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is guaranteed to fit in a **32-bit** integer.

You must write an algorithm that runs in **O(n)** time and without using the division operation.

### Example 1:
\`\`\`text
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    
};`,
            python: `class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        pass`,
            java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        return new int[]{};
    }
}`
        },
        testCases: [
            { input: `[1,2,3,4]`, expectedOutput: `[24,12,8,6]` },
            { input: `[-1,1,0,-3,3]`, expectedOutput: `[0,0,9,0,0]` },
            { input: `[2,3]`, expectedOutput: `[3,2]`, isHidden: true },
            { input: `[1,1,1,1]`, expectedOutput: `[1,1,1,1]`, isHidden: true },
            { input: `[0,0,0,0]`, expectedOutput: `[0,0,0,0]`, isHidden: true },
            { input: `[1,0]`, expectedOutput: `[0,1]`, isHidden: true },
            { input: `[5,10]`, expectedOutput: `[10,5]`, isHidden: true },
        ],
        order: 4
    },
    {
        id: "maximum-subarray",
        title: "Maximum Subarray",
        difficulty: "Medium",
        category: "Arrays",
        logicTags: ["kadane", "dp"],
        description: `Given an integer array \`nums\`, find the subarray which has the largest sum and return *its sum*.

### Example 1:
\`\`\`text
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    
};`,
            python: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int maxSubArray(int[] nums) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[-2,1,-3,4,-1,2,1,-5,4]`, expectedOutput: `6` },
            { input: `[1]`, expectedOutput: `1` },
            { input: `[5,4,-1,7,8]`, expectedOutput: `23` },
            { input: `[-1]`, expectedOutput: `-1`, isHidden: true },
            { input: `[-2,-1]`, expectedOutput: `-1`, isHidden: true },
            { input: `[0]`, expectedOutput: `0`, isHidden: true },
            { input: `[1,2,3,4,5]`, expectedOutput: `15`, isHidden: true },
            { input: `[-1,-2,-3,-4,-5]`, expectedOutput: `-1`, isHidden: true },
        ],
        order: 5,
        nextQuestionId: "maximum-product-subarray"
    },
    {
        id: "maximum-product-subarray",
        title: "Maximum Product Subarray",
        difficulty: "Medium",
        category: "Arrays",
        logicTags: ["dp"],
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
            { input: `[-2,0,-1]`, expectedOutput: `0` },
            { input: `[-2,3,-4]`, expectedOutput: `24`, isHidden: true },
            { input: `[0,2]`, expectedOutput: `2`, isHidden: true },
            { input: `[-2]`, expectedOutput: `-2`, isHidden: true },
            { input: `[3]`, expectedOutput: `3`, isHidden: true },
            { input: `[-1,-2,-3]`, expectedOutput: `6`, isHidden: true },
        ],
        order: 6,
        prerequisites: ["maximum-subarray"]
    },
    {
        id: "find-minimum-in-rotated-sorted-array",
        title: "Find Minimum in Rotated Sorted Array",
        difficulty: "Medium",
        category: "Arrays",
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
            { input: `[4,5,6,7,0,1,2]`, expectedOutput: `0` },
            { input: `[11,13,15,17]`, expectedOutput: `11`, isHidden: true },
            { input: `[2,1]`, expectedOutput: `1`, isHidden: true },
            { input: `[1]`, expectedOutput: `1`, isHidden: true },
            { input: `[2,3,4,5,1]`, expectedOutput: `1`, isHidden: true },
            { input: `[5,1,2,3,4]`, expectedOutput: `1`, isHidden: true },
        ],
        order: 7
    },
    {
        id: "search-in-rotated-sorted-array",
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        category: "Arrays",
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
            { input: `[4,5,6,7,0,1,2], 3`, expectedOutput: `-1` },
            { input: `[1], 0`, expectedOutput: `-1`, isHidden: true },
            { input: `[1], 1`, expectedOutput: `0`, isHidden: true },
            { input: `[3,1], 1`, expectedOutput: `1`, isHidden: true },
            { input: `[1,3], 3`, expectedOutput: `1`, isHidden: true },
            { input: `[5,1,2,3,4], 1`, expectedOutput: `1`, isHidden: true },
        ],
        order: 8
    },
    {
        id: "3sum",
        title: "3Sum",
        difficulty: "Medium",
        category: "Arrays",
        logicTags: ["two-pointers", "sorting"],
        description: `Given an integer array nums, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets.

### Example 1:
\`\`\`text
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
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
            { input: `[-1,0,1,2,-1,-4]`, expectedOutput: `[[-1,-1,2],[-1,0,1]]` },
            { input: `[0,1,1]`, expectedOutput: `[]` },
            { input: `[0,0,0]`, expectedOutput: `[[0,0,0]]`, isHidden: true },
            { input: `[0,0,0,0]`, expectedOutput: `[[0,0,0]]`, isHidden: true },
            { input: `[-2,0,1,1,2]`, expectedOutput: `[[-2,0,2],[-2,1,1]]`, isHidden: true },
            { input: `[-1,0,1]`, expectedOutput: `[[-1,0,1]]`, isHidden: true },
            { input: `[1,2,-2,-1]`, expectedOutput: `[[-2,1,1]]`, isHidden: false },
            { input: `[-4,-2,-2,-2,0,1,2,2,2,3,3,6,6,6,8]`, expectedOutput: `[[-4,-2,6],[-4,1,3],[-2,-2,4],[-2,0,2]]`, isHidden: true },
        ],
        order: 9,
        prerequisites: ["two-sum"]
    },
    {
        id: "container-with-most-water",
        title: "Container With Most Water",
        difficulty: "Medium",
        category: "Arrays",
        logicTags: ["two-pointers"],
        description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`ith\` line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return *the maximum amount of water a container can store*.

### Example 1:
\`\`\`text
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The max area is between index 1 and 8 (heights 8 and 7). Area = 7 * (8-1) = 49.
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
            { input: `[1,8,6,2,5,4,8,3,7]`, expectedOutput: `49` },
            { input: `[1,1]`, expectedOutput: `1` },
            { input: `[4,3,2,1,4]`, expectedOutput: `16`, isHidden: true },
            { input: `[1,2,1]`, expectedOutput: `2`, isHidden: true },
            { input: `[2,3,4,5,18,17,6]`, expectedOutput: `17`, isHidden: true },
            { input: `[1,2,3,4,5]`, expectedOutput: `6`, isHidden: true },
            { input: `[5,4,3,2,1]`, expectedOutput: `6`, isHidden: true },
        ],
        order: 10
    }
];
