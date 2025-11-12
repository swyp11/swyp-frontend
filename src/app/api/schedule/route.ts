/**
 * 일정 생성 API Route Handler
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function POST(request: NextRequest) {
  return proxyToBackend(request, {
    path: '/api/schedule',
    method: 'POST',
  });
}
