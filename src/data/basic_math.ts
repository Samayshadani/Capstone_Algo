import { Question } from "@/types/question";

export const BASIC_MATH_QUESTIONS: Question[] = [
    {
        id: "fizz-buzz",
        title: "Fizz Buzz",
        difficulty: "Easy",
        category: "Basic Math & Logic",
        logicTags: ["logic", "simulation"],
        description: `Given an integer \`n\`, return a string array \`answer\` (1-indexed) where:

*   \`answer[i] == "FizzBuzz"\` if \`i\` is divisible by \`3\` and \`5\`.
*   \`answer[i] == "Fizz"\` if \`i\` is divisible by \`3\`.
*   \`answer[i] == "Buzz"\` if \`i\` is divisible by \`5\`.
*   \`answer[i] == i\` (as a string) if none of the above conditions are true.

### Example 1:
\`\`\`text
Input: n = 3
Output: ["1","2","Fizz"]
\`\`\`

### Example 2:
\`\`\`text
Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function(n) {
    
};`,
            python: `class Solution:
    def fizzBuzz(self, n: int) -> List[str]:
        pass`,
            java: `class Solution {
    public List<String> fizzBuzz(int n) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `3`, expectedOutput: `["1","2","Fizz"]` },
            { input: `5`, expectedOutput: `["1","2","Fizz","4","Buzz"]` },
            { input: `15`, expectedOutput: `["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]`, isHidden: true },
            { input: `1`, expectedOutput: `["1"]`, isHidden: true },
            { input: `2`, expectedOutput: `["1","2"]`, isHidden: true },
            { input: `6`, expectedOutput: `["1","2","Fizz","4","Buzz","Fizz"]`, isHidden: true },
            { input: `10`, expectedOutput: `["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz"]`, isHidden: true },
        ],
        order: 31
    },
    {
        id: "palindrome-number",
        title: "Palindrome Number",
        difficulty: "Easy",
        category: "Basic Math & Logic",
        logicTags: ["math"],
        description: `Given an integer \`x\`, return \`true\` if \`x\` is a **palindrome**, and \`false\` otherwise.

**Follow up:** Could you solve it without converting the integer to a string?

### Example 1:
\`\`\`text
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
\`\`\`

### Example 2:
\`\`\`text
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    
};`,
            python: `class Solution:
    def isPalindrome(self, x: int) -> bool:
        pass`,
            java: `class Solution {
    public boolean isPalindrome(int x) {
        return false;
    }
}`
        },
        testCases: [
            { input: `121`, expectedOutput: `true` },
            { input: `-121`, expectedOutput: `false` },
            { input: `10`, expectedOutput: `false` },
            { input: `0`, expectedOutput: `true`, isHidden: true },
            { input: `1`, expectedOutput: `true`, isHidden: true },
            { input: `11`, expectedOutput: `true`, isHidden: true },
            { input: `-1`, expectedOutput: `false`, isHidden: true },
            { input: `12321`, expectedOutput: `true`, isHidden: true },
        ],
        order: 32
    },
    {
        id: "roman-to-integer",
        title: "Roman to Integer",
        difficulty: "Easy",
        category: "Basic Math & Logic",
        logicTags: ["math", "hash-map"],
        description: `Roman numerals are represented by seven different symbols: \`I\`, \`V\`, \`X\`, \`L\`, \`C\`, \`D\` and \`M\`.

| Symbol | Value |
| --- | --- |
| I | 1 |
| V | 5 |
| X | 10 |
| L | 50 |
| C | 100 |
| D | 500 |
| M | 1000 |

For example, \`2\` is written as \`II\` in Roman numeral, just two ones added together. \`12\` is written as \`XII\`, which is simply \`X + II\`. The number \`27\` is written as \`XXVII\`, which is \`XX + V + II\`.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not \`IIII\`. Instead, the number four is written as \`IV\`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as \`IX\`. There are six instances where subtraction is used:

*   \`I\` can be placed before \`V\` (5) and \`X\` (10) to make 4 and 9. 
*   \`X\` can be placed before \`L\` (50) and \`C\` (100) to make 40 and 90. 
*   \`C\` can be placed before \`D\` (500) and \`M\` (1000) to make 400 and 900.

Given a roman numeral, convert it to an integer.

### Example 1:
\`\`\`text
Input: s = "III"
Output: 3
Explanation: III = 3.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    
};`,
            python: `class Solution:
    def romanToInt(self, s: str) -> int:
        pass`,
            java: `class Solution {
    public int romanToInt(String s) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `"III"`, expectedOutput: `3` },
            { input: `"LVIII"`, expectedOutput: `58` },
            { input: `"MCMXCIV"`, expectedOutput: `1994` },
            { input: `"IV"`, expectedOutput: `4`, isHidden: true },
            { input: `"IX"`, expectedOutput: `9`, isHidden: true },
            { input: `"XL"`, expectedOutput: `40`, isHidden: true },
            { input: `"XC"`, expectedOutput: `90`, isHidden: true },
            { input: `"CD"`, expectedOutput: `400`, isHidden: true },
        ],
        order: 33
    },
    {
        id: "count-primes",
        title: "Count Primes",
        difficulty: "Medium",
        category: "Basic Math & Logic",
        logicTags: ["sieve-of-eratosthenes", "math"],
        description: `Given an integer \`n\`, return *the number of prime numbers that are strictly less than* \`n\`.

### Example 1:
\`\`\`text
Input: n = 10
Output: 4
Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function(n) {
    
};`,
            python: `class Solution:
    def countPrimes(self, n: int) -> int:
        pass`,
            java: `class Solution {
    public int countPrimes(int n) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `10`, expectedOutput: `4` },
            { input: `0`, expectedOutput: `0` },
            { input: `1`, expectedOutput: `0` },
            { input: `2`, expectedOutput: `0`, isHidden: true },
            { input: `3`, expectedOutput: `1`, isHidden: true },
            { input: `5`, expectedOutput: `2`, isHidden: true },
            { input: `20`, expectedOutput: `8`, isHidden: true },
            { input: `30`, expectedOutput: `10`, isHidden: true },
        ],
        order: 34
    },
    {
        id: "power-of-three",
        title: "Power of Three",
        difficulty: "Easy",
        category: "Basic Math & Logic",
        logicTags: ["math", "recursion"],
        description: `Given an integer \`n\`, return \`true\` *if it is a power of three. Otherwise, return* \`false\`.

An integer \`n\` is a power of three, if there exists an integer \`x\` such that \`n == 3^x\`.

### Example 1:
\`\`\`text
Input: n = 27
Output: true
Explanation: 27 = 3^3
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function(n) {
    
};`,
            python: `class Solution:
    def isPowerOfThree(self, n: int) -> bool:
        pass`,
            java: `class Solution {
    public boolean isPowerOfThree(int n) {
        return false;
    }
}`
        },
        testCases: [
            { input: `27`, expectedOutput: `true` },
            { input: `0`, expectedOutput: `false` },
            { input: `-1`, expectedOutput: `false` },
            { input: `1`, expectedOutput: `true`, isHidden: true },
            { input: `3`, expectedOutput: `true`, isHidden: true },
            { input: `9`, expectedOutput: `true`, isHidden: true },
            { input: `81`, expectedOutput: `true`, isHidden: true },
            { input: `243`, expectedOutput: `true`, isHidden: true },
        ],
        order: 35
    },
    {
        id: "sqrtx",
        title: "Sqrt(x)",
        difficulty: "Easy",
        category: "Basic Math & Logic",
        logicTags: ["binary-search", "math"],
        description: `Given a non-negative integer \`x\`, return *the square root of* \`x\` *rounded down to the nearest integer*. The returned integer should be **non-negative** as well.

You **must not use** any built-in exponent function or operator.
*   For example, do not use \`pow(x, 0.5)\` or \`x ** 0.5\`.

### Example 1:
\`\`\`text
Input: x = 4
Output: 2
Explanation: The square root of 4 is 2, so we return 2.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    
};`,
            python: `class Solution:
    def mySqrt(self, x: int) -> int:
        pass`,
            java: `class Solution {
    public int mySqrt(int x) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `4`, expectedOutput: `2` },
            { input: `8`, expectedOutput: `2` },
            { input: `0`, expectedOutput: `0`, isHidden: true },
            { input: `1`, expectedOutput: `1`, isHidden: true },
            { input: `9`, expectedOutput: `3`, isHidden: true },
            { input: `16`, expectedOutput: `4`, isHidden: true },
            { input: `25`, expectedOutput: `5`, isHidden: true },
        ],
        order: 36
    },
    {
        id: "plus-one",
        title: "Plus One",
        difficulty: "Easy",
        category: "Basic Math & Logic",
        logicTags: ["array", "math"],
        description: `You are given a **large integer** represented as an integer array \`digits\`, where each \`digits[i]\` is the \`ith\` digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading \`0\`'s.

Increment the large integer by one and return *the resulting array of digits*.

### Example 1:
\`\`\`text
Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Incrementing by one gives 123 + 1 = 124.
Thus, the result should be [1,2,4].
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    
};`,
            python: `class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        pass`,
            java: `class Solution {
    public int[] plusOne(int[] digits) {
        return new int[]{};
    }
}`
        },
        testCases: [
            { input: `[1,2,3]`, expectedOutput: `[1,2,4]` },
            { input: `[4,3,2,1]`, expectedOutput: `[4,3,2,2]` },
            { input: `[9]`, expectedOutput: `[1,0]` },
            { input: `[0]`, expectedOutput: `[1]`, isHidden: true },
            { input: `[9,9]`, expectedOutput: `[1,0,0]`, isHidden: true },
            { input: `[9,9,9]`, expectedOutput: `[1,0,0,0]`, isHidden: true },
            { input: `[1,0,0]`, expectedOutput: `[1,0,1]`, isHidden: true },
            { input: `[8,9,9,9]`, expectedOutput: `[9,0,0,0]`, isHidden: true },
        ],
        order: 37
    },
    {
        id: "excel-sheet-column-number",
        title: "Excel Sheet Column Number",
        difficulty: "Easy",
        category: "Basic Math & Logic",
        logicTags: ["math", "string"],
        description: `Given a string \`columnTitle\` that represents the column title as appears in an Excel sheet, return *its corresponding column number*.

For example:
\`\`\`text
A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28 
...
\`\`\`

### Example 1:
\`\`\`text
Input: columnTitle = "A"
Output: 1
\`\`\`

### Example 2:
\`\`\`text
Input: columnTitle = "AB"
Output: 28
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function(columnTitle) {
    
};`,
            python: `class Solution:
    def titleToNumber(self, columnTitle: str) -> int:
        pass`,
            java: `class Solution {
    public int titleToNumber(String columnTitle) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `"A"`, expectedOutput: `1` },
            { input: `"AB"`, expectedOutput: `28` },
            { input: `"ZY"`, expectedOutput: `701` },
            { input: `"B"`, expectedOutput: `2`, isHidden: true },
            { input: `"Z"`, expectedOutput: `26`, isHidden: true },
            { input: `"AA"`, expectedOutput: `27`, isHidden: true },
            { input: `"AZ"`, expectedOutput: `52`, isHidden: true },
            { input: `"BA"`, expectedOutput: `53`, isHidden: true },
        ],
        order: 38
    },
    {
        id: "powx-n",
        title: "Pow(x, n)",
        difficulty: "Medium",
        category: "Basic Math & Logic",
        logicTags: ["math", "recursion"],
        description: `Implement [pow(x, n)](http://www.cplusplus.com/reference/valarray/pow/), which calculates \`x\` raised to the power \`n\` (i.e., \`x^n\`).

### Example 1:
\`\`\`text
Input: x = 2.00000, n = 10
Output: 1024.00000
\`\`\`

### Example 2:
\`\`\`text
Input: x = 2.10000, n = 3
Output: 9.26100
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    
};`,
            python: `class Solution:
    def myPow(self, x: float, n: int) -> float:
        pass`,
            java: `class Solution {
    public double myPow(double x, int n) {
        return 0.0;
    }
}`
        },
        testCases: [
            { input: `2.00000, 10`, expectedOutput: `1024.00000` },
            { input: `2.10000, 3`, expectedOutput: `9.26100` },
            { input: `2.00000, -2`, expectedOutput: `0.25000` },
            { input: `1.00000, 0`, expectedOutput: `1.00000`, isHidden: true },
            { input: `1.00000, 2147483647`, expectedOutput: `1.00000`, isHidden: true },
            { input: `0.00001, 2147483647`, expectedOutput: `0.00000`, isHidden: true },
            { input: `2.00000, 0`, expectedOutput: `1.00000`, isHidden: true },
            { input: `2.00000, 3`, expectedOutput: `8.00000`, isHidden: true },
        ],
        order: 39
    },
    {
        id: "factorial-trailing-zeroes",
        title: "Factorial Trailing Zeroes",
        difficulty: "Medium",
        category: "Basic Math & Logic",
        logicTags: ["math"],
        description: `Given an integer \`n\`, return *the number of trailing zeroes in* \`n!\`.

Note that \`n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1\`.

### Example 1:
\`\`\`text
Input: n = 3
Output: 0
Explanation: 3! = 6, no trailing zero.
\`\`\`

### Example 2:
\`\`\`text
Input: n = 5
Output: 1
Explanation: 5! = 120, one trailing zero.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function(n) {
    
};`,
            python: `class Solution:
    def trailingZeroes(self, n: int) -> int:
        pass`,
            java: `class Solution {
    public int trailingZeroes(int n) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `3`, expectedOutput: `0` },
            { input: `5`, expectedOutput: `1` },
            { input: `0`, expectedOutput: `0` },
            { input: `10`, expectedOutput: `2`, isHidden: true },
            { input: `25`, expectedOutput: `6`, isHidden: true },
            { input: `30`, expectedOutput: `7`, isHidden: true },
            { input: `50`, expectedOutput: `12`, isHidden: true },
            { input: `100`, expectedOutput: `24`, isHidden: true },
        ],
        order: 40
    }
];
