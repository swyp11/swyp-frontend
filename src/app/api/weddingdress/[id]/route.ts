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

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8080/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const apiUrl = `${API_BASE_URL}/dress/${id}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          {
            success: false,
            error: 'Wedding dress not found',
          },
          { status: 404 }
        );
      }
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: BackendDress = await response.json();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error fetching wedding dress details:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch wedding dress details',
      },
      { status: 500 }
    );
  }
}
