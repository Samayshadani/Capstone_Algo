import type { NextConfig } from "next";
import { execSync } from "child_process";

const calculateVersion = () => {
  try {
    const logs = execSync('git log --pretty=format:%s').toString().split('\n');
    let major = 1;
    let minor = 0;
    let patch = 0;

    // Process from oldest to newest (git log returns newest first, so reverse)
    logs.reverse().forEach(msg => {
      const lower = msg.toLowerCase();
      if (lower.includes('breaking') || lower.includes('major')) {
        major++;
        minor = 0;
        patch = 0;
      } else if (lower.startsWith('feat') || lower.includes('feature') || lower.includes('minor')) {
        minor++;
        patch = 0;
      } else if (lower.startsWith('fix') || lower.startsWith('perf') || lower.startsWith('refactor')) {
        patch++;
      } else {
        // Default to patch for other commits to keep movement alive, or ignore? 
        // Let's treat standard commits as patches for more "market ready" movement.
        patch++;
      }
    });
    return `v${major}.${minor}.${patch}`;
  } catch (e) {
    return 'v1.0.0';
  }
};

const version = calculateVersion();

let commitHash = 'unknown';
try {
  commitHash = execSync('git rev-parse --short HEAD').toString().trim();
} catch (e) {
  // git not available or not a git repo — use fallback
}

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_GIT_COMMIT: commitHash,
    NEXT_PUBLIC_APP_VERSION: version,
  },
  // Required to silence Next.js 16 Turbopack/webpack mismatch warning.
  // The webpack config below is still used for production builds.
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (isServer) {
      // pdfjs-dist (used by pdf-parse v2) optionally requires 'canvas'.
      // Stub it out so the server build doesn't throw a module-not-found error.
      config.resolve.alias = {
        ...config.resolve.alias,
        canvas: false,
      };
    }
    return config;
  },
};

export default nextConfig;
