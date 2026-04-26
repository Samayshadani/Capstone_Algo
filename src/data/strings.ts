import { Question } from "@/types/question";

export const STRING_QUESTIONS: Question[] = [
    {
        id: "valid-anagram",
        title: "Valid Anagram",
        difficulty: "Easy",
        category: "Strings",
        logicTags: ["hashing", "sorting"],
        description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

### Example 1:
\`\`\`text
Input: s = "anagram", t = "nagaram"
Output: true
\`\`\`

### Example 2:
\`\`\`text
Input: s = "rat", t = "car"
Output: false
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    
};`,
            python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        pass`,
            java: `class Solution {
    public boolean isAnagram(String s, String t) {
        return false;
    }
}`
        },
        testCases: [
            { input: `"anagram", "nagaram"`, expectedOutput: `true` },
            { input: `"rat", "car"`, expectedOutput: `false` },
            { input: `"a", "a"`, expectedOutput: `true`, isHidden: true },
            { input: `"", ""`, expectedOutput: `true`, isHidden: true },
            { input: `"ab", "ba"`, expectedOutput: `true`, isHidden: true },
            { input: `"ab", "a"`, expectedOutput: `false`, isHidden: true },
            { input: `"listen", "silent"`, expectedOutput: `true`, isHidden: true },
        ],
        order: 11,
        nextQuestionId: "group-anagrams"
    },
    {
        id: "valid-palindrome",
        title: "Valid Palindrome",
        difficulty: "Easy",
        category: "Strings",
        logicTags: ["two-pointers"],
        description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` if it is a **palindrome**, or \`false\` otherwise.

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
            { input: `"A man, a plan, a canal: Panama"`, expectedOutput: `true` },
            { input: `"race a car"`, expectedOutput: `false` },
            { input: `" "`, expectedOutput: `true`, isHidden: true },
            { input: `"a"`, expectedOutput: `true`, isHidden: true },
            { input: `""`, expectedOutput: `true`, isHidden: true },
            { input: `"ab"`, expectedOutput: `false`, isHidden: true },
            { input: `"aba"`, expectedOutput: `true`, isHidden: true },
        ],
        order: 12
    },
    {
        id: "longest-common-prefix",
        title: "Longest Common Prefix",
        difficulty: "Easy",
        category: "Strings",
        logicTags: ["string-manipulation"],
        description: `Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string \`""\`.

### Example 1:
\`\`\`text
Input: strs = ["flower","flow","flight"]
Output: "fl"
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    
};`,
            python: `class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        pass`,
            java: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        return "";
    }
}`
        },
        testCases: [
            { input: `["flower","flow","flight"]`, expectedOutput: `"fl"` },
            { input: `["dog","racecar","car"]`, expectedOutput: `""` },
            { input: `["interspecies","interstellar","interstate"]`, expectedOutput: `"inters"`, isHidden: true },
            { input: `["a"]`, expectedOutput: `"a"`, isHidden: true },
            { input: `[""]`, expectedOutput: `""`, isHidden: true },
            { input: `["","b"]`, expectedOutput: `""`, isHidden: true },
            { input: `["ab","a"]`, expectedOutput: `"a"`, isHidden: true },
        ],
        order: 13
    },
    {
        id: "longest-substring-without-repeating-characters",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        category: "Strings",
        logicTags: ["sliding-window"],
        description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.

### Example 1:
\`\`\`text
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    
};`,
            python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        pass`,
            java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `"abcabcbb"`, expectedOutput: `3` },
            { input: `"bbbbb"`, expectedOutput: `1` },
            { input: `"pwwkew"`, expectedOutput: `3` },
            { input: `""`, expectedOutput: `0`, isHidden: true },
            { input: `" "`, expectedOutput: `1`, isHidden: true },
            { input: `"au"`, expectedOutput: `2`, isHidden: true },
            { input: `"dvdf"`, expectedOutput: `3`, isHidden: true },
            { input: `"a"`, expectedOutput: `1`, isHidden: true },
        ],
        order: 14
    },
    {
        id: "longest-palindromic-substring",
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        category: "Strings",
        logicTags: ["dp", "expansion"],
        description: `Given a string \`s\`, return the longest palindromic substring in \`s\`.

### Example 1:
\`\`\`text
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    
};`,
            python: `class Solution:
    def longestPalindrome(self, s: str) -> str:
        pass`,
            java: `class Solution {
    public String longestPalindrome(String s) {
        return "";
    }
}`
        },
        testCases: [
            { input: `"babad"`, expectedOutput: `"bab"` },
            { input: `"cbbd"`, expectedOutput: `"bb"` },
            { input: `"a"`, expectedOutput: `"a"`, isHidden: true },
            { input: `"ac"`, expectedOutput: `"a"`, isHidden: true },
            { input: `"bb"`, expectedOutput: `"bb"`, isHidden: true },
            { input: `"aba"`, expectedOutput: `"aba"`, isHidden: true },
            { input: `"racecar"`, expectedOutput: `"racecar"`, isHidden: true },
        ],
        order: 15
    },
    {
        id: "string-to-integer-atoi",
        title: "String to Integer (atoi)",
        difficulty: "Medium",
        category: "Strings",
        logicTags: ["parsing"],
        description: `Implement the \`myAtoi(string s)\` function, which converts a string to a 32-bit signed integer (similar to C/C++'s \`atoi\` function).

The algorithm for \`myAtoi(string s)\` is as follows:

1.  Read in and ignore any leading whitespace.
2.  Check if the next character (if not already at the end of the string) is \`'-'\` or \`'+'\`. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
3.  Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.
4.  Convert these digits into an integer (i.e. \`"123" -> 123\`, \`"0032" -> 32\`). If no digits were read, then the integer is \`0\`. Change the sign as necessary (from step 2).
5.  If the integer is out of the 32-bit signed integer range \`[-2^31, 2^31 - 1]\`, then clamp the integer so that it remains in the range. Specifically, integers less than \`-2^31\` should be clamped to \`-2^31\`, and integers greater than \`2^31 - 1\` should be clamped to \`2^31 - 1\`.
6.  Return the integer as the final result.

### Example 1:
\`\`\`text
Input: s = "42"
Output: 42
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
    
};`,
            python: `class Solution:
    def myAtoi(self, s: str) -> int:
        pass`,
            java: `class Solution {
    public int myAtoi(String s) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `"42"`, expectedOutput: `42` },
            { input: `"   -42"`, expectedOutput: `-42` },
            { input: `"4193 with words"`, expectedOutput: `4193` },
            { input: `"words and 987"`, expectedOutput: `0`, isHidden: true },
            { input: `"-91283472332"`, expectedOutput: `-2147483648`, isHidden: true },
            { input: `"91283472332"`, expectedOutput: `2147483647`, isHidden: true },
            { input: `""`, expectedOutput: `0`, isHidden: true },
            { input: `" "`, expectedOutput: `0`, isHidden: true },
        ],
        order: 16
    },
    {
        id: "group-anagrams",
        title: "Group Anagrams",
        difficulty: "Medium",
        category: "Strings",
        logicTags: ["hashing"],
        description: `Given an array of strings \`strs\`, group **the anagrams** together. You can return the answer in **any order**.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

### Example 1:
\`\`\`text
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    
};`,
            python: `class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        pass`,
            java: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `["eat","tea","tan","ate","nat","bat"]`, expectedOutput: `[["bat"],["nat","tan"],["ate","eat","tea"]]` },
            { input: `[""]`, expectedOutput: `[[""]]` },
            { input: `["a"]`, expectedOutput: `[["a"]]` },
            { input: `["ab","ba","abc","bca","cab"]`, expectedOutput: `[["ab","ba"],["abc","bca","cab"]]`, isHidden: true },
            { input: `["a","b","c"]`, expectedOutput: `[["a"],["b"],["c"]]`, isHidden: true },
            { input: `["abc","abc"]`, expectedOutput: `[["abc","abc"]]`, isHidden: true },
            { input: `["tea","ate","eat"]`, expectedOutput: `[["tea","ate","eat"]]`, isHidden: true },
            { input: `["hi","ih","he"]`, expectedOutput: `[["hi","ih"],["he"]]`, isHidden: true },
        ],
        order: 17,
        prerequisites: ["valid-anagram"]
    },
    {
        id: "palindromic-substrings",
        title: "Palindromic Substrings",
        difficulty: "Medium",
        category: "Strings",
        logicTags: ["dp"],
        description: `Given a string \`s\`, return *the number of **palindromic substrings** in it*.

A string is a **palindrome** when it reads the same backward as forward.

A **substring** is a contiguous sequence of characters within the string.

### Example 1:
\`\`\`text
Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".
\`\`\`

### Example 2:
\`\`\`text
Input: s = "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
    
};`,
            python: `class Solution:
    def countSubstrings(self, s: str) -> int:
        pass`,
            java: `class Solution {
    public int countSubstrings(String s) {
        return 0;
    }
}`
        },
        testCases: [
            { input: `"abc"`, expectedOutput: `3` },
            { input: `"aaa"`, expectedOutput: `6` },
            { input: `"a"`, expectedOutput: `1`, isHidden: true },
            { input: `"ab"`, expectedOutput: `2`, isHidden: true },
            { input: `"aa"`, expectedOutput: `3`, isHidden: true },
            { input: `"aba"`, expectedOutput: `4`, isHidden: true },
            { input: `"abba"`, expectedOutput: `6`, isHidden: true },
        ],
        order: 18
    },
    {
        id: "encode-and-decode-strings",
        title: "Encode and Decode Strings",
        difficulty: "Medium",
        category: "Strings",
        logicTags: ["design"],
        description: `Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.

Machine 1 (sender) has the function:

\`\`\`text
string encode(vector<string> strs) {
  // ... your code
  return encoded_string;
}
\`\`\`
Machine 2 (receiver) has the function:
\`\`\`text
vector<string> decode(string s) {
  //... your code
  return strs;
}
\`\`\`

So Machine 1 does:

\`\`\`text
string encoded_string = encode(strs);
\`\`\`

and Machine 2 does:

\`\`\`text
vector<string> strs2 = decode(encoded_string);
\`\`\`

\`strs2\` in Machine 2 should be the same as \`strs\` in Machine 1.

Implement the \`encode\` and \`decode\` methods.

### Example 1:
\`\`\`text
Input: dummy_input = ["Hello","World"]
Output: ["Hello","World"]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * Encodes a list of strings to a single string.
 *
 * @param {string[]} strs
 * @return {string}
 */
var encode = function(strs) {
    
};

/**
 * Decodes a single string to a list of strings.
 *
 * @param {string} s
 * @return {string[]}
 */
var decode = function(s) {
    
};`,
            python: `class Solution:
    def encode(self, strs: List[str]) -> str:
        """Encodes a list of strings to a single string.
        """
        pass

    def decode(self, s: str) -> List[str]:
        """Decodes a single string to a list of strings.
        """
        pass`,
            java: `public class Codec {

    // Encodes a list of strings to a single string.
    public String encode(List<String> strs) {
        return "";
    }

    // Decodes a single string to a list of strings.
    public List<String> decode(String s) {
        return new ArrayList<>();
    }
}`
        },
        testCases: [
            { input: `["Hello","World"]`, expectedOutput: `["Hello","World"]` },
            { input: `[""]`, expectedOutput: `[""]` },
            { input: `["a","b","c"]`, expectedOutput: `["a","b","c"]`, isHidden: true },
            { input: `[]`, expectedOutput: `[]`, isHidden: true },
            { input: `["hello"]`, expectedOutput: `["hello"]`, isHidden: true },
            { input: `["",""]`, expectedOutput: `["",""]`, isHidden: true },
            { input: `["abc","def","ghi"]`, expectedOutput: `["abc","def","ghi"]`, isHidden: true },
        ],
        order: 19
    },
    {
        id: "minimum-window-substring",
        title: "Minimum Window Substring",
        difficulty: "Hard",
        category: "Strings",
        logicTags: ["sliding-window"],
        description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return *the minimum window **substring** of* \`s\` *such that every character in* \`t\` *(including duplicates) is included in the window*. If there is no such substring, return the empty string \`""\`.

The testcases will be generated such that the answer is unique.

### Example 1:
\`\`\`text
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    
};`,
            python: `class Solution:
    def minWindow(self, s: str, t: str) -> str:
        pass`,
            java: `class Solution {
    public String minWindow(String s, String t) {
        return "";
    }
}`
        },
        testCases: [
            { input: `"ADOBECODEBANC", "ABC"`, expectedOutput: `"BANC"` },
            { input: `"a", "a"`, expectedOutput: `"a"` },
            { input: `"a", "aa"`, expectedOutput: `""` },
            { input: `"aa", "aa"`, expectedOutput: `"aa"`, isHidden: true },
            { input: `"abc", "ac"`, expectedOutput: `"abc"`, isHidden: true },
            { input: `"ab", "a"`, expectedOutput: `"a"`, isHidden: true },
            { input: `"ab", "b"`, expectedOutput: `"b"`, isHidden: true },
            { input: `"cabwefgewcwaefgcf", "cae"`, expectedOutput: `"cwae"`, isHidden: true },
        ],
        order: 20
    }
];
