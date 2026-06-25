import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // There is a sibling lockfile in the parent dir; pin Turbopack's root to
  // this app so the workspace root is inferred correctly.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
