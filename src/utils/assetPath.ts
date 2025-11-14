/**
 * Get asset path with base path prefix for GitHub Pages compatibility
 * Images from backend (/images/) use proxy to avoid HTTPS errors
 * Static assets (/img/) use base path
 * @param path - Asset path starting with /
 * @returns Full path with base path prefix or proxy URL if needed
 */
export function getAssetPath(path: string): string {
  // 백엔드에서 제공하는 이미지는 프록시를 통해 제공 (HTTPS 에러 방지)
  if (path.startsWith('/images/')) {
    return `/api/proxy/ai${path}`;
  }

  // 정적 에셋은 기존대로 basePath 사용
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}${path}`;
}
