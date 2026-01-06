/**
 * API Proxy 공통 헬퍼 함수
 */

import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/api$/, '') || 'http://localhost:8080';

interface ProxyOptions {
  path: string;
  method?: string;
  headers?: HeadersInit;
}

/**
 * 백엔드 API로 요청을 프록시하는 공통 함수
 */
export async function proxyToBackend(
  request: NextRequest,
  options: ProxyOptions
) {
  console.log('');
  console.log('🔄 [PROXY] ===== API Proxy 시작 =====');

  try {
    const { path, method = request.method } = options;

    console.log('📍 [PROXY] Method:', method);
    console.log('📍 [PROXY] Path:', path);

    // 요청 헤더 가져오기
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Authorization 헤더가 있으면 전달
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    // 디버깅: 토큰 확인
    console.log('🔑 [PROXY] Authorization Header:', authHeader ? '있음' : '❌ 없음');

    // 요청 body가 있는 경우 파싱
    let body: string | undefined;
    let requestBody = null;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      requestBody = await request.json().catch(() => null);
      if (requestBody) {
        body = JSON.stringify(requestBody);
        console.log('📦 [PROXY] Request Body:', JSON.stringify(requestBody, null, 2));
      } else {
        console.log('⚠️ [PROXY] No request body');
      }
    }

    // 최종 URL 구성
    const targetUrl = `${BACKEND_URL}${path}`;
    console.log('');
    console.log('🎯 [PROXY] ===== 백엔드 요청 정보 =====');
    console.log('🌐 [PROXY] BACKEND_URL:', BACKEND_URL);
    console.log('🛣️  [PROXY] Path:', path);
    console.log('🎯 [PROXY] Full Target URL:', targetUrl);
    console.log('📋 [PROXY] Method:', method);
    console.log('📋 [PROXY] Headers:', headers);
    console.log('');

    // 백엔드로 요청
    console.log('⏳ [PROXY] Sending request to backend...');
    const startTime = Date.now();

    const response = await fetch(targetUrl, {
      method,
      headers,
      body,
    });

    const elapsed = Date.now() - startTime;
    console.log(`✅ [PROXY] Response received in ${elapsed}ms`);
    console.log('');
    console.log('📡 [PROXY] ===== 백엔드 응답 정보 =====');
    console.log('🔢 [PROXY] Status Code:', response.status);
    console.log('✓  [PROXY] Status OK:', response.ok);
    console.log('📝 [PROXY] Status Text:', response.statusText);

    // 응답 처리
    let data;
    const contentType = response.headers.get('Content-Type');
    console.log('📄 [PROXY] Content-Type:', contentType);

    if (contentType?.includes('application/json')) {
      data = await response.json();
      console.log('📦 [PROXY] Response Data (JSON):', JSON.stringify(data, null, 2));
    } else {
      data = await response.text();
      console.log('📦 [PROXY] Response Data (Text):', data);
    }

    // 응답 헤더 구성
    const responseHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Authorization 헤더가 있으면 전달
    const responseAuthHeader = response.headers.get('Authorization');
    if (responseAuthHeader) {
      responseHeaders['Authorization'] = responseAuthHeader;
      console.log('🔑 [PROXY] Response has Authorization header');
    }

    console.log('');
    console.log('🔙 [PROXY] Returning to client with status:', response.status);
    console.log('🔄 [PROXY] ===== API Proxy 완료 =====');
    console.log('');

    return NextResponse.json(data, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.log('');
    console.error('❌ [PROXY] ===== ERROR OCCURRED =====');
    console.error('❌ [PROXY] Request URL:', `${BACKEND_URL}${options.path}`);
    console.error('❌ [PROXY] Request Method:', options.method || request.method);
    console.error('❌ [PROXY] Error Type:', error?.constructor?.name);
    console.error('❌ [PROXY] Error Message:', String(error));

    // fetch failed의 실제 원인은 error.cause에 있음
    if (error instanceof Error && error.cause) {
      console.error('❌ [PROXY] Error Cause:', error.cause);
      if (error.cause instanceof Error) {
        console.error('❌ [PROXY] Cause Type:', error.cause.constructor?.name);
        console.error('❌ [PROXY] Cause Message:', error.cause.message);
        console.error('❌ [PROXY] Cause Code:', (error.cause as NodeJS.ErrnoException).code);
        console.error('❌ [PROXY] Cause Errno:', (error.cause as NodeJS.ErrnoException).errno);
        console.error('❌ [PROXY] Cause Syscall:', (error.cause as NodeJS.ErrnoException).syscall);
        console.error('❌ [PROXY] Cause Address:', (error.cause as NodeJS.ErrnoException).address);
        console.error('❌ [PROXY] Cause Port:', (error.cause as NodeJS.ErrnoException).port);
      }
    }

    console.error('❌ [PROXY] Error Stack:', error instanceof Error ? error.stack : 'N/A');
    console.error('❌ [PROXY] ===== ERROR END =====');
    console.log('');

    // 에러 응답에도 더 상세한 정보 포함
    const errorDetails: Record<string, unknown> = {
      error: 'Internal Server Error',
      message: String(error),
      targetUrl: `${BACKEND_URL}${options.path}`,
    };

    if (error instanceof Error && error.cause instanceof Error) {
      const cause = error.cause as NodeJS.ErrnoException;
      errorDetails.cause = {
        code: cause.code,
        message: cause.message,
        syscall: cause.syscall,
        address: cause.address,
        port: cause.port,
      };
    }

    return NextResponse.json(errorDetails, { status: 500 });
  }
}

/**
 * Query Parameters를 URL 문자열로 변환
 */
export function buildQueryString(searchParams: URLSearchParams): string {
  const params = new URLSearchParams();

  searchParams.forEach((value, key) => {
    if (value) {
      params.append(key, value);
    }
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}
