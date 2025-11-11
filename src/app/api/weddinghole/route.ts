import { NextRequest, NextResponse } from 'next/server';

export interface WeddingHole {
  id: number;
  hallName: string;
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

    if (searchParams.get('hallName')) {
      params.append('hallName', searchParams.get('hallName')!);
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

    const apiUrl = `${API_BASE_URL}/wedding${params.toString() ? `?${params.toString()}` : ''}`;

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

    const data: WeddingHole[] = await response.json();

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
    console.error('Error fetching wedding halls:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch wedding halls',
      },
      { status: 500 }
    );
  }
}
