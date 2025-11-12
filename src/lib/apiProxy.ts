/**
 * API Proxy 공통 헬퍼 함수
 */

import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

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
  try {
    const { path, method = request.method } = options;

    // 요청 헤더 가져오기
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Authorization 헤더가 있으면 전달
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    // 요청 body가 있는 경우 파싱
    let body: string | undefined;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const requestBody = await request.json().catch(() => null);
      if (requestBody) {
        body = JSON.stringify(requestBody);
      }
    }

    // 백엔드로 요청
    const response = await fetch(`${BACKEND_URL}${path}`, {
      method,
      headers,
      body,
    });

    // 응답 처리
    let data;
    const contentType = response.headers.get('Content-Type');

    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // 응답 헤더 구성
    const responseHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Authorization 헤더가 있으면 전달
    const responseAuthHeader = response.headers.get('Authorization');
    if (responseAuthHeader) {
      responseHeaders['Authorization'] = responseAuthHeader;
    }

    return NextResponse.json(data, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: String(error) },
      { status: 500 }
    );
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
