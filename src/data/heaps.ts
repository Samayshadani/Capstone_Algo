import { Question } from "@/types/question";

export const HEAPS_QUESTIONS: Question[] = [
    {
        id: "kth-largest-element-in-an-array-heap",
        title: "Kth Largest Element in an Array",
        difficulty: "Medium",
        category: "Heaps",
        logicTags: ["heap", "sorting", "divide-and-conquer"],
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
        ,
        ],
        order: 141
    },
    {
        id: "k-closest-points-to-origin",
        title: "K Closest Points to Origin",
        difficulty: "Medium",
        category: "Heaps",
        logicTags: ["heap", "sorting", "geometry"],
        description: `Given an array of \`points\` where \`points[i] = [xi, yi]\` represents a point on the **X-Y** plane and an integer \`k\`, return the \`k\` closest points to the origin \`(0, 0)\`.

The distance between two points on the **X-Y** plane is the Euclidean distance (i.e., \`√(x1 - x2)^2 + (y1 - y2)^2\`).

You may return the answer in **any order**. The answer is **guaranteed** to be **unique** (except for the order that it is in).

### Example 1:
\`\`\`text
Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
Explanation:
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest k = 1 points from the origin, so the answer is [[-2,2]].
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function(points, k) {
    
};`,
            python: `class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        pass`,
            java: `class Solution {
    public int[][] kClosest(int[][] points, int k) {
        return new int[][]{};
    }
}`
        },
        testCases: [
            { input: `[[1,3],[-2,2]], 1`, expectedOutput: `[[-2,2]]` },
            { input: `[[3,3],[5,-1],[-2,4]], 2`, expectedOutput: `[[3,3],[-2,4]]` }
        ,
        ],
        order: 142
    },
    {
        id: "top-k-frequent-elements-heap",
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        category: "Heaps",
        logicTags: ["heap", "sorting", "hash-table"],
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
        order: 143
    },
    {
        id: "task-scheduler",
        title: "Task Scheduler",
        difficulty: "Medium",
        category: "Heaps",
        logicTags: ["heap", "greedy", "sorting"],
        description: `Given a characters array \`tasks\`, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer \`n\` that represents the cooldown period between two **same tasks** (the same letter in the array), that is that there must be at least \`n\` units of time between any two same tasks.

Return *the least number of units of times that the CPU will take to finish all the given tasks*.

### Example 1:
\`\`\`text
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: 
A -> B -> idle -> A -> B -> idle -> A -> B
There is at least 2 units of time between any two same tasks.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
    
};`,
            python: `class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        pass`,
            java: `class Solution {
    public int leastInterval(char[] tasks, int n) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `["A","A","A","B","B","B"], 2`, expectedOutput: `8` },
            { input: `["A","A","A","B","B","B"], 0`, expectedOutput: `6` }
        ],
        order: 144
    },
    {
        id: "design-twitter",
        title: "Design Twitter",
        difficulty: "Medium",
        category: "Heaps",
        logicTags: ["heap", "design", "hash-table"],
        description: `Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the \`10\` most recent tweets in the user's news feed.

Implement the \`Twitter\` class:

*   \`Twitter()\` Initializes your twitter object.
*   \`void postTweet(int userId, int tweetId)\` Composes a new tweet with ID \`tweetId\` by the user \`userId\`. Each call to this function will be generated with a unique \`tweetId\`.
*   \`List<Integer> getNewsFeed(int userId)\` Retrieves the \`10\` most recent tweet IDs in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user themself. Tweets must be ordered from most recent to least recent.
*   \`void follow(int followerId, int followeeId)\` The user with ID \`followerId\` started following the user with ID \`followeeId\`.
*   \`void unfollow(int followerId, int followeeId)\` The user with ID \`followerId\` started unfollowing the user with ID \`followeeId\`.

### Example 1:
\`\`\`text
Input
["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
Output
[null, null, [5], null, null, [6, 5], null, [5]]
\`\`\`
`,
        defaultCode: {
            javascript: `
var Twitter = function() {
    
};

/** 
 * @param {number} userId 
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {
    
};

/** 
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {
    
};

/** 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {
    
};

/** 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {
    
};`,
            python: `class Twitter:

    def __init__(self):
        pass

    def postTweet(self, userId: int, tweetId: int) -> None:
        pass

    def getNewsFeed(self, userId: int) -> List[int]:
        pass

    def follow(self, followerId: int, followeeId: int) -> None:
        pass

    def unfollow(self, followerId: int, followeeId: int) -> None:
        pass`,
            java: `class Twitter {

    public Twitter() {
        
    }
    
    public void postTweet(int userId, int tweetId) {
        
    }
    
    public List<Integer> getNewsFeed(int userId) {
        return new ArrayList<>();
    }
    
    public void follow(int followerId, int followeeId) {
        
    }
    
    public void unfollow(int followerId, int followeeId) {
        
    }
}`
        },
        testCases: [
            { input: `["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"], [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]`, expectedOutput: `[null, null, [5], null, null, [6, 5], null, [5]]` }
        ],
        order: 145
    },
    {
        id: "find-median-from-data-stream",
        title: "Find Median from Data Stream",
        difficulty: "Hard",
        category: "Heaps",
        logicTags: ["heap", "sorting", "design"],
        description: `The **median** is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

*   For example, for \`arr = [2,3,4]\`, the median is \`3\`.
*   For example, for \`arr = [2,3]\`, the median is \`(2 + 3) / 2 = 2.5\`.

Implement the MedianFinder class:

*   \`MedianFinder()\` initializes the \`MedianFinder\` object.
*   \`void addNum(int num)\` adds the integer \`num\` from the data stream to the data structure.
*   \`double findMedian()\` returns the median of all elements so far. Answers within \`10^-5\` of the actual answer will be accepted.

### Example 1:
\`\`\`text
Input
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output
[null, null, null, 1.5, null, 2.0]
\`\`\`
`,
        defaultCode: {
            javascript: `
var MedianFinder = function() {
    
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    
};`,
            python: `class MedianFinder:

    def __init__(self):
        pass

    def addNum(self, num: int) -> None:
        pass

    def findMedian(self) -> float:
        pass`,
            java: `class MedianFinder {

    public MedianFinder() {
        
    }
    
    public void addNum(int num) {
        
    }
    
    public double findMedian() {
        return 0.0;
    }
}`
        },
        testCases: [
            { input: `["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"], [[], [1], [2], [], [3], []]`, expectedOutput: `[null, null, null, 1.5, null, 2.0]` }
        ],
        order: 146
    },
    {
        id: "merge-k-sorted-lists",
        title: "Merge K Sorted Lists",
        difficulty: "Hard",
        category: "Heaps",
        logicTags: ["heap", "linked-list", "divide-and-conquer"],
        description: `You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order.

*Merge all the linked-lists into one sorted linked-list and return it.*

### Example 1:
\`\`\`text
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
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
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    
};`,
            python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
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
    public ListNode mergeKLists(ListNode[] lists) {
        return null;
    }
}`
        },
        testCases: [
            { input: `[[1,4,5],[1,3,4],[2,6]]`, expectedOutput: `[1,1,2,3,4,4,5,6]` },
            { input: `[]`, expectedOutput: `[]` }
        ],
        order: 147
    },
    {
        id: "last-stone-weight",
        title: "Last Stone Weight",
        difficulty: "Easy",
        category: "Heaps",
        logicTags: ["heap", "array"],
        description: `You are given an array of integers \`stones\` where \`stones[i]\` is the weight of the \`ith\` stone.

We are playing a game with the stones. On each turn, we choose the **heaviest two stones** and smash them together. Suppose the heaviest two stones have weights \`x\` and \`y\` with \`x <= y\`. The result of this smash is:

*   If \`x == y\`, both stones are destroyed, and
*   If \`x != y\`, the stone of weight \`x\` is destroyed, and the stone of weight \`y\` has new weight \`y - x\`.

At the end of the game, there is **at most one** stone left.

Return *the weight of the last remaining stone*. If there are no stones left, return \`0\`.

### Example 1:
\`\`\`text
Input: stones = [2,7,4,1,8,1]
Output: 1
Explanation: 
We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of the last stone.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function(stones) {
    
};`,
            python: `class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int lastStoneWeight(int[] stones) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[2,7,4,1,8,1]`, expectedOutput: `1` },
            { input: `[1]`, expectedOutput: `1` }
        ,
        ],
        order: 148
    },
    {
        id: "kth-largest-element-in-a-stream",
        title: "Kth Largest Element in a Stream",
        difficulty: "Easy",
        category: "Heaps",
        logicTags: ["heap", "data-stream", "design"],
        description: `Design a class to find the \`kth\` largest element in a stream. Note that it is the \`kth\` largest element in the sorted order, not the \`kth\` distinct element.

Implement \`KthLargest\` class:

*   \`KthLargest(int k, int[] nums)\` Initializes the object with the integer \`k\` and the stream of integers \`nums\`.
*   \`int add(int val)\` Appends the integer \`val\` to the stream and returns the element representing the \`kth\` largest element in the stream.

### Example 1:
\`\`\`text
Input
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output
[null, 4, 5, 5, 8, 8]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function(k, nums) {
    
};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
    
};`,
            python: `class KthLargest:

    def __init__(self, k: int, nums: List[int]):
        pass

    def add(self, val: int) -> int:
        pass`,
            java: `class KthLargest {

    public KthLargest(int k, int[] nums) {
        
    }
    
    public int add(int val) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `["KthLargest", "add", "add", "add", "add", "add"], [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]`, expectedOutput: `[null, 4, 5, 5, 8, 8]` }
        ],
        order: 149
    },
    {
        id: "reorganize-string",
        title: "Reorganize String",
        difficulty: "Medium",
        category: "Heaps",
        logicTags: ["heap", "greedy", "hash-table"],
        description: `Given a string \`s\`, rearrange the characters of \`s\` so that any two adjacent characters are not the same.

Return *any possible rearrangement of* \`s\` *or return* \`""\` *if not possible*.

### Example 1:
\`\`\`text
Input: s = "aab"
Output: "aba"
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @return {string}
 */
var reorganizeString = function(s) {
    
};`,
            python: `class Solution:
    def reorganizeString(self, s: str) -> str:
        pass`,
            java: `class Solution {
    public String reorganizeString(String s) {
        return "";
    }
}`
        },
        testCases: [
            { input: `"aab"`, expectedOutput: `"aba"` },
            { input: `"aaab"`, expectedOutput: `""` }
        ,
        ],
        order: 150
    }
];
