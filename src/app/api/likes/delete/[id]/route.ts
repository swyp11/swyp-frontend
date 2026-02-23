import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return proxyToBackend(request, {
    path: `/api/v1/bookmarks/${id}`,
    method: 'DELETE',
  });
}
