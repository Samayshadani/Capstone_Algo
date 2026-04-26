# AlgoSensei API Documentation

Complete reference for all API endpoints in the AlgoSensei platform.

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [API Endpoints](#api-endpoints)
   - [VIPER AI Assistant](#1-viper-ai-assistant)
   - [Code Watch](#2-code-watch)
   - [Code Execution](#3-code-execution)
   - [Code Translation](#4-code-translation)
   - [JARVIS Interview](#5-jarvis-interview)
   - [Navigator (Problem Selection)](#6-navigator-problem-selection)
   - [Navigator Recommendations](#7-navigator-recommendations)
4. [Error Handling](#error-handling)
5. [Rate Limits](#rate-limits)

---

## Overview

All API endpoints are Next.js API routes located under `/api/*`. They follow RESTful conventions and return JSON responses.

**Base URL**: `https://your-domain.com/api`  
**Content-Type**: `application/json`  
**Authentication**: Firebase Auth tokens (where applicable)

---

## Authentication

Currently, most endpoints are **open** for development. In production, implement Firebase Auth token verification:

```typescript
import { getAuth } from 'firebase-admin/auth';

const token = req.headers.authorization?.split('Bearer ')[1];
const decodedToken = await getAuth().verifyIdToken(token);
const uid = decodedToken.uid;
```

---

## API Endpoints

### 1. VIPER AI Assistant

**Endpoint**: `POST /api/ai`

**Description**: Conversational AI assistant for coding help, powered by Groq Llama 3.3.

#### Request Body

```typescript
{
  "message": string;           // User's question
  "history": Array<{           // Conversation history (optional)
    role: "user" | "model";
    parts?: [{ text: string }];
    content?: string;
  }>;
  "context": {                 // Problem context (optional)
    questionTitle?: string;
    code?: string;
    language?: string;
    executionResult?: {        // For automated analysis
      stdout: string;
      stderr: string;
    };
  };
}
```

#### Response

```typescript
{
  "text": string;  // AI response (markdown supported)
}
```

#### Example

```bash
curl -X POST https://your-domain.com/api/ai \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How do I optimize this solution?",
    "context": {
      "questionTitle": "Two Sum",
      "code": "function twoSum(nums, target) { ... }",
      "language": "javascript"
    }
  }'
```

#### Response Example

```json
{
  "text": "**Observation**\nYour solution uses nested loops (O(n²)).\n\n**Guidance**\nUse a HashMap to achieve O(n):\n```javascript\nconst map = new Map();\nfor (let i = 0; i < nums.length; i++) {\n  const complement = target - nums[i];\n  if (map.has(complement)) return [map.get(complement), i];\n  map.set(nums[i], i);\n}\n```"
}
```

#### Features
- **Mermaid Diagrams**: AI generates diagrams for tree/graph explanations
- **Length Limit**: 3-15 lines for conciseness
- **Context-Aware**: Analyzes code and execution results

---

### 2. Code Watch

**Endpoint**: `POST /api/ai/watch`

**Description**: Real-time code analysis for critical anti-patterns.

#### Request Body

```typescript
{
  "code": string;
  "language": string;
  "questionTitle": string;
}
```

#### Response

```typescript
{
  "warning": string | null;  // Short warning message or null
}
```

#### Example

```bash
curl -X POST https://your-domain.com/api/ai/watch \
  -H "Content-Type: application/json" \
  -d '{
    "code": "for (let i = 0; i < n; i++) {\n  for (let j = 0; j < n; j++) {\n    for (let k = 0; k < n; k++) { ... }\n  }\n}",
    "language": "javascript",
    "questionTitle": "Find Duplicates"
  }'
```

#### Response Example

```json
{
  "warning": "Triple nested loops detected - this is O(n³). Consider using a HashSet."
}
```

#### Triggers
- O(n³) time complexity
- Infinite loop patterns
- `eval()` usage
- Hard-coded test cases

---

### 3. Code Execution

**Endpoint**: `POST /api/run`

**Description**: Execute code via Piston API in multiple languages.

#### Request Body

```typescript
{
  "language": "javascript" | "python" | "java";
  "code": string;
  "input": string;  // stdin (optional)
}
```

#### Response

```typescript
{
  "run": {
    "stdout": string;
    "stderr": string;
    "code": number;        // Exit code
    "signal": string | null;
    "output": string;      // Combined stdout + stderr
  };
  "language": string;
  "version": string;
}
```

#### Example

```bash
curl -X POST https://your-domain.com/api/run \
  -H "Content-Type: application/json" \
  -d '{
    "language": "python",
    "code": "print(\"Hello, World!\")",
    "input": ""
  }'
```

#### Response Example

```json
{
  "run": {
    "stdout": "Hello, World!\n",
    "stderr": "",
    "code": 0,
    "signal": null,
    "output": "Hello, World!\n"
  },
  "language": "python",
  "version": "3.10.0"
}
```

#### Supported Languages
- **JavaScript**: v18.15.0
- **Python**: v3.10.0
- **Java**: v15.0.2

---

### 4. Code Translation

**Endpoint**: `POST /api/translate`

**Description**: Translate code between programming languages using AI.

#### Request Body

```typescript
{
  "sourceCode": string;
  "sourceLang": string;       // Optional (auto-detected)
  "targetLang": string;       // Required (e.g., "python", "java")
  "includeComments": boolean; // Add syntax explanations
}
```

#### Response

```typescript
{
  "translatedCode": string;
}
```

#### Example

```bash
curl -X POST https://your-domain.com/api/translate \
  -H "Content-Type: application/json" \
  -d '{
    "sourceCode": "def two_sum(nums, target):\n  return [0, 1]",
    "sourceLang": "python",
    "targetLang": "javascript",
    "includeComments": true
  }'
```

#### Response Example

```json
{
  "translatedCode": "// In JavaScript, use 'function' keyword\nfunction twoSum(nums, target) {\n  return [0, 1];\n}"
}
```

---

### 5. JARVIS Interview

**Endpoint**: `POST /api/interview`

**Description**: AI-powered mock technical interview with multi-stage evaluation.

#### Request Body

```typescript
{
  "messages": Array<{
    role: "user" | "assistant";
    content: string;
  }>;
  "context": {
    questionTitle: string;
    questionDescription: string;
    interviewState: {         // Track interview progress
      stage: "GATEKEEPING" | "LOGIC" | "EDGE_CASES" | "REBUTTAL" | "VERDICT";
      strikes: number;
      conceptsCovered: number;
    };
    codeSnapshot?: string;    // Current code (for Hawkeye)
    viper?: {                 // Webcam data (for VIPER)
      score: number;
      issues: string[];
    };
  };
}
```

#### Response

```typescript
{
  "reply": string;       // AI interviewer's response
  "action": {            // State updates (optional)
    stage?: string;
    strikes?: number;
    conceptsCovered?: number;
  } | null;
}
```

#### Example

```bash
curl -X POST https://your-domain.com/api/interview \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      { "role": "user", "content": "I would use a HashMap" }
    ],
    "context": {
      "questionTitle": "Two Sum",
      "questionDescription": "Find two numbers that add up to target",
      "interviewState": { "stage": "GATEKEEPING", "strikes": 0, "conceptsCovered": 0 }
    }
  }'
```

#### Interview Stages
1. **GATEKEEPING**: Definition-based rapid-fire questions
2. **LOGIC**: Explain algorithms verbally
3. **EDGE_CASES**: Challenge with edge cases
4. **REBUTTAL**: Defend weaknesses
5. **VERDICT**: Final JSON feedback

#### Verdict Response Example

```json
{
  "reply": "{\"communication_score\": 8, \"technical_accuracy\": 7, \"red_flags\": [\"Struggled with complexity analysis\"], \"verdict\": \"HIRE\", \"summary\": \"Strong problem-solving skills with minor gaps in theory.\"}",
  "action": null
}
```

---

### 6. Navigator (Problem Selection)

**Endpoint**: `POST /api/navigator`

**Description**: AI-driven problem recommendation based on user progress.

#### Request Body

```typescript
{
  "uid": string;  // Firebase user ID
}
```

#### Response

```typescript
{
  "questionId": string;
  "reason": string;           // Why this was selected
  "isNewConcept": boolean;
  "conceptBrief": string | null;
}
```

#### Example

```bash
curl -X POST https://your-domain.com/api/navigator \
  -H "Content-Type: application/json" \
  -d '{
    "uid": "user123"
  }'
```

#### Response Example

```json
{
  "questionId": "two-sum-ii",
  "reason": "You mastered Two Sum. This builds on that with sorted arrays.",
  "isNewConcept": false,
  "conceptBrief": null
}
```

#### Features
- **Skill Trees**: Unlocks problems based on prerequisites
- **Direct Bridges**: Follows `nextQuestionId` chains
- **Cached Recommendations**: Stored in Firestore for banners

---

### 7. Navigator Recommendations

**Endpoint**: `POST /api/navigator/recommend`

**Description**: Adaptive curriculum engine that adjusts to performance.

#### Request Body

```typescript
{
  "userId": string;
  "currentQuestionId": string;  // Just completed
  "result": "success" | "failed" | "struggled" | "neutral";
  "timeTaken": number;          // Seconds
}
```

#### Response

```typescript
{
  "questionId": string;
  "actionType": "speedrun" | "remedial" | "lateral" | "next_step";
  "reasoning": string;
}
```

#### Example

```bash
curl -X POST https://your-domain.com/api/navigator/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "currentQuestionId": "two-sum",
    "result": "success",
    "timeTaken": 180
  }'
```

#### Response Example

```json
{
  "questionId": "valid-anagram",
  "actionType": "speedrun",
  "reasoning": "You solved Two Sum quickly. Let's advance to hashing patterns."
}
```

#### Decision Types
- **Speedrun**: Fast success → harder problem in same branch
- **Remedial**: Struggle → easier problem to rebuild confidence
- **Lateral**: Bored → switch to different topic
- **Next Step**: Natural progression

---

## Error Handling

All endpoints return errors in this format:

```typescript
{
  "error": string;
}
```

### Common Error Codes

| Status Code | Meaning |
|-------------|---------|
| `400` | Bad Request (missing parameters) |
| `404` | Not Found (user profile missing) |
| `500` | Internal Server Error (API failure) |

#### Example Error Response

```json
{
  "error": "User profile not found"
}
```

---

## Rate Limits

### Groq API
- **Llama 3.3 70B**: ~30 requests/minute (shared tier)
- **Mitigation**: Client-side debouncing for Code Watch

### Piston API
- **Free Tier**: ~5 requests/second
- **Mitigation**: User-triggered only (not automated)

### Firebase Firestore
- **Reads**: 50,000/day (free tier)
- **Writes**: 20,000/day (free tier)

---

## Best Practices

1. **Debounce Code Watch**: Throttle to max 1 request every 3 seconds
2. **Cache Responses**: Store AI recommendations in Firestore
3. **Error Handling**: Always handle `error` field in responses
4. **Token Verification**: Implement Firebase Auth in production
5. **CORS**: Enable CORS headers for cross-origin requests

---

## Example: Full Interview Flow

```typescript
// 1. Start interview
const res1 = await fetch('/api/interview', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [],
    context: {
      questionTitle: "Two Sum",
      questionDescription: "...",
      interviewState: { stage: "GATEKEEPING", strikes: 0, conceptsCovered: 0 }
    }
  })
});
const { reply: opening } = await res1.json();

// 2. User responds
const res2 = await fetch('/api/interview', {
  method: 'POST',
  body: JSON.stringify({
    messages: [
      { role: "assistant", content: opening },
      { role: "user", content: "I'd use a HashMap" }
    ],
    context: { /* same */ }
  })
});
const { reply, action } = await res2.json();

// 3. Update state
if (action) {
  context.interviewState = { ...context.interviewState, ...action };
}
```

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-31 | Initial API documentation |

---

**Document Version**: 1.0  
**Last Updated**: January 31, 2026  
**Author**: VENOMRK22 / 4BITS
