/**
 * 찜 추가 API Route Handler
 * POST /api/likes/[category]/[postId]
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ category: string; postId: string }> }
) {
  const { category, postId } = await params;
  return proxyToBackend(request, {
    path: `/api/likes/${category}/${postId}`,
    method: 'POST',
  });
}
