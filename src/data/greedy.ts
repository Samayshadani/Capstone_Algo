import { Question } from "@/types/question";

export const GREEDY_QUESTIONS: Question[] = [
    {
        id: "jump-game",
        title: "Jump Game",
        difficulty: "Medium",
        category: "Greedy Algorithms",
        logicTags: ["greedy", "dp"],
        description: `You are given an integer array \`nums\`. You are initially positioned at the array's **first index**, and each element in the array represents your maximum jump length at that position.

Return \`true\` *if you can reach the last index, or* \`false\` *otherwise*.

### Example 1:
\`\`\`text
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    
};`,
            python: `class Solution:
    def canJump(self, nums: List[int]) -> bool:
        pass`,
            java: `class Solution {
    public boolean canJump(int[] nums) {
        return false;
    }
}`
        },
        testCases: [
            { input: `[2,3,1,1,4]`, expectedOutput: `true` },
            { input: `[3,2,1,0,4]`, expectedOutput: `false` }
        ,
        ],
        order: 151
    },
    {
        id: "jump-game-ii",
        title: "Jump Game II",
        difficulty: "Medium",
        category: "Greedy Algorithms",
        logicTags: ["greedy", "dp"],
        description: `You are given a **0-indexed** array of integers \`nums\` of length \`n\`. You are initially positioned at \`nums[0]\`.

Each element \`nums[i]\` represents the maximum length of a forward jump from index \`i\`. In other words, if you are at \`nums[i]\`, you can jump to any \`nums[i + j]\` where:

*   \`0 <= j <= nums[i]\` and
*   \`i + j < n\`

Return *the minimum number of jumps to reach* \`nums[n - 1]\`. The test cases are generated such that you can reach \`nums[n - 1]\`.

### Example 1:
\`\`\`text
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    
};`,
            python: `class Solution:
    def jump(self, nums: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int jump(int[] nums) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[2,3,1,1,4]`, expectedOutput: `2` },
            { input: `[2,3,0,1,4]`, expectedOutput: `2` }
        ,
        ],
        order: 152
    },
    {
        id: "gas-station",
        title: "Gas Station",
        difficulty: "Medium",
        category: "Greedy Algorithms",
        logicTags: ["greedy", "array"],
        description: `There are \`n\` gas stations along a circular route, where the amount of gas at the \`ith\` station is \`gas[i]\`.

You have a car with an unlimited gas tank and it costs \`cost[i]\` of gas to travel from the \`ith\` station to its next \`(i + 1)th\` station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays \`gas\` and \`cost\`, return *the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return* \`-1\`. If there exists a solution, it is **guaranteed** to be **unique**.

### Example 1:
\`\`\`text
Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
Output: 3
Explanation:
Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 4. Your tank = 4 - 1 + 5 = 8
Travel to station 0. Your tank = 8 - 2 + 1 = 7
Travel to station 1. Your tank = 7 - 3 + 2 = 6
Travel to station 2. Your tank = 6 - 4 + 3 = 5
Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
Therefore, return 3 as the starting index.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    
};`,
            python: `class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[1,2,3,4,5], [3,4,5,1,2]`, expectedOutput: `3` },
            { input: `[2,3,4], [3,4,3]`, expectedOutput: `-1` }
        ,
        ],
        order: 153
    },
    {
        id: "hand-of-straights",
        title: "Hand of Straights",
        difficulty: "Medium",
        category: "Greedy Algorithms",
        logicTags: ["greedy", "sorting", "hash-table"],
        description: `Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size \`groupSize\`, and consists of \`groupSize\` consecutive cards.

Given an integer array \`hand\` where \`hand[i]\` is the value written on the \`ith\` card and an integer \`groupSize\`, return \`true\` if she can rearrange the cards, or \`false\` otherwise.

### Example 1:
\`\`\`text
Input: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
Output: true
Explanation: Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
var isNStraightHand = function(hand, groupSize) {
    
};`,
            python: `class Solution:
    def isNStraightHand(self, hand: List[int], groupSize: int) -> bool:
        pass`,
            java: `class Solution {
    public boolean isNStraightHand(int[] hand, int groupSize) {
        return false;
    }
}`
        },
        testCases: [
            { input: `[1,2,3,6,2,3,4,7,8], 3`, expectedOutput: `true` },
            { input: `[1,2,3,4,5], 4`, expectedOutput: `false` }
        ,
        ],
        order: 154
    },
    {
        id: "merge-triplets-to-form-target-triplet",
        title: "Merge Triplets to Form Target Triplet",
        difficulty: "Medium",
        category: "Greedy Algorithms",
        logicTags: ["greedy", "array"],
        description: `A **triplet** is an array of three integers. You are given a 2D integer array \`triplets\`, where \`triplets[i] = [ai, bi, ci]\` describes the \`ith\` triplet. You are also given an integer array \`target = [x, y, z]\` that describes the triplet you want to obtain.

To obtain \`target\`, you may apply the following operation on \`triplets\` **any number** of times (possibly **zero**):

*   Choose two indices (0-indexed) \`i\` and \`j\` (\`i != j\`) and update \`triplets[j]\` to become \`[max(ai, aj), max(bi, bj), max(ci, cj)]\`.
    *   For example, if \`triplets[i] = [2, 5, 3]\` and \`triplets[j] = [1, 7, 5]\`, \`triplets[j]\` will be updated to \`[max(2, 1), max(5, 7), max(3, 5)] = [2, 7, 5]\`.

Return \`true\` *if it is possible to obtain the* \`target\` *triplet* \`[x, y, z]\` *as an element of* \`triplets\`*, or* \`false\` *otherwise*.

### Example 1:
\`\`\`text
Input: triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]
Output: true
Explanation: Perform the following operations:
- Choose the first and last triplets [[2,5,3],[1,8,4],[1,7,5]]. Update the last triplet to be [max(2,1), max(5,7), max(3,5)] = [2,7,5]. triplets = [[2,5,3],[1,8,4],[2,7,5]]
The target triplet [2,7,5] is now an element of triplets.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[][]} triplets
 * @param {number[]} target
 * @return {boolean}
 */
var mergeTriplets = function(triplets, target) {
    
};`,
            python: `class Solution:
    def mergeTriplets(self, triplets: List[List[int]], target: List[int]) -> bool:
        pass`,
            java: `class Solution {
    public boolean mergeTriplets(int[][] triplets, int[] target) {
        return false;
    }
}`
        },
        testCases: [
            { input: `[[2,5,3],[1,8,4],[1,7,5]], [2,7,5]`, expectedOutput: `true` },
            { input: `[[3,4,5],[4,5,6]], [3,2,5]`, expectedOutput: `false` }
        ],
        order: 155
    },
    {
        id: "partition-labels",
        title: "Partition Labels",
        difficulty: "Medium",
        category: "Greedy Algorithms",
        logicTags: ["greedy", "hash-table", "two-pointers"],
        description: `You are given a string \`s\`. We want to partition the string into as many parts as possible so that each letter appears in at most one part.

Note that the partition is done so that after concatenating all the parts in order, the resultant string should be \`s\`.

Return *a list of integers representing the size of these parts*.

### Example 1:
\`\`\`text
Input: s = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function(s) {
    
};`,
            python: `class Solution:
    def partitionLabels(self, s: str) -> List[int]:
        pass`,
            java: `class Solution {
    public List<Integer> partitionLabels(String s) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `"ababcbacadefegdehijhklij"`, expectedOutput: `[9,7,8]` },
            { input: `"eccbbbbdec"`, expectedOutput: `[10]` }
        ,
        ],
        order: 156
    },
    {
        id: "valid-parenthesis-string",
        title: "Valid Parenthesis String",
        difficulty: "Medium",
        category: "Greedy Algorithms",
        logicTags: ["greedy", "string", "dp"],
        description: `Given a string \`s\` containing only three types of characters: \`'('\`, \`')'\` and \`'*'\`, return \`true\` *if* \`s\` *is **valid***.

The following rules define a **valid** string:
*   Any left parenthesis \`'('\` must have a corresponding right parenthesis \`')'\`.
*   Any right parenthesis \`')'\` must have a corresponding left parenthesis \`'('\`.
*   Left parenthesis \`'('\` must go before the corresponding right parenthesis \`')'\`.
*   \`'*'\` could be treated as a single right parenthesis \`')'\` or a single left parenthesis \`'('\` or an empty string \`""\`.

### Example 1:
\`\`\`text
Input: s = "()"
Output: true
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function(s) {
    
};`,
            python: `class Solution:
    def checkValidString(self, s: str) -> bool:
        pass`,
            java: `class Solution {
    public boolean checkValidString(String s) {
        return false;
    }
}`
        },
        testCases: [
            { input: `"()"`, expectedOutput: `true` },
            { input: `"(*)"`, expectedOutput: `true` },
            { input: `"(*))"`, expectedOutput: `true` }
        ,
        ],
        order: 157
    },
    {
        id: "candy",
        title: "Candy",
        difficulty: "Hard",
        category: "Greedy Algorithms",
        logicTags: ["greedy", "array"],
        description: `There are \`n\` children standing in a line. Each child is assigned a rating value given in the integer array \`ratings\`.

You are giving candies to these children subjected to the following requirements:
*   Each child must have at least one candy.
*   Children with a higher rating get more candies than their neighbors.

Return *the minimum number of candies you need to have to distribute the candies to the children*.

### Example 1:
\`\`\`text
Input: ratings = [1,0,2]
Output: 5
Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
    
};`,
            python: `class Solution:
    def candy(self, ratings: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int candy(int[] ratings) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[1,0,2]`, expectedOutput: `5` },
            { input: `[1,2,2]`, expectedOutput: `4` }
        ,
        ],
        order: 158
    },
    {
        id: "assign-cookies",
        title: "Assign Cookies",
        difficulty: "Easy",
        category: "Greedy Algorithms",
        logicTags: ["greedy", "sorting"],
        description: `Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.

Each child \`i\` has a greed factor \`g[i]\`, which is the minimum size of a cookie that the child will be content with; and each cookie \`j\` has a size \`s[j]\`. If \`s[j] >= g[i]\`, we can assign the cookie \`j\` to the child \`i\`, and the child \`i\` will be content. Your goal is to maximize the number of your content children and output the maximum number.

### Example 1:
\`\`\`text
Input: g = [1,2,3], s = [1,1]
Output: 1
Explanation: You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3. 
And even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1 content.
You need to output 1.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
    
};`,
            python: `class Solution:
    def findContentChildren(self, g: List[int], s: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int findContentChildren(int[] g, int[] s) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[1,2,3], [1,1]`, expectedOutput: `1` },
            { input: `[1,2], [1,2,3]`, expectedOutput: `2` }
        ,
        ],
        order: 159
    },
    {
        id: "maximum-subarray-greedy",
        title: "Maximum Subarray",
        difficulty: "Easy",
        category: "Greedy Algorithms",
        logicTags: ["greedy", "array", "dp"],
        description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return *its sum*.

### Example 1:
\`\`\`text
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
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
            { input: `[5,4,-1,7,8]`, expectedOutput: `23` }
        ,
        ],
        order: 160
    }
];
