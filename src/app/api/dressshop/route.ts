import { NextRequest, NextResponse } from 'next/server';

export interface DressShop {
  id: number;
  shopName: string;
  description: string;
  address: string;
  phone: string;
  snsUrl: string;
  specialty: string;
  features: string;
  regDt: string;
  updateDt: string;
  imageUrl?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8080/api';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Build query parameters for backend API
    const params = new URLSearchParams();

    if (searchParams.get('shopName')) {
      params.append('shopName', searchParams.get('shopName')!);
    }
    if (searchParams.get('address')) {
      params.append('address', searchParams.get('address')!);
    }
    if (searchParams.get('specialty')) {
      params.append('specialty', searchParams.get('specialty')!);
    }
    if (searchParams.get('sort')) {
      params.append('sort', searchParams.get('sort')!);
    }

    const apiUrl = `${API_BASE_URL}/dress-shop${params.toString() ? `?${params.toString()}` : ''}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: DressShop[] = await response.json();

    // Add default image for items without imageUrl
    const dataWithImages = data.map((item) => ({
      ...item,
      imageUrl: item.imageUrl || '/img/default.png',
    }));

    return NextResponse.json({
      success: true,
      data: dataWithImages,
    });
  } catch (error) {
    console.error('Error fetching dress shops:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch dress shops',
      },
      { status: 500 }
    );
  }
}
