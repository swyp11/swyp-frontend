/**
 * 찜 추가 API Route Handler
 * POST /api/likes/[category]/[postId]
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function POST(
  request: NextRequest,
  { params }: { params: { category: string; postId: string } }
) {
  return proxyToBackend(request, {
    path: `/api/likes/${params.category}/${params.postId}`,
    method: 'POST',
  });
}
