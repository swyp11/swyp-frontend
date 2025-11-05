/**
 * Get asset path with base path prefix for GitHub Pages compatibility
 * @param path - Asset path starting with /
 * @returns Full path with base path prefix if needed
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}${path}`;
}
