import { NextRequest, NextResponse } from 'next/server';
import { WeddingHole } from '../route';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8080/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const apiUrl = `${API_BASE_URL}/wedding/${id}`;

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
            error: 'Wedding hall not found',
          },
          { status: 404 }
        );
      }
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: WeddingHole = await response.json();

    // Add fallback images if not present
    let dataWithImages = { ...data } as any;

    // Check if images/imageUrl exists, if not add fallback images
    if (!dataWithImages.imageUrl && !dataWithImages.image && !dataWithImages.thumbnail && !dataWithImages.images) {
      const imageIndex = ((Number(id) % 5) + 1); // Cycles through 1-5 based on id

      dataWithImages.images = [
        `/img/frame-482543-${imageIndex}.png`,
        `/img/frame-482543-${((imageIndex % 5) + 1)}.png`,
        `/img/frame-482543-${(((imageIndex + 1) % 5) + 1)}.png`,
      ];
    }

    return NextResponse.json({
      success: true,
      data: dataWithImages,
    });
  } catch (error) {
    console.error('Error fetching wedding hall details:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch wedding hall details',
      },
      { status: 500 }
    );
  }
}
