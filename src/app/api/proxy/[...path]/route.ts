import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://223.130.163.203:8080/api';
const BACKEND_AI_API_URL = process.env.NEXT_PUBLIC_BACKEND_AI_API_URL || 'http://223.130.163.203:8000';

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

    // AI API인지 일반 API인지 구분
    const isAiApi = path.startsWith('ai/');
    const targetUrl = isAiApi
      ? `${BACKEND_AI_API_URL}/${path.replace('ai/', '')}`
      : `${BACKEND_API_URL}/${path}`;

    // 쿼리 파라미터 추가
    const searchParams = request.nextUrl.searchParams.toString();
    const url = searchParams ? `${targetUrl}?${searchParams}` : targetUrl;

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
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Proxy request failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
