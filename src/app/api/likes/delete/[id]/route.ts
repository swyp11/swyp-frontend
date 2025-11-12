/**
 * 찜 삭제 API Route Handler
 * DELETE /api/likes/delete/[id]
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return proxyToBackend(request, {
    path: `/api/likes/${id}`,
    method: 'DELETE',
  });
}
