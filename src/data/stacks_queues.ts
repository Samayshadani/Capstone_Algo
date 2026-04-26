import { Question } from "@/types/question";

export const STACKS_QUEUES_QUESTIONS: Question[] = [
    {
        id: "valid-parentheses",
        title: "Valid Parentheses",
        difficulty: "Easy",
        category: "Stacks & Queues",
        logicTags: ["stack", "string"],
        description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1.  Open brackets must be closed by the same type of brackets.
2.  Open brackets must be closed in the correct order.
3.  Every close bracket has a corresponding open bracket of the same type.

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
var isValid = function(s) {
    
};`,
            python: `class Solution:
    def isValid(self, s: str) -> bool:
        pass`,
            java: `class Solution {
    public boolean isValid(String s) {
        return false;
    }
}`
        },
        testCases: [
            { input: `"()"`, expectedOutput: `true` },
            { input: `"()[]{}"`, expectedOutput: `true` },
            { input: `"(]"`, expectedOutput: `false` },
        ],
        order: 101
    },
    {
        id: "min-stack",
        title: "Min Stack",
        difficulty: "Medium",
        category: "Stacks & Queues",
        logicTags: ["stack", "design"],
        description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the \`MinStack\` class:

*   \`MinStack()\` initializes the stack object.
*   \`void push(int val)\` pushes the element \`val\` onto the stack.
*   \`void pop()\` removes the element on the top of the stack.
*   \`int top()\` gets the top element of the stack.
*   \`int getMin()\` retrieves the minimum element in the stack.

You must implement a solution with \`O(1)\` time complexity for each function.

### Example 1:
\`\`\`text
Input
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

Output
[null,null,null,null,-3,null,0,-2]
\`\`\`
`,
        defaultCode: {
            javascript: `
var MinStack = function() {
    
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    
};`,
            python: `class MinStack:

    def __init__(self):
        pass

    def push(self, val: int) -> None:
        pass

    def pop(self) -> None:
        pass

    def top(self) -> int:
        pass

    def getMin(self) -> int:
        pass`,
            java: `class MinStack {

    public MinStack() {
        
    }
    
    public void push(int val) {
        
    }
    
    public void pop() {
        
    }
    
    public int top() {
        return 0;
    }
    
    public int getMin() {
        return 0;
    }
}`
        },
        testCases: [
            { input: `["MinStack","push","push","push","getMin","pop","top","getMin"], [[],[-2],[0],[-3],[],[],[],[]]`, expectedOutput: `[null,null,null,null,-3,null,0,-2]` }
        ],
        order: 102
    },
    {
        id: "evaluate-reverse-polish-notation",
        title: "Evaluate Reverse Polish Notation",
        difficulty: "Medium",
        category: "Stacks & Queues",
        logicTags: ["stack", "array", "math"],
        description: `You are given an array of strings \`tokens\` that represents an arithmetic expression in a [Reverse Polish Notation](http://en.wikipedia.org/wiki/Reverse_Polish_notation).

Evaluate the expression. Return *an integer that represents the value of the expression*.

Note that:
*   The valid operators are \`'+'\`, \`'-'\`, \`'*'\`, and \`'/'\`.
*   Each operand may be an integer or another expression.
*   The division between two integers always **truncates toward zero**.
*   There will not be any division by zero.
*   The input represents a valid arithmetic expression in a reverse polish notation.
*   The answer and all the intermediate calculations can be represented in a **32-bit** integer.

### Example 1:
\`\`\`text
Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
    
};`,
            python: `class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        pass`,
            java: `class Solution {
    public int evalRPN(String[] tokens) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `["2","1","+","3","*"]`, expectedOutput: `9` },
            { input: `["4","13","5","/","+"]`, expectedOutput: `6` }
        ,
        ],
        order: 103
    },
    {
        id: "generate-parentheses",
        title: "Generate Parentheses",
        difficulty: "Medium",
        category: "Stacks & Queues",
        logicTags: ["stack", "backtracking"],
        description: `Given \`n\` pairs of parentheses, write a function to *generate all combinations of well-formed parentheses*.

### Example 1:
\`\`\`text
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    
};`,
            python: `class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        pass`,
            java: `class Solution {
    public List<String> generateParenthesis(int n) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `3`, expectedOutput: `["((()))","(()())","(())()","()(())","()()()"]` },
            { input: `1`, expectedOutput: `["()"]` }
        ,
        ],
        order: 104
    },
    {
        id: "daily-temperatures",
        title: "Daily Temperatures",
        difficulty: "Medium",
        category: "Stacks & Queues",
        logicTags: ["stack", "array", "monotonic-stack"],
        description: `Given an array of integers \`temperatures\` represents the daily temperatures, return *an array* \`answer\` *such that* \`answer[i]\` *is the number of days you have to wait after the* \`ith\` *day to get a warmer temperature*. If there is no future day for which this is possible, keep \`answer[i] == 0\` instead.

### Example 1:
\`\`\`text
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures) {
    
};`,
            python: `class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        pass`,
            java: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        return new int[]{};
    }
}`
        },
        testCases: [
            { input: `[73,74,75,71,69,72,76,73]`, expectedOutput: `[1,1,4,2,1,1,0,0]` },
            { input: `[30,40,50,60]`, expectedOutput: `[1,1,1,0]` }
        ,
        ],
        order: 105
    },
    {
        id: "car-fleet",
        title: "Car Fleet",
        difficulty: "Medium",
        category: "Stacks & Queues",
        logicTags: ["stack", "array", "sorting"],
        description: `There are \`n\` cars going to the same destination along a one-lane road. The destination is at position \`target\`.

You are given two integer arrays \`position\` and \`speed\`, both of length \`n\`, where \`position[i]\` is the position of the \`ith\` car and \`speed[i]\` is the speed of the \`ith\` car (in miles per hour).

A **car fleet** is some non-empty set of cars driving at the same position and same speed. Note that a single car is also a car fleet.

Return *the number of car fleets that will arrive at the destination*.

### Example 1:
\`\`\`text
Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
Output: 3
Explanation:
The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at 12.
The car starting at 0 does not catch up to any other car, so it is a fleet by itself.
The cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
var carFleet = function(target, position, speed) {
    
};`,
            python: `class Solution:
    def carFleet(self, target: int, position: List[int], speed: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int carFleet(int target, int[] position, int[] speed) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `12, [10,8,0,5,3], [2,4,1,1,3]`, expectedOutput: `3` },
            { input: `100, [0,2,4], [4,2,1]`, expectedOutput: `1` }
        ,
        ],
        order: 106
    },
    {
        id: "largest-rectangle-in-histogram",
        title: "Largest Rectangle in Histogram",
        difficulty: "Hard",
        category: "Stacks & Queues",
        logicTags: ["stack", "array", "monotonic-stack"],
        description: `Given an array of integers \`heights\` representing the histogram's bar height where the width of each bar is \`1\`, return *the area of the largest rectangle in the histogram*.

### Example 1:
\`\`\`text
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The largest rectangle has an area = 10 units.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
    
};`,
            python: `class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        pass`,
            java: `class Solution {
    public int largestRectangleArea(int[] heights) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `[2,1,5,6,2,3]`, expectedOutput: `10` },
            { input: `[2,4]`, expectedOutput: `4` }
        ,
        ],
        order: 107
    },
    {
        id: "implement-queue-using-stacks",
        title: "Implement Queue using Stacks",
        difficulty: "Easy",
        category: "Stacks & Queues",
        logicTags: ["stack", "design", "queue"],
        description: `Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (\`push\`, \`peek\`, \`pop\`, and \`empty\`).

Implement the \`MyQueue\` class:

*   \`void push(int x)\` Pushes element x to the back of the queue.
*   \`int pop()\` Removes the element from the front of the queue and returns it.
*   \`int peek()\` Returns the element at the front of the queue.
*   \`boolean empty()\` Returns \`true\` if the queue is empty, \`false\` otherwise.

### Example 1:
\`\`\`text
Input
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 1, 1, false]
\`\`\`
`,
        defaultCode: {
            javascript: `
var MyQueue = function() {
    
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    
};`,
            python: `class MyQueue:

    def __init__(self):
        pass

    def push(self, x: int) -> None:
        pass

    def pop(self) -> int:
        pass

    def peek(self) -> int:
        pass

    def empty(self) -> bool:
        pass`,
            java: `class MyQueue {

    public MyQueue() {
        
    }
    
    public void push(int x) {
        
    }
    
    public int pop() {
        return 0;
    }
    
    public int peek() {
        return 0;
    }
    
    public boolean empty() {
        return false;
    }
}`
        },
        testCases: [
            { input: `["MyQueue", "push", "push", "peek", "pop", "empty"], [[], [1], [2], [], [], []]`, expectedOutput: `[null, null, null, 1, 1, false]` }
        ],
        order: 108
    },
    {
        id: "online-stock-span",
        title: "Online Stock Span",
        difficulty: "Medium",
        category: "Stacks & Queues",
        logicTags: ["stack", "design", "data-stream"],
        description: `Design an algorithm that collects daily price quotes for some stock and returns the **span** of that stock's price for the current day.

The **span** of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.

Implement the \`StockSpanner\` class:

*   \`StockSpanner()\` Initializes the object of the class.
*   \`int next(int price)\` Returns the **span** of the stock's price given that today's price is \`price\`.

### Example 1:
\`\`\`text
Input
["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
[[], [100], [80], [60], [70], [60], [75], [85]]
Output
[null, 1, 1, 1, 2, 1, 4, 6]
\`\`\`
`,
        defaultCode: {
            javascript: `
var StockSpanner = function() {
    
};

/** 
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function(price) {
    
};`,
            python: `class StockSpanner:

    def __init__(self):
        pass

    def next(self, price: int) -> int:
        pass`,
            java: `class StockSpanner {

    public StockSpanner() {
        
    }
    
    public int next(int price) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `["StockSpanner", "next", "next", "next", "next", "next", "next", "next"], [[], [100], [80], [60], [70], [60], [75], [85]]`, expectedOutput: `[null, 1, 1, 1, 2, 1, 4, 6]` }
        ],
        order: 109
    },
    {
        id: "asteroid-collision",
        title: "Asteroid Collision",
        difficulty: "Medium",
        category: "Stacks & Queues",
        logicTags: ["stack", "array"],
        description: `We are given an array \`asteroids\` of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

### Example 1:
\`\`\`text
Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function(asteroids) {
    
};`,
            python: `class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:
        pass`,
            java: `class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        return new int[]{};
    }
}`
        },
        testCases: [
            { input: `[5,10,-5]`, expectedOutput: `[5,10]` },
            { input: `[8,-8]`, expectedOutput: `[]` },
            { input: `[10,2,-5]`, expectedOutput: `[10]` }
        ,
        ],
        order: 110
    }
];
