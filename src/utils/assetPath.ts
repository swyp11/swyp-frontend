/**
 * Get asset path with base path prefix for GitHub Pages compatibility
 * Images from backend (/images/) use AI service URL
 * Static assets (/img/) use base path
 * @param path - Asset path starting with /
 * @returns Full path with base path prefix or AI service URL if needed
 */
export function getAssetPath(path: string): string {
  // 백엔드에서 제공하는 이미지는 AI 서비스 URL 사용
  if (path.startsWith('/images/')) {
    const aiServiceUrl = process.env.NEXT_PUBLIC_BACKEND_AI_API_URL || 'http://223.130.163.203:8000';
    return `${aiServiceUrl}${path}`;
  }

  // 정적 에셋은 기존대로 basePath 사용
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}${path}`;
}
