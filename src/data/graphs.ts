import { Question } from "@/types/question";

export const GRAPHS_QUESTIONS: Question[] = [
    {
        id: "number-of-islands",
        title: "Number of Islands",
        difficulty: "Medium",
        category: "Graphs",
        logicTags: ["graph", "dfs", "bfs", "union-find", "matrix"],
        description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return *the number of islands*.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

### Example 1:
\`\`\`text
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    
};`,
            python: `class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        pass`,
            java: `class Solution {
    public int numIslands(char[][] grid) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]`, expectedOutput: `1` },
            { input: `[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]`, expectedOutput: `3` }
        ,
        ],
        order: 191
    },
    {
        id: "max-area-of-island",
        title: "Max Area of Island",
        difficulty: "Medium",
        category: "Graphs",
        logicTags: ["graph", "dfs", "bfs", "union-find", "matrix"],
        description: `You are given an \`m x n\` binary matrix \`grid\` . An island is a group of \`1\`'s (representing land) connected **4-directionally** (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

The **area** of an island is the number of cells with a value \`1\` in the island.

Return *the maximum **area** of an island in* \`grid\`. If there is no island, return \`0\`.

### Example 1:
\`\`\`text
Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
Output: 6
Explanation: The answer is not 11, because the island must be connected 4-directionally.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    
};`,
            python: `class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        pass`,
            java: `class Solution {
    public int maxAreaOfIsland(int[][] grid) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]`, expectedOutput: `6` },
            { input: `[[0,0,0,0,0,0,0,0]]`, expectedOutput: `0` }
        ,
        ],
        order: 192
    },
    {
        id: "clone-graph",
        title: "Clone Graph",
        difficulty: "Medium",
        category: "Graphs",
        logicTags: ["graph", "dfs", "bfs", "hash-table"],
        description: `Given a reference of a node in a **[connected](https://en.wikipedia.org/wiki/Connectivity_(graph_theory)#Connected_graph)** undirected graph.

Return a **[deep copy](https://en.wikipedia.org/wiki/Object_copying#Deep_copy)** (clone) of the graph.

Each node in the graph contains a value (\`int\`) and a list (\`List[Node]\`) of its neighbors.

\`\`\`text
class Node {
    public int val;
    public List<Node> neighbors;
}
\`\`\`

**Test case format:**

For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with \`val == 1\`, the second node with \`val == 2\`, and so on. The graph is represented in the test case using an adjacency list.

**An adjacency list** is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.

The given node will always be the first node with \`val = 1\`. You must return the **copy of the given node** as a reference to the cloned graph.

### Example 1:
\`\`\`text
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: There are 4 nodes in the graph.
1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
    
};`,
            python: `"""
# Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
"""

class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        pass`,
            java: `/*
// Definition for a Node.
class Node {
    public int val;
    public List<Node> neighbors;
    public Node() {
        val = 0;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val, ArrayList<Node> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}
*/

class Solution {
    public Node cloneGraph(Node node) {
        return null;
    }
}`
        },
        testCases: [
            { input: `[[2,4],[1,3],[2,4],[1,3]]`, expectedOutput: `[[2,4],[1,3],[2,4],[1,3]]` },
            { input: `[[]]`, expectedOutput: `[[]]` },
            { input: `[]`, expectedOutput: `[]` }
        ],
        order: 193
    },
    {
        id: "pacific-atlantic-water-flow",
        title: "Pacific Atlantic Water Flow",
        difficulty: "Medium",
        category: "Graphs",
        logicTags: ["graph", "dfs", "bfs", "matrix"],
        description: `There is an \`m x n\` rectangular island that borders both the **Pacific Ocean** and **Atlantic Ocean**. The **Pacific Ocean** touches the island's left and top edges, and the **Atlantic Ocean** touches the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an \`m x n\` integer matrix \`heights\` where \`heights[r][c]\` represents the **height above sea level** of the cell at coordinate \`(r, c)\`.

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is **less than or equal to** the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

Return *a 2D list of grid coordinates* \`result\` *where* \`result[i] = [ri, ci]\` *denotes that rain water can flow from cell* \`(ri, ci)\` *to **both** the Pacific and Atlantic oceans*.

### Example 1:
\`\`\`text
Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
[0,4]: [0,4] -> Pacific Ocean 
       [0,4] -> Atlantic Ocean
[1,3]: [1,3] -> [0,3] -> Pacific Ocean 
       [1,3] -> [1,4] -> Atlantic Ocean
...
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function(heights) {
    
};`,
            python: `class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        pass`,
            java: `class Solution {
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]`, expectedOutput: `[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]` },
            { input: `[[1]]`, expectedOutput: `[[0,0]]` }
        ],
        order: 194
    },
    {
        id: "surrounded-regions",
        title: "Surrounded Regions",
        difficulty: "Medium",
        category: "Graphs",
        logicTags: ["graph", "dfs", "bfs", "union-find", "matrix"],
        description: `Given an \`m x n\` matrix \`board\` containing \`'X'\` and \`'O'\`, *capture all regions that are 4-directionally surrounded by* \`'X'\`.

A region is **captured** by flipping all \`'O'\`s into \`'X'\`s in that surrounded region.

### Example 1:
\`\`\`text
Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
Explanation: Notice that an 'O' should not be flipped if:
- It is on the border, or
- It is adjacent to an 'O' that should not be flipped.
The bottom 'O' is on the border, so it is not flipped.
The other three 'O' form a surrounded region, so they are flipped.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
    
};`,
            python: `class Solution:
    def solve(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        pass`,
            java: `class Solution {
    public void solve(char[][] board) {
        
    }
}`
        },
        testCases: [
            { input: `[["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]`, expectedOutput: `[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]` },
            { input: `[["X"]]`, expectedOutput: `[["X"]]` }
        ],
        order: 195
    },
    {
        id: "rotting-oranges",
        title: "Rotting Oranges",
        difficulty: "Medium",
        category: "Graphs",
        logicTags: ["graph", "bfs", "matrix"],
        description: `You are given an \`m x n\` grid where each cell can have one of three values:

*   \`0\` representing an empty cell,
*   \`1\` representing a fresh orange, or
*   \`2\` representing a rotten orange.

Every minute, any fresh orange that is **4-directionally adjacent** to a rotten orange becomes rotten.

Return *the minimum number of minutes that must elapse until no cell has a fresh orange*. If this is impossible, return \`-1\`.

### Example 1:
\`\`\`text
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function(grid) {
    
};`,
            python: `class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        pass`,
            java: `class Solution {
    public int orangesRotting(int[][] grid) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[[2,1,1],[1,1,0],[0,1,1]]`, expectedOutput: `4` },
            { input: `[[2,1,1],[0,1,1],[1,0,1]]`, expectedOutput: `-1` },
            { input: `[[0,2]]`, expectedOutput: `0` }
        ,
        ],
        order: 196
    },
    {
        id: "walls-and-gates",
        title: "Walls and Gates",
        difficulty: "Medium",
        category: "Graphs",
        logicTags: ["graph", "bfs", "matrix"],
        description: `You are given an \`m x n\` grid \`rooms\` initialized with these three possible values.

*   \`-1\` A wall or an obstacle.
*   \`0\` A gate.
*   \`INF\` Infinity means an empty room. We use the value \`2^31 - 1 = 2147483647\` to represent \`INF\` as you may assume that the distance to a gate is less than \`2147483647\`.

Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with \`INF\`.

### Example 1:
\`\`\`text
Input: rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]
Output: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
var wallsAndGates = function(rooms) {
    
};`,
            python: `class Solution:
    def wallsAndGates(self, rooms: List[List[int]]) -> None:
        """
        Do not return anything, modify rooms in-place instead.
        """
        pass`,
            java: `class Solution {
    public void wallsAndGates(int[][] rooms) {
        
    }
}`
        },
        testCases: [
            { input: `[[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]`, expectedOutput: `[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]` },
            { input: `[[-1]]`, expectedOutput: `[[-1]]` }
        ],
        order: 197
    },
    {
        id: "course-schedule",
        title: "Course Schedule",
        difficulty: "Medium",
        category: "Graphs",
        logicTags: ["graph", "dfs", "bfs", "topological-sort"],
        description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [ai, bi]\` indicates that you **must** take course \`bi\` first if you want to take course \`ai\`.

*   For example, the pair \`[0, 1]\`, indicates that to take course \`0\` you have to first take course \`1\`.

Return \`true\` if you can finish all courses. Otherwise, return \`false\`.

### Example 1:
\`\`\`text
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    
};`,
            python: `class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        pass`,
            java: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        return false;
    }
}`
        },
        testCases: [
            { input: `2, [[1,0]]`, expectedOutput: `true` },
            { input: `2, [[1,0],[0,1]]`, expectedOutput: `false` }
        ,
        ],
        order: 198
    },
    {
        id: "course-schedule-ii",
        title: "Course Schedule II",
        difficulty: "Medium",
        category: "Graphs",
        logicTags: ["graph", "dfs", "bfs", "topological-sort"],
        description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [ai, bi]\` indicates that you **must** take course \`bi\` first if you want to take course \`ai\`.

*   For example, the pair \`[0, 1]\`, indicates that to take course \`0\` you have to first take course \`1\`.

Return *the ordering of courses you should take to finish all courses*. If there are many valid answers, return **any** of them. If it is impossible to finish all courses, return **an empty array**.

### Example 1:
\`\`\`text
Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
    
};`,
            python: `class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        pass`,
            java: `class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        return new int[]{};
    }
}`
        },
        testCases: [
            { input: `2, [[1,0]]`, expectedOutput: `[0,1]` },
            { input: `4, [[1,0],[2,0],[3,1],[3,2]]`, expectedOutput: `[0,2,1,3]` }
        ,
        ],
        order: 199
    },
    {
        id: "graph-valid-tree",
        title: "Graph Valid Tree",
        difficulty: "Medium",
        category: "Graphs",
        logicTags: ["graph", "dfs", "bfs", "union-find"],
        description: `You have a graph of \`n\` nodes labeled from \`0\` to \`n - 1\`. You are given an integer \`n\` and a list of \`edges\` where \`edges[i] = [ai, bi]\` indicates that there is an undirected edge between nodes \`ai\` and \`bi\` in the graph.

Return \`true\` *if the edges of the given graph make up a valid tree, and* \`false\` *otherwise*.

### Example 1:
\`\`\`text
Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
Output: true
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function(n, edges) {
    
};`,
            python: `class Solution:
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        pass`,
            java: `class Solution {
    public boolean validTree(int n, int[][] edges) {
        return false;
    }
}`
        },
        testCases: [
            { input: `5, [[0,1],[0,2],[0,3],[1,4]]`, expectedOutput: `true` },
            { input: `5, [[0,1],[1,2],[2,3],[1,3],[1,4]]`, expectedOutput: `false` }
        ],
        order: 200
    }
];
