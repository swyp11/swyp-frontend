import { NextRequest, NextResponse } from 'next/server';

export interface Makeup {
  id: string;
  image: string;
  title: string;
  description: string;
}

// Mock 데이터 - 메이크업 (빈 배열로 설정)
const mockMakeups: Makeup[] = [];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') as 'popular' | 'new' | null;

  // 타입이 없으면 전체 데이터 반환
  if (!type) {
    return NextResponse.json({
      success: true,
      data: mockMakeups,
    });
  }

  // 타입으로 필터링
  const typePrefix = type === 'popular' ? 'pop' : 'new';
  const filteredData = mockMakeups.filter(item =>
    item.id.startsWith(`mk-${typePrefix}`)
  );

  return NextResponse.json({
    success: true,
    data: filteredData,
    meta: {
      type,
      count: filteredData.length,
    },
  });
}
