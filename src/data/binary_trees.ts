import { Question } from "@/types/question";

export const BINARY_TREE_QUESTIONS: Question[] = [
    {
        id: "invert-binary-tree",
        title: "Invert Binary Tree",
        difficulty: "Easy",
        category: "Binary Trees",
        logicTags: ["tree", "dfs", "bfs"],
        description: `Given the \`root\` of a binary tree, invert the tree, and return *its root*.

### Example 1:
\`\`\`text
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
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
 * @return {TreeNode}
 */
var invertTree = function(root) {
    
};`,
            python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
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
    public TreeNode invertTree(TreeNode root) {
        return null;
    }
}`
        },
        testCases: [
            { input: `[4,2,7,1,3,6,9]`, expectedOutput: `[4,7,2,9,6,3,1]` },
            { input: `[2,1,3]`, expectedOutput: `[2,3,1]` }
        ,
        ],
        order: 121
    },
    {
        id: "maximum-depth-of-binary-tree",
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        category: "Binary Trees",
        logicTags: ["tree", "dfs", "bfs"],
        description: `Given the \`root\` of a binary tree, return *its maximum depth*.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.

### Example 1:
\`\`\`text
Input: root = [3,9,20,null,null,15,7]
Output: 3
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
 * @return {number}
 */
var maxDepth = function(root) {
    
};`,
            python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
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
    public int maxDepth(TreeNode root) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[3,9,20,null,null,15,7]`, expectedOutput: `3` },
            { input: `[1,null,2]`, expectedOutput: `2` }
        ,
        ],
        order: 122
    },
    {
        id: "diameter-of-binary-tree",
        title: "Diameter of Binary Tree",
        difficulty: "Easy",
        category: "Binary Trees",
        logicTags: ["tree", "dfs"],
        description: `Given the \`root\` of a binary tree, return *the length of the **diameter** of the tree*.

The **diameter** of a binary tree is the **length** of the longest path between any two nodes in a tree. This path may or may not pass through the \`root\`.

The **length** of a path between two nodes is represented by the number of edges between them.

### Example 1:
\`\`\`text
Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].
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
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
    
};`,
            python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
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
    public int diameterOfBinaryTree(TreeNode root) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[1,2,3,4,5]`, expectedOutput: `3` },
            { input: `[1,2]`, expectedOutput: `1` }
        ,
        ],
        order: 123
    },
    {
        id: "balanced-binary-tree",
        title: "Balanced Binary Tree",
        difficulty: "Easy",
        category: "Binary Trees",
        logicTags: ["tree", "dfs"],
        description: `Given a binary tree, determine if it is **height-balanced**.

A **height-balanced** binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

### Example 1:
\`\`\`text
Input: root = [3,9,20,null,null,15,7]
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
var isBalanced = function(root) {
    
};`,
            python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
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
    public boolean isBalanced(TreeNode root) {
        return false;
    }
}`
        },
        testCases: [
            { input: `[3,9,20,null,null,15,7]`, expectedOutput: `true` },
            { input: `[1,2,2,3,3,null,null,4,4]`, expectedOutput: `false` }
        ,
        ],
        order: 124
    },
    {
        id: "same-tree",
        title: "Same Tree",
        difficulty: "Easy",
        category: "Binary Trees",
        logicTags: ["tree", "dfs", "bfs"],
        description: `Given the roots of two binary trees \`p\` and \`q\`, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

### Example 1:
\`\`\`text
Input: p = [1,2,3], q = [1,2,3]
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    
};`,
            python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
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
    public boolean isSameTree(TreeNode p, TreeNode q) {
        return false;
    }
}`
        },
        testCases: [
            { input: `[1,2,3], [1,2,3]`, expectedOutput: `true` },
            { input: `[1,2], [1,null,2]`, expectedOutput: `false` }
        ,
        ],
        order: 125
    },
    {
        id: "subtree-of-another-tree",
        title: "Subtree of Another Tree",
        difficulty: "Easy",
        category: "Binary Trees",
        logicTags: ["tree", "dfs"],
        description: `Given the roots of two binary trees \`root\` and \`subRoot\`, return \`true\` if there is a subtree of \`root\` with the same structure and node values of \`subRoot\` and \`false\` otherwise.

A subtree of a binary tree \`tree\` is a tree that consists of a node in \`tree\` and all of this node's descendants. The tree \`tree\` could also be considered as a subtree of itself.

### Example 1:
\`\`\`text
Input: root = [3,4,5,1,2], subRoot = [4,1,2]
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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function(root, subRoot) {
    
};`,
            python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
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
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        return false;
    }
}`
        },
        testCases: [
            { input: `[3,4,5,1,2], [4,1,2]`, expectedOutput: `true` },
            { input: `[3,4,5,1,2,null,null,null,null,0], [4,1,2]`, expectedOutput: `false` }
        ,
        ],
        order: 126
    },
    {
        id: "lowest-common-ancestor-of-a-binary-tree",
        title: "Lowest Common Ancestor of a Binary Tree",
        difficulty: "Medium",
        category: "Binary Trees",
        logicTags: ["tree", "dfs"],
        description: `Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the [definition of LCA on Wikipedia](https://en.wikipedia.org/wiki/Lowest_common_ancestor): “The lowest common ancestor is defined between two nodes \`p\` and \`q\` as the lowest node in \`T\` that has both \`p\` and \`q\` as descendants (where we allow **a node to be a descendant of itself**).”

### Example 1:
\`\`\`text
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.
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
            { input: `[3,5,1,6,2,0,8,null,null,7,4], 5, 1`, expectedOutput: `3` },
            { input: `[3,5,1,6,2,0,8,null,null,7,4], 5, 4`, expectedOutput: `5` }
        ,
        ],
        order: 127
    },
    {
        id: "binary-tree-level-order-traversal",
        title: "Binary Tree Level Order Traversal",
        difficulty: "Medium",
        category: "Binary Trees",
        logicTags: ["tree", "bfs"],
        description: `Given the \`root\` of a binary tree, return *the level order traversal of its nodes' values*. (i.e., from left to right, level by level).

### Example 1:
\`\`\`text
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    
};`,
            python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
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
    public List<List<Integer>> levelOrder(TreeNode root) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `[3,9,20,null,null,15,7]`, expectedOutput: `[[3],[9,20],[15,7]]` },
            { input: `[1]`, expectedOutput: `[[1]]` },
            { input: `[]`, expectedOutput: `[]` }
        ,
        ],
        order: 128
    },
    {
        id: "binary-tree-right-side-view",
        title: "Binary Tree Right Side View",
        difficulty: "Medium",
        category: "Binary Trees",
        logicTags: ["tree", "dfs", "bfs"],
        description: `Given the \`root\` of a binary tree, imagine standing on the **right side** of it, return *the values of the nodes you can see ordered from top to bottom*.

### Example 1:
\`\`\`text
Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]
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
 * @return {number[]}
 */
var rightSideView = function(root) {
    
};`,
            python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
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
    public List<Integer> rightSideView(TreeNode root) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `[1,2,3,null,5,null,4]`, expectedOutput: `[1,3,4]` },
            { input: `[1,null,3]`, expectedOutput: `[1,3]` }
        ,
        ],
        order: 129
    },
    {
        id: "construct-binary-tree-from-preorder-and-inorder-traversal",
        title: "Construct Binary Tree from Preorder and Inorder Traversal",
        difficulty: "Medium",
        category: "Binary Trees",
        logicTags: ["tree", "array", "hash-table"],
        description: `Given two integer arrays \`preorder\` and \`inorder\` where \`preorder\` is the preorder traversal of a binary tree and \`inorder\` is the inorder traversal of the same tree, construct and return *the binary tree*.

### Example 1:
\`\`\`text
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    
};`,
            python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
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
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        return null;
    }
}`
        },
        testCases: [
            { input: `[3,9,20,15,7], [9,3,15,20,7]`, expectedOutput: `[3,9,20,null,null,15,7]` },
            { input: `[-1], [-1]`, expectedOutput: `[-1]` }
        ],
        order: 130
    }
];
