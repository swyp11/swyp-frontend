/**
 * 회원가입 API Route Handler
 * POST /api/user/join
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function POST(request: NextRequest) {
  console.log('');
  console.log('='.repeat(80));
  console.log('📝 [SIGNUP ROUTE] 회원가입 요청 시작');
  console.log('='.repeat(80));

  try {
    const body = await request.clone().json();
    console.log('📦 [SIGNUP ROUTE] Request Body:', JSON.stringify(body, null, 2));
  } catch (e) {
    console.log('⚠️ [SIGNUP ROUTE] Body parsing failed:', e);
  }

  const result = await proxyToBackend(request, {
    path: '/api/user/join',
    method: 'POST',
  });

  console.log('🏁 [SIGNUP ROUTE] 회원가입 요청 완료');
  console.log('='.repeat(80));
  console.log('');

  return result;
}
