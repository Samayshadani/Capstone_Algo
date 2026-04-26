import { Question } from "@/types/question";

export const LINKED_LIST_QUESTIONS: Question[] = [
    {
        id: "reverse-linked-list",
        title: "Reverse Linked List",
        difficulty: "Easy",
        category: "Linked Lists",
        logicTags: ["iterative", "recursive"],
        description: `Given the \`head\` of a singly linked list, reverse the list, and return *the reversed list*.

### Example 1:
\`\`\`text
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
\`\`\`

### Example 2:
\`\`\`text
Input: head = [1,2]
Output: [2,1]
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
var reverseList = function(head) {
    
};`,
            python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
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
    public ListNode reverseList(ListNode head) {
        return null;
    }
}`
        },
        testCases: [
            { input: `[1,2,3,4,5]`, expectedOutput: `[5,4,3,2,1]` },
            { input: `[1,2]`, expectedOutput: `[2,1]` }
        ,
        ],
        order: 21,
        nextQuestionId: "palindrome-linked-list"
    },
    {
        id: "merge-two-sorted-lists",
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        category: "Linked Lists",
        logicTags: ["recursion", "pointers"],
        description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return *the head of the merged linked list*.

### Example 1:
\`\`\`text
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
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
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    
};`,
            python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
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
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        return null;
    }
}`
        },
        testCases: [
            { input: `[1,2,4], [1,3,4]`, expectedOutput: `[1,1,2,3,4,4]` },
            { input: `[], []`, expectedOutput: `[]` }
        ,
        ],
        order: 22
    },
    {
        id: "linked-list-cycle",
        title: "Linked List Cycle",
        difficulty: "Easy",
        category: "Linked Lists",
        logicTags: ["floyds-cycle", "two-pointers"],
        description: `Given \`head\`, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the \`next\` pointer. Internally, \`pos\` is used to denote the index of the node that tail's \`next\` pointer is connected to. **Note that \`pos\` is not passed as a parameter**.

Return \`true\` *if there is a cycle in the linked list*. Otherwise, return \`false\`.

### Example 1:
\`\`\`text
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    
};`,
            python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        pass`,
            java: `/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public boolean hasCycle(ListNode head) {
        return false;
    }
}`
        },
        testCases: [
            { input: `[3,2,0,-4], 1`, expectedOutput: `true` },
            { input: `[1], -1`, expectedOutput: `false` }
        ,
        ],
        order: 23
    },
    {
        id: "remove-nth-node-from-end-of-list",
        title: "Remove Nth Node From End of List",
        difficulty: "Medium",
        category: "Linked Lists",
        logicTags: ["two-pointers"],
        description: `Given the \`head\` of a linked list, remove the \`nth\` node from the end of the list and return its head.

### Example 1:
\`\`\`text
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    
};`,
            python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
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
    public ListNode removeNthFromEnd(ListNode head, int n) {
        return null;
    }
}`
        },
        testCases: [
            { input: `[1,2,3,4,5], 2`, expectedOutput: `[1,2,3,5]` },
            { input: `[1], 1`, expectedOutput: `[]` }
        ,
        ],
        order: 24
    },
    {
        id: "reorder-list",
        title: "Reorder List",
        difficulty: "Medium",
        category: "Linked Lists",
        logicTags: ["stack", "merge"],
        description: `You are given the head of a singly linked-list. The list can be represented as:

\`L0 -> L1 -> ... -> Ln - 1 -> Ln\`

Reorder the list to be on the following form:

\`L0 -> Ln -> L1 -> Ln - 1 -> L2 -> Ln - 2 -> ...\`

You may not modify the values in the list's nodes. Only nodes themselves may be changed.

### Example 1:
\`\`\`text
Input: head = [1,2,3,4]
Output: [1,4,2,3]
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
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
    
};`,
            python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
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
    public void reorderList(ListNode head) {
        
    }
}`
        },
        testCases: [
            { input: `[1,2,3,4]`, expectedOutput: `[1,4,2,3]` },
            { input: `[1,2,3,4,5]`, expectedOutput: `[1,5,2,4,3]` }
        ,
        ],
        order: 25
    },
    {
        id: "add-two-numbers",
        title: "Add Two Numbers",
        difficulty: "Medium",
        category: "Linked Lists",
        logicTags: ["math", "pointers"],
        description: `You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

### Example 1:
\`\`\`text
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    
};`,
            python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
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
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        return null;
    }
}`
        },
        testCases: [
            { input: `[2,4,3], [5,6,4]`, expectedOutput: `[7,0,8]` },
            { input: `[0], [0]`, expectedOutput: `[0]` }
        ,
        ],
        order: 26
    },
    {
        id: "palindrome-linked-list",
        title: "Palindrome Linked List",
        difficulty: "Easy",
        category: "Linked Lists",
        logicTags: ["two-pointers"],
        description: `Given the \`head\` of a singly linked list, return \`true\` if it is a **palindrome** or \`false\` otherwise.

### Example 1:
\`\`\`text
Input: head = [1,2,2,1]
Output: true
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
 * @return {boolean}
 */
var isPalindrome = function(head) {
    
};`,
            python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
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
    public boolean isPalindrome(ListNode head) {
        return false;
    }
}`
        },
        testCases: [
            { input: `[1,2,2,1]`, expectedOutput: `true` },
            { input: `[1,2]`, expectedOutput: `false` }
        ,
        ],
        order: 27,
        prerequisites: ["reverse-linked-list"]
    },
    {
        id: "intersection-of-two-linked-lists",
        title: "Intersection of Two Linked Lists",
        difficulty: "Easy",
        category: "Linked Lists",
        logicTags: ["pointers"],
        description: `Given the heads of two singly linked-lists \`headA\` and \`headB\`, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return \`null\`.

### Example 1:
\`\`\`text
Input: listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
Output: Intersected at '8'
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    
};`,
            python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
        pass`,
            java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        return null;
    }
}`
        },
        testCases: [
            { input: `[4,1,8,4,5], [5,6,1,8,4,5]`, expectedOutput: `8` },
            { input: `[2,6,4], [1,5]`, expectedOutput: `null` }
        ,
        ],
        order: 28
    },
    {
        id: "swap-nodes-in-pairs",
        title: "Swap Nodes in Pairs",
        difficulty: "Medium",
        category: "Linked Lists",
        logicTags: ["recursion", "iterative"],
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
        order: 29
    },
    {
        id: "reverse-nodes-in-k-group",
        title: "Reverse Nodes in k-Group",
        difficulty: "Hard",
        category: "Linked Lists",
        logicTags: ["recursion", "hard"],
        description: `Given the head of a linked list, reverse the nodes of the list \`k\` at a time, and return *the modified list*.

\`k\` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of \`k\` then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

### Example 1:
\`\`\`text
Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]
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
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
    
};`,
            python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
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
    public ListNode reverseKGroup(ListNode head, int k) {
        return null;
    }
}`
        },
        testCases: [
            { input: `[1,2,3,4,5], 2`, expectedOutput: `[2,1,4,3,5]` },
            { input: `[1,2,3,4,5], 3`, expectedOutput: `[3,2,1,4,5]` }
        ,
        ],
        order: 30
    }
];
