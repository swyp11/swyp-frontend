import { NextRequest, NextResponse } from 'next/server';

// MSA Gateway URL
const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8080';
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || `${GATEWAY_URL}/api/v1`;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const params = await context.params;
  return handleProxy(request, params.path, 'GET');
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const params = await context.params;
  return handleProxy(request, params.path, 'POST');
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const params = await context.params;
  return handleProxy(request, params.path, 'PUT');
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const params = await context.params;
  return handleProxy(request, params.path, 'DELETE');
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const params = await context.params;
  return handleProxy(request, params.path, 'PATCH');
}

async function handleProxy(
  request: NextRequest,
  pathSegments: string[],
  method: string
) {
  try {
    const path = pathSegments.join('/');

    // ai/ prefix 제거
    const cleanPath = path.startsWith('ai/') ? path.replace('ai/', '') : path;

    // images/는 gateway 루트로, 나머지는 /api/v1/ 경로로
    const targetUrl = cleanPath.startsWith('images/')
      ? `${GATEWAY_URL}/${cleanPath}`
      : `${BACKEND_API_URL}/${cleanPath}`;

    // 쿼리 파라미터 추가
    const searchParams = request.nextUrl.searchParams.toString();
    const url = searchParams ? `${targetUrl}?${searchParams}` : targetUrl;

    // 🔍 이미지 요청 로그
    console.log(`[Proxy] ${method} 요청`);
    console.log(`  원본 경로: /${path}`);
    console.log(`  변환된 URL: ${url}`);

    // 헤더 복사 (Authorization 등)
    const headers = new Headers();
    request.headers.forEach((value, key) => {
      if (!key.toLowerCase().startsWith('host') &&
          !key.toLowerCase().startsWith('connection')) {
        headers.set(key, value);
      }
    });

    // body 처리
    let body = undefined;
    if (method !== 'GET' && method !== 'HEAD') {
      const contentType = request.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        body = JSON.stringify(await request.json());
      } else if (contentType?.includes('multipart/form-data')) {
        body = await request.formData();
      } else {
        body = await request.text();
      }
    }

    // 백엔드로 요청 전달
    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    // 🔍 응답 로그
    console.log(`  응답 상태: ${response.status} ${response.statusText}`);
    console.log(`  Content-Type: ${response.headers.get('content-type')}`);

    // 응답 헤더 복사
    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      responseHeaders.set(key, value);
    });

    // 이미지나 바이너리 파일인 경우
    const contentType = response.headers.get('content-type');
    if (contentType?.startsWith('image/') ||
        contentType?.startsWith('application/octet-stream')) {
      const blob = await response.blob();
      return new NextResponse(blob, {
        status: response.status,
        headers: responseHeaders,
      });
    }

    // JSON 응답
    const data = await response.text();
    return new NextResponse(data, {
      status: response.status,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('[Proxy] ❌ 에러 발생:', error);
    console.error(`  에러 메시지: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return NextResponse.json(
      { error: 'Proxy request failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
