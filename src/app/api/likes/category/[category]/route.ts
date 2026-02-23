/**
 * 카테고리별 찜 목록 조회 API Route Handler
 * GET /api/likes/category/[category]
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  return proxyToBackend(request, {
    path: `/api/v1/bookmarks/category/${category}`,
    method: 'GET',
  });
}
