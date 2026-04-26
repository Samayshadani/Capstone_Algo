export const formatCodeForExecution = (
    language: string,
    userCode: string,
    testInput: any
): string => {
    // Stringify input for passing into function call
    // Note: Inputs in our DB are stored as actual values (arrays, strings, etc.)
    // We need to convert them to string representation for the code string.

    let inputStr = "";
    // If testInput is a string, assume it is ALREADY a valid code fragment (e.g. "[1,2,3]" or '"abc"').
    // Do NOT add extra quotes.
    if (typeof testInput === 'string') {
        inputStr = testInput;
    } else if (Array.isArray(testInput)) {
        // If it's an actual array object, stringify it
        inputStr = JSON.stringify(testInput);
    } else {
        inputStr = String(testInput);
    }

    // For multi-argument functions, testInput might need to be an array of args?
    // Current assumption: simple single-arg or pre-formatted input.
    // Enhanced approach: If question requires multiple args, testInput should be an array of args.
    // But for MVP, let's assume specific behavior based on question structure usage.
    // For now, let's assume input matches the function signature.

    // Safety check for common issues
    const normalizedCode = userCode.trim();

    if (language === "javascript") {
        return `
${normalizedCode}

// Test Runner
try {
    const result = solution(${inputStr});
    console.log(JSON.stringify(result));
} catch (error) {
    console.error(error.message);
}
        `.trim();
    }

    if (language === "python") {
        // Python needs input formatted correctly (e.g. True/False instead of true/false)
        let pyInput = inputStr
            .replace(/true/g, "True")
            .replace(/false/g, "False")
            .replace(/null/g, "None");

        return `
import json
import sys
import inspect
from typing import * 

${normalizedCode}

# Test Runner
try:
    sol = Solution()
    # Debug Helper
    # print("DEBUG: Analying Solution class...", file=sys.stderr)
    
    # 1. Try to find methods using inspect (most robust)
    methods = [m[0] for m in inspect.getmembers(sol, predicate=inspect.ismethod) if not m[0].startswith('_')]
    
    # 2. Fallback: Check dir() for callables if inspect fails (e.g. static methods or weird binding)
    if not methods:
        methods = [m for m in dir(sol) if not m.startswith('_') and callable(getattr(sol, m))]

    if not methods:
        raise Exception(f"No callable method found in Solution. Attributes: {dir(sol)}")
        
    method_name = methods[0]
    
    method = getattr(sol, method_name)
    result = method(${pyInput})
    
    # Handle list/dict output for consistent parsing
    if isinstance(result, (list, dict, str, int, float, bool)):
        print(json.dumps(result))
    else:
        print(result)
except Exception as e:
    print(e, file=sys.stderr)
        `.trim();
    }

    // Java support
    if (language === "java") {
        // Case 1: User provided a standalone class with public static void main
        if (normalizedCode.includes("public static void main")) {
            // Extract the original class name
            const classNameMatch = normalizedCode.match(/public\s+class\s+(\w+)/);
            const originalClassName = classNameMatch ? classNameMatch[1] : "Main";

            // Rename the class definition to "Main"
            let runnableCode = normalizedCode.replace(/public\s+class\s+\w+/g, "public class Main");

            // CRITICAL FIX: If the user instantiates their own class (e.g. "PlusOne solver = new PlusOne()"),
            // we must ALSO rename those references to "Main" because we just renamed the class definition.
            if (originalClassName !== "Main") {
                const regex = new RegExp(`\\b${originalClassName}\\b`, 'g');
                runnableCode = runnableCode.replace(regex, "Main");
            }

            return `
import java.util.*;
import java.io.*;
${runnableCode}
            `.trim();
        }

        // Case 2: Standard LeetCode style (Solution class) -> Wrap it

        let safeCode = normalizedCode.replace(/public\s+class\s+\w+/g, "class Solution");

        // Hoist Imports
        const imports = [];
        const lines = safeCode.split('\n');
        const cleanLines = [];
        for (const line of lines) {
            if (line.trim().startsWith('import ')) {
                imports.push(line.trim());
            } else {
                cleanLines.push(line);
            }
        }
        safeCode = cleanLines.join('\n');
        const importBlock = Array.from(new Set([...imports, "import java.util.*;", "import java.io.*;", "import java.lang.reflect.*;"])).join('\n');

        // Helper method for array printing in Java to match JSON format [1,2,3]
        // Helper method for array printing in Java to match JSON format [1,2,3]
        const printerHelper = `
    private static void printResult(Object result) {
        System.out.println(toJSON(result));
    }

    private static String toJSON(Object obj) {
        if (obj == null) return "null";
        
        if (obj instanceof String) {
            return "\\"" + obj.toString().replace("\\"", "\\\\\\\"") + "\\"";
        }
        
        if (obj instanceof Number || obj instanceof Boolean) {
            return obj.toString();
        }
        
        if (obj instanceof Character) {
             return "\\"" + obj + "\\"";
        }

        if (obj.getClass().isArray()) {
            StringBuilder sb = new StringBuilder("[");
            int len = Array.getLength(obj);
            for (int i = 0; i < len; i++) {
                if (i > 0) sb.append(",");
                sb.append(toJSON(Array.get(obj, i)));
            }
            sb.append("]");
            return sb.toString();
        }
        
        if (obj instanceof Iterable) {
            StringBuilder sb = new StringBuilder("[");
            Iterator<?> it = ((Iterable<?>) obj).iterator();
            while (it.hasNext()) {
                sb.append(toJSON(it.next()));
                if (it.hasNext()) sb.append(",");
            }
            sb.append("]");
            return sb.toString();
        }
        
        if (obj instanceof Map) {
            StringBuilder sb = new StringBuilder("{");
            Map map = (Map) obj;
            Iterator it = map.entrySet().iterator();
            while (it.hasNext()) {
                Map.Entry entry = (Map.Entry) it.next();
                sb.append(toJSON(String.valueOf(entry.getKey())));
                sb.append(":");
                sb.append(toJSON(entry.getValue()));
                if (it.hasNext()) sb.append(",");
            }
            sb.append("}");
            return sb.toString();
        }

        return obj.toString(); // Fallback
    }
        `;

        // Input Parser Helper (Expanded Support)
        const parserHelper = `
    private static Object parseInput(String input, Class<?> type) {
        input = input.trim();
        // Remove quotes if generic string
        if ((type != String.class) && input.startsWith("\\"") && input.endsWith("\\"")) {
             // Only strip quotes if we are NOT parsing a String, or if it's double-serialized
             // For primitives, we strip.
             input = input.substring(1, input.length() - 1);
        }
        
        if (type == int[].class) {
            input = input.replace("[", "").replace("]", "");
            if (input.isEmpty()) return new int[0];
            String[] parts = input.split(",");
            int[] arr = new int[parts.length];
            for(int i=0; i<parts.length; i++) arr[i] = Integer.parseInt(parts[i].trim());
            return arr;
        } else if (type == int.class || type == Integer.class) {
            return Integer.parseInt(input);
        } else if (type == double.class || type == Double.class) {
            return Double.parseDouble(input);
        } else if (type == long.class || type == Long.class) {
            // Remove 'L' suffix if present
            input = input.replace("L", "").replace("l", "");
            return Long.parseLong(input);
        } else if (type == boolean.class || type == Boolean.class) {
            return Boolean.parseBoolean(input);
        } else if (type == String.class) {
             // Basic quote check
             if (input.startsWith("\\"") && input.endsWith("\\"")) {
                 return input.substring(1, input.length() - 1);
             }
             return input;
        } else if (type == String[].class) {
            input = input.trim();
            if (input.startsWith("[")) input = input.substring(1);
            if (input.endsWith("]")) input = input.substring(0, input.length() - 1);
            
            if (input.trim().isEmpty()) return new String[0];
            
            // Naive CSV split (won't handle commas inside strings, but sufficient for MVP ["a", "b"])
            String[] parts = input.split(",");
            String[] res = new String[parts.length];
            for(int i=0; i<parts.length; i++) {
                String p = parts[i].trim();
                // Remove quotes if present
                if (p.startsWith("\\"") && p.endsWith("\\"")) {
                    p = p.substring(1, p.length() - 1);
                }
                res[i] = p;
            }
            return res;
        }
        // Fallback: Return raw string or null (improve in future)
        return null; 
    }
        `;

        return `
${importBlock}

public class Main {
    public static void main(String[] args) {
        try {
            Solution sol = new Solution();
            
            // Reflection: Find the first public method that returns something
            Method[] methods = Solution.class.getDeclaredMethods();
            Method targetMethod = null;
            for (Method m : methods) {
                if (Modifier.isPublic(m.getModifiers())) {
                    targetMethod = m;
                    break;
                }
            }

            if (targetMethod == null) {
                System.out.println("Error: No public method found in Solution class.");
                return;
            }

            // Parse Input
            // We assume inputStr comes formatted from the TS side (e.g. "[1,2,3]" or "[2.0, 10]")
            String rawInput = "${inputStr.replace(/"/g, '\\"')}";
            Class<?>[] paramTypes = targetMethod.getParameterTypes();
            
            Object[] invokeArgs = new Object[paramTypes.length];
            
            // LOGIC FOR MULTI ARGUMENT
            if (paramTypes.length == 0) {
                 // No args
            } else if (paramTypes.length == 1) {
                invokeArgs[0] = parseInput(rawInput, paramTypes[0]);
            } else {
                // Heuristic: If multiple args, assume input is a JSON array "[arg1, arg2]" or comma list "arg1, arg2"
                String clean = rawInput.trim();
                // If the entire input is wrapped in brackets [arg1, arg2], strip them to get the inner list
                if (clean.startsWith("[") && clean.endsWith("]")) {
                    // But wait, if arg1 IS an array [1,2], we must be careful not to strip valid array brackets if it's a single arg (handled above).
                    // For multi-args, usually the input string is just "arg1, arg2".
                    // Ifdb stores it as "[arg1, arg2]", we strip.
                    clean = clean.substring(1, clean.length() - 1);
                }

                // Robust Split respecting brackets
                List<String> parts = splitArgs(clean);
                
                for (int i = 0; i < paramTypes.length; i++) {
                    if (i < parts.size()) {
                         invokeArgs[i] = parseInput(parts.get(i), paramTypes[i]);
                    }
                }
            }

            // Invoke
            Object result = targetMethod.invoke(sol, invokeArgs);
            
            // Print Output
            printResult(result);

        } catch (InvocationTargetException e) {
             e.getTargetException().printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static List<String> splitArgs(String input) {
        List<String> list = new ArrayList<>();
        int bracketLevel = 0;
        int curlyLevel = 0;
        boolean inQuote = false;
        StringBuilder current = new StringBuilder();
        
        for (char c : input.toCharArray()) {
            if (c == '"' && (current.length() == 0 || current.charAt(current.length()-1) != '\\\\')) {
                inQuote = !inQuote;
            }
            if (!inQuote) {
                if (c == '[') bracketLevel++;
                if (c == ']') bracketLevel--;
                if (c == '{') curlyLevel++;
                if (c == '}') curlyLevel--;
            }
            
            if (c == ',' && bracketLevel == 0 && curlyLevel == 0 && !inQuote) {
                list.add(current.toString().trim());
                current.setLength(0);
            } else {
                current.append(c);
            }
        }
        list.add(current.toString().trim());
        return list;
    }

    ${printerHelper}

    ${parserHelper}
}

${safeCode}
        `.trim();
    }

    return userCode;
};
