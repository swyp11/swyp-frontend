/**
 * 드레스 상세 조회/수정/삭제 API Route Handler
 * GET /api/dress/[id] - 상세 조회
 * PUT /api/dress/[id] - 수정
 * DELETE /api/dress/[id] - 삭제
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return proxyToBackend(request, {
    path: `/api/dress/${params.id}`,
    method: 'GET',
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return proxyToBackend(request, {
    path: `/api/dress/${params.id}`,
    method: 'PUT',
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return proxyToBackend(request, {
    path: `/api/dress/${params.id}`,
    method: 'DELETE',
  });
}
