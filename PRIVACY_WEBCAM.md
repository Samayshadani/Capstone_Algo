# AlgoSensei Privacy Policy - Webcam Usage

**Effective Date**: January 31, 2026  
**Last Updated**: January 31, 2026

---

## Overview

AlgoSensei uses your device's webcam **exclusively for real-time emotion and focus detection** to enhance your learning experience. This document explains how we collect, process, and protect your webcam data.

---

## What We Collect

### Webcam Access

AlgoSensei requests access to your webcam for the following features:

1. **VIPER (Visual Intelligence & Performance Emotion Recognition)**
   - Real-time confidence scoring (0-100%)
   - Emotion detection (Confident, Neutral, Stressed, Distracted, Misbehaving)
   - Focus monitoring (distraction alerts)
   - Presence verification (absent/multiple face detection)

2. **Interview Mode - VIPER Vision**
   - Body language analysis during mock interviews
   - Attention tracking
   - Professional conduct monitoring

---

## How We Use Your Webcam Data

### Client-Side Processing Only

> **Critical Privacy Guarantee**: All webcam processing happens **entirely on your device**. No video frames, images, or streams are ever transmitted to our servers.

#### Technical Implementation

- **ML Model**: MediaPipe Tasks Vision (Google)
- **Processing Location**: Your browser (client-side JavaScript)
- **Model Loading**: Loaded from Google CDN (public, open-source)
- **Data Transmission**: **ZERO** video data sent to servers

#### What Happens to Your Video

```
┌─────────────────────────────────────────────────┐
│         YOUR DEVICE (Browser)                   │
├─────────────────────────────────────────────────┤
│                                                 │
│  Webcam → MediaPipe Face Landmarker (GPU)     │
│           ↓                                     │
│       Extract Landmarks (478 points)           │
│           ↓                                     │
│       Analyze Blendshapes (52 expressions)     │
│           ↓                                     │
│       Calculate Confidence Score               │
│           ↓                                     │
│       Display on UI (your screen only)         │
│                                                 │
│  ❌ NO VIDEO DATA LEAVES YOUR DEVICE           │
└─────────────────────────────────────────────────┘
```

---

## What We Do NOT Collect

We **do not**:

- ❌ Record or store video footage
- ❌ Capture screenshots or images
- ❌ Upload video streams to servers
- ❌ Share video data with third parties
- ❌ Use facial recognition for identification
- ❌ Create a biometric database
- ❌ Track you outside the AlgoSensei platform

---

## Data Stored in Database

### Anonymous Analytics (Optional)

If you enable analytics, we may store **numerical scores only**:

```json
{
  "userId": "user123",
  "sessionId": "session456",
  "timestamp": 1738329871000,
  "averageConfidence": 85,
  "distractedEvents": 2,
  "totalDuration": 1800
}
```

**Note**: These are **aggregate statistics**, not video data. No facial features, images, or identifiable biometric data are stored.

---

## Permissions & Control

### Webcam Permission

- **Browser Prompt**: Your browser will request explicit permission before accessing the webcam
- **Revocable**: You can revoke access anytime via browser settings
- **Optional**: You can use AlgoSensei without webcam features (VIPER disabled)

### How to Disable Webcam Features

#### Option 1: Browser Settings (Recommended)

**Chrome/Edge**:
1. Go to `Settings` → `Privacy and Security` → `Site Settings` → `Camera`
2. Block AlgoSensei from accessing camera

**Firefox**:
1. Go to `Settings` → `Privacy & Security` → `Permissions` → `Camera`
2. Remove AlgoSensei or block it

**Safari**:
1. Go to `Settings` → `Websites` → `Camera`
2. Set AlgoSensei to "Deny"

#### Option 2: In-App Toggle (Future Feature)

We are working on an in-app toggle to disable VIPER without browser-level changes.

---

## Third-Party Services

### MediaPipe (Google)

- **Purpose**: Face landmark detection and emotion analysis
- **Data Sharing**: MediaPipe runs **entirely in your browser**. The ML model is downloaded from Google's CDN, but no user data is sent to Google.
- **Privacy Policy**: [Google MediaPipe Privacy](https://developers.google.com/mediapipe)

### No Other Third Parties

No other third-party services have access to your webcam data.

---

## Security Measures

1. **HTTPS Only**: All connections are encrypted (TLS 1.3)
2. **Client-Side Execution**: Webcam processing never leaves your device
3. **No Persistent Storage**: Video frames are discarded immediately after processing
4. **Memory Cleanup**: Video buffers are cleared when you close the tab/window

---

## Children's Privacy

AlgoSensei is intended for users aged **13 and above**. We do not knowingly collect webcam data from children under 13. If you are a parent and believe your child has used the webcam feature, please contact us immediately.

---

## Your Rights

Under GDPR, CCPA, and other privacy laws, you have the right to:

- ✅ **Access**: Request what data we store (none for webcam)
- ✅ **Delete**: Request deletion of any stored analytics (not video, as we don't store it)
- ✅ **Opt-Out**: Disable webcam features entirely
- ✅ **Portability**: Export your numerical analytics data

**To exercise these rights**, email us at: [privacy@algosensei.dev](mailto:privacy@algosensei.dev) *(placeholder email)*

---

## Transparency Report

### What We Log (Server-Side)

**Webcam-Related API Calls**: NONE

The only server communication related to VIPER is:

```typescript
// Example: Interview mode sends ONLY numerical confidence scores
POST /api/interview
{
  "viper": {
    "score": 85,          // Number only
    "issues": ["Distracted"]  // String labels only
  }
}
```

No images, video frames, or biometric data are included.

---

## Consent

By using AlgoSensei's webcam features, you consent to:

- Your browser accessing your webcam
- Client-side ML processing of your video stream
- Display of real-time confidence scores on your screen

You do **NOT** consent to (because we don't do this):
- Server-side storage of video
- Sharing of video with third parties
- Biometric identification

---

## Changes to This Policy

We will notify you of any material changes to this privacy policy via:

- In-app banner notification
- Email (if you provided one)
- Update to the "Last Updated" date at the top

---

## Contact Us

If you have questions or concerns about webcam usage:

- **Email**: [privacy@algosensei.dev](mailto:privacy@algosensei.dev) *(placeholder)*
- **GitHub Issues**: [github.com/VENOMRK22/algoSensei/issues](https://github.com/VENOMRK22/algoSensei/issues)

---

## Technical Details (For Developers)

### MediaPipe Configuration

```typescript
// src/hooks/useViper.ts (simplified)

const vision = await FilesetResolver.forVisionTasks(
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
);

const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
  baseOptions: {
    modelAssetPath: "https://storage.googleapis.com/mediapipe-models/...",
    delegate: "GPU"  // Local GPU processing
  },
  runningMode: "VIDEO",  // Real-time video frames
  numFaces: 2  // Detect up to 2 faces (for cheating detection)
});
```

### Data Flow (Client-Side Only)

```
Video Frame (640x480) 
  → detectForVideo()  
  → { faceLandmarks: [...], faceBlendshapes: [...] }
  → Extract numerical scores
  → Update React state
  → Render UI
  → Frame DISCARDED (garbage collected)
```

**Storage**: None. Each frame is processed and immediately discarded.

---

## Compliance

This privacy policy complies with:

- **GDPR** (General Data Protection Regulation, EU)
- **CCPA** (California Consumer Privacy Act, USA)
- **COPPA** (Children's Online Privacy Protection Act, USA)

---

## Audit Trail

| Date | Change |
|------|--------|
| 2026-01-31 | Initial privacy policy created |

---

**AlgoSensei is committed to protecting your privacy. If you have any concerns, please reach out.**

---

**Document Version**: 1.0  
**Last Updated**: January 31, 2026  
**Organization**: 4BITS  
**Developer**: VENOMRK22
