/**
 * 드레스샵 상세 조회/수정/삭제 API Route Handler
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return proxyToBackend(request, {
    path: `/api/dress-shop/${params.id}`,
    method: 'GET',
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return proxyToBackend(request, {
    path: `/api/dress-shop/${params.id}`,
    method: 'PUT',
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return proxyToBackend(request, {
    path: `/api/dress-shop/${params.id}`,
    method: 'DELETE',
  });
}
