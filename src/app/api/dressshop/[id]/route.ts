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

    // Add fallback images if not present
    let dataWithImages = { ...data } as any;

    // Check if images/imageUrl exists, if not add fallback images
    if (!dataWithImages.imageUrl && !dataWithImages.image && !dataWithImages.thumbnail && !dataWithImages.images) {
      const imageIndex = ((Number(id) % 3) + 1); // Cycles through 1, 2, 3 based on id

      // Helper function to get correct image filename (dress_shop_3 has double dots)
      const getImageName = (idx: number) => {
        const normalizedIdx = ((idx - 1) % 3) + 1; // Ensure it's always 1, 2, or 3
        return normalizedIdx === 3 ? 'dress_shop_3..jpg' : `dress_shop_${normalizedIdx}.jpg`;
      };

      dataWithImages.images = [
        `/dress_shop/${getImageName(imageIndex)}`,
        `/dress_shop/${getImageName(imageIndex + 1)}`,
        `/dress_shop/${getImageName(imageIndex + 2)}`,
      ];
    }

    return NextResponse.json({
      success: true,
      data: dataWithImages,
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
