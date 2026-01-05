/**
 * 찜 추가/삭제 API Route Handler
 * POST /api/likes/[category]/[postId] - 찜 추가
 * DELETE /api/likes/[category]/[postId] - 찜 삭제
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ category: string; postId: string }> }
) {
  const { category, postId } = await params;
  return proxyToBackend(request, {
    path: `/api/v1/bookmarks/${category}/${postId}`,
    method: 'POST',
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ category: string; postId: string }> }
) {
  const { category, postId } = await params;
  return proxyToBackend(request, {
    path: `/api/v1/bookmarks/${category}/${postId}`,
    method: 'DELETE',
  });
}
