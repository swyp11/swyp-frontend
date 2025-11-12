/**
 * 찜 삭제 API Route Handler
 * DELETE /api/likes/delete/[id]
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return proxyToBackend(request, {
    path: `/api/likes/${params.id}`,
    method: 'DELETE',
  });
}
