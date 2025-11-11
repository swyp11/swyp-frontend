import { NextRequest, NextResponse } from 'next/server';
import { DressShop } from '../route';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8080/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const apiUrl = `${API_BASE_URL}/dress-shop/${id}`;

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
            error: 'Dress shop not found',
          },
          { status: 404 }
        );
      }
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: DressShop = await response.json();

    // Add imageUrl if not present, use default.png as fallback
    const dataWithImage = {
      ...data,
      imageUrl: data.imageUrl || '/img/default.png',
    };

    return NextResponse.json({
      success: true,
      data: dataWithImage,
    });
  } catch (error) {
    console.error('Error fetching dress shop details:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch dress shop details',
      },
      { status: 500 }
    );
  }
}
