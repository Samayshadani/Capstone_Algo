import { Question } from "@/types/question";

export const BST_QUESTIONS: Question[] = [
    {
        id: "search-in-a-binary-search-tree",
        title: "Search in a Binary Search Tree",
        difficulty: "Easy",
        category: "Binary Search Trees",
        logicTags: ["tree", "bst"],
        description: `You are given the \`root\` of a binary search tree (BST) and an integer \`val\`.

Find the node in the BST that the node's value equals \`val\` and return the subtree rooted with that node. If such a node does not exist, return \`null\`.

### Example 1:
\`\`\`text
Input: root = [4,2,7,1,3], val = 2
Output: [2,1,3]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function(root, val) {
    
};`,
            python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def searchBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        pass`,
            java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public TreeNode searchBST(TreeNode root, int val) {
        return null;
    }
}`
        },
        testCases: [
            { input: `[4,2,7,1,3], 2`, expectedOutput: `[2,1,3]` },
            { input: `[4,2,7,1,3], 5`, expectedOutput: `[]` }
        ,
        ],
        order: 131
    },
    {
        id: "insert-into-a-binary-search-tree",
        title: "Insert into a Binary Search Tree",
        difficulty: "Medium",
        category: "Binary Search Trees",
        logicTags: ["tree", "bst"],
        description: `You are given the \`root\` node of a binary search tree (BST) and a \`val\` to insert into the tree. Return *the root node of the BST after the insertion*. It is **guaranteed** that the new value does not exist in the original BST.

Notice that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return **any of them**.

### Example 1:
\`\`\`text
Input: root = [4,2,7,1,3], val = 5
Output: [4,2,7,1,3,5]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function(root, val) {
    
};`,
            python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def insertIntoBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        pass`,
            java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public TreeNode insertIntoBST(TreeNode root, int val) {
        return null;
    }
}`
        },
        testCases: [
            { input: `[4,2,7,1,3], 5`, expectedOutput: `[4,2,7,1,3,5]` },
            { input: `[40,20,60,10,30,50,70], 25`, expectedOutput: `[40,20,60,10,30,50,70,null,null,25]` }
        ,
        ],
        order: 132
    },
    {
        id: "delete-node-in-a-bst",
        title: "Delete Node in a BST",
        difficulty: "Medium",
        category: "Binary Search Trees",
        logicTags: ["tree", "bst"],
        description: `Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return *the root node reference (possibly updated) of the BST*.

Basically, the deletion can be divided into two stages:
1.  Search for a node to remove.
2.  If the node is found, delete the node.

### Example 1:
\`\`\`text
Input: root = [5,3,6,2,4,null,7], key = 3
Output: [5,4,6,2,null,null,7]
Explanation: Given key to delete is 3. So we find the node with value 3 and delete it.
One valid answer is [5,4,6,2,null,null,7], shown in the above BST.
Please notice that another valid answer is [5,2,6,null,4,null,7] and it's also accepted.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function(root, key) {
    
};`,
            python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        pass`,
            java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public TreeNode deleteNode(TreeNode root, int key) {
        return null;
    }
}`
        },
        testCases: [
            { input: `[5,3,6,2,4,null,7], 3`, expectedOutput: `[5,4,6,2,null,null,7]` },
            { input: `[5,3,6,2,4,null,7], 0`, expectedOutput: `[5,3,6,2,4,null,7]` }
        ,
        ],
        order: 133
    },
    {
        id: "validate-binary-search-tree",
        title: "Validate Binary Search Tree",
        difficulty: "Medium",
        category: "Binary Search Trees",
        logicTags: ["tree", "bst", "dfs"],
        description: `Given the \`root\` of a binary tree, determine if it is a valid binary search tree (BST).

A **valid BST** is defined as follows:
*   The left subtree of a node contains only nodes with keys **less than** the node's key.
*   The right subtree of a node contains only nodes with keys **greater than** the node's key.
*   Both the left and right subtrees must also be binary search trees.

### Example 1:
\`\`\`text
Input: root = [2,1,3]
Output: true
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    
};`,
            python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        pass`,
            java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public boolean isValidBST(TreeNode root) {
        return false;
    }
}`
        },
        testCases: [
            { input: `[2,1,3]`, expectedOutput: `true` },
            { input: `[5,1,4,null,null,3,6]`, expectedOutput: `false` }
        ,
        ],
        order: 134
    },
    {
        id: "kth-smallest-element-in-a-bst",
        title: "Kth Smallest Element in a BST",
        difficulty: "Medium",
        category: "Binary Search Trees",
        logicTags: ["tree", "bst", "dfs"],
        description: `Given the \`root\` of a binary search tree, and an integer \`k\`, return *the* \`kth\` *smallest value (1-indexed) of all the values of the nodes in the tree*.

### Example 1:
\`\`\`text
Input: root = [3,1,4,null,2], k = 1
Output: 1
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    
};`,
            python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        pass`,
            java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public int kthSmallest(TreeNode root, int k) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[3,1,4,null,2], 1`, expectedOutput: `1` },
            { input: `[5,3,6,2,4,null,null,1], 3`, expectedOutput: `3` }
        ,
        ],
        order: 135
    },
    {
        id: "lowest-common-ancestor-of-a-binary-search-tree",
        title: "Lowest Common Ancestor of a BST",
        difficulty: "Easy",
        category: "Binary Search Trees",
        logicTags: ["tree", "bst", "dfs"],
        description: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the [definition of LCA on Wikipedia](https://en.wikipedia.org/wiki/Lowest_common_ancestor): “The lowest common ancestor is defined between two nodes \`p\` and \`q\` as the lowest node in \`T\` that has both \`p\` and \`q\` as descendants (where we allow **a node to be a descendant of itself**).”

### Example 1:
\`\`\`text
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    
};`,
            python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        pass`,
            java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        return null;
    }
}`
        },
        testCases: [
            { input: `[6,2,8,0,4,7,9,null,null,3,5], 2, 8`, expectedOutput: `6` },
            { input: `[6,2,8,0,4,7,9,null,null,3,5], 2, 4`, expectedOutput: `2` }
        ],
        order: 136
    },
    {
        id: "convert-sorted-array-to-binary-search-tree",
        title: "Convert Sorted Array to Binary Search Tree",
        difficulty: "Easy",
        category: "Binary Search Trees",
        logicTags: ["tree", "bst", "divide-and-conquer"],
        description: `Given an integer array \`nums\` where the elements are sorted in **ascending order**, convert *it to a **height-balanced** binary search tree*.

### Example 1:
\`\`\`text
Input: nums = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: [0,-10,5,null,-3,null,9] is also accepted:
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    
};`,
            python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:
        pass`,
            java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return null;
    }
}`
        },
        testCases: [
            { input: `[-10,-3,0,5,9]`, expectedOutput: `[0,-3,9,-10,null,5]` },
            { input: `[1,3]`, expectedOutput: `[3,1]` }
        ],
        order: 137
    },
    {
        id: "two-sum-iv-input-is-a-bst",
        title: "Two Sum IV - Input is a BST",
        difficulty: "Easy",
        category: "Binary Search Trees",
        logicTags: ["tree", "bst", "bfs", "dfs"],
        description: `Given the \`root\` of a Binary Search Tree and a target number \`k\`, return \`true\` *if there exist two elements in the BST such that their sum is equal to the given target*.

### Example 1:
\`\`\`text
Input: root = [5,3,6,2,4,null,7], k = 9
Output: true
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function(root, k) {
    
};`,
            python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def findTarget(self, root: Optional[TreeNode], k: int) -> bool:
        pass`,
            java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public boolean findTarget(TreeNode root, int k) {
        return false;
    }
}`
        },
        testCases: [
            { input: `[5,3,6,2,4,null,7], 9`, expectedOutput: `true` },
            { input: `[5,3,6,2,4,null,7], 28`, expectedOutput: `false` }
        ],
        order: 138
    },
    {
        id: "trim-a-binary-search-tree",
        title: "Trim a Binary Search Tree",
        difficulty: "Medium",
        category: "Binary Search Trees",
        logicTags: ["tree", "bst", "dfs"],
        description: `Given the \`root\` of a binary search tree and the lowest and highest boundaries as \`low\` and \`high\`, trim the tree so that all its elements lies in \`[low, high]\`. Trimming the tree should **not** change the relative structure of the elements that will remain in the tree (i.e., any node's descendant should remain a descendant). It can be proven that there is a **unique answer**.

Return *the root of the trimmed binary search tree*. Note that the root may change depending on the given bounds.

### Example 1:
\`\`\`text
Input: root = [1,0,2], low = 1, high = 2
Output: [1,null,2]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 */
var trimBST = function(root, low, high) {
    
};`,
            python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def trimBST(self, root: Optional[TreeNode], low: int, high: int) -> Optional[TreeNode]:
        pass`,
            java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public TreeNode trimBST(TreeNode root, int low, int high) {
        return null;
    }
}`
        },
        testCases: [
            { input: `[1,0,2], 1, 2`, expectedOutput: `[1,null,2]` },
            { input: `[3,0,4,null,2,null,null,1], 1, 3`, expectedOutput: `[3,2,null,1]` }
        ],
        order: 139
    },
    {
        id: "recover-binary-search-tree",
        title: "Recover Binary Search Tree",
        difficulty: "Medium",
        category: "Binary Search Trees",
        logicTags: ["tree", "bst", "dfs"],
        description: `You are given the \`root\` of a binary search tree (BST), where the values of **exactly** two nodes of the tree were swapped by mistake. *Recover the tree without changing its structure*.

### Example 1:
\`\`\`text
Input: root = [1,3,null,null,2]
Output: [3,1,null,null,2]
Explanation: 3 cannot be a left child of 1 because 3 > 1. Swapping 1 and 3 makes the BST valid.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function(root) {
    
};`,
            python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def recoverTree(self, root: Optional[TreeNode]) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        pass`,
            java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public void recoverTree(TreeNode root) {
        
    }
}`
        },
        testCases: [
            { input: `[1,3,null,null,2]`, expectedOutput: `[3,1,null,null,2]` },
            { input: `[3,1,4,null,null,2]`, expectedOutput: `[2,1,4,null,null,3]` }
        ],
        order: 140
    }
];
