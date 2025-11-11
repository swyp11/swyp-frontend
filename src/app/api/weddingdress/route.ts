import { getAssetPath } from '@/utils/assetPath';
import { NextRequest, NextResponse } from 'next/server';

// 백엔드 응답 타입 (드레스 상품)
interface BackendDress {
  id: number;
  name: string;
  color: string;
  shape: string;
  priceRange: string;
  length: string;
  season: string;
  brand: string;
  designer: string | null;
  type: string;
  neckLine: string;
  mood: string;
  fabric: string;
  features: string;
  regDt: string | null;
  updateDt: string | null;
  imageUrl: string;
}

// 프론트엔드 표시 타입
export interface WeddingDress {
  id: string;
  image: string;
  title: string;
  description: string;
}

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://223.130.163.203:8080/api';

// 백엔드 데이터를 프론트엔드 형식으로 변환
function transformDressData(backendData: BackendDress): WeddingDress {
  return {
    id: backendData.id.toString(),
    image: backendData.imageUrl ? backendData.imageUrl : getAssetPath('/default.png'),
    title: backendData.name,
    description: `${backendData.brand} · ${backendData.color}`,
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');

  try {
    // 백엔드 API로 요청
    const queryString = type ? `?type=${type}` : '';
    const response = await fetch(`${BACKEND_API_URL}/dress${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }

    const backendData = await response.json();

    // 백엔드 응답 형식 확인 및 변환
    if (backendData.success && Array.isArray(backendData.data)) {
      // 데이터 변환
      const transformedData = backendData.data.map((dress: BackendDress) => transformDressData(dress));

      return NextResponse.json({
        success: true,
        data: transformedData,
        meta: backendData.meta,
      });
    } else if (Array.isArray(backendData)) {
      // 배열로 직접 오는 경우
      const transformedData = backendData.map((dress: BackendDress) => transformDressData(dress));

      return NextResponse.json({
        success: true,
        data: transformedData,
      });
    } else {
      // 예상치 못한 형식
      return NextResponse.json(backendData);
    }
  } catch (error) {
    console.error('Failed to fetch dress data:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch dress data',
      },
      { status: 500 }
    );
  }
}
