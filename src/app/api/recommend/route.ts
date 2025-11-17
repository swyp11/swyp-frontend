import { NextRequest, NextResponse } from 'next/server';

// Request types
export interface RecommendRequest {
  arm_length: 'short' | 'medium' | 'long';
  leg_length: 'short' | 'medium' | 'long';
  neck_length: 'short' | 'medium' | 'long';
  face_shape: 'oval' | 'wide' | 'angular' | 'long';
  body_type: 'thin' | 'medium' | 'heavy';
  num_recommendations: number;
}

// Response types
export interface StyleRecommendation {
  style_name: string;
  description: string;
  why_recommended: string;
  styling_tips: string[];
}

export interface RecommendResponse {
  request_params: {
    body_type?: string;
    arm_length: string;
    face_shape: string;
    leg_length: string;
    neck_length: string;
    num_recommendations: number;
  };
  recommendations: StyleRecommendation[];
  overall_advice: string;
  cached: boolean;
}

const BACKEND_AI_API_URL =
  process.env.NEXT_PUBLIC_BACKEND_AI_API_URL || 'http://223.130.163.203:8000';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: RecommendRequest = await request.json();

    // Validate required fields
    if (
      !body.arm_length ||
      !body.face_shape ||
      !body.leg_length ||
      !body.neck_length ||
      !body.num_recommendations
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Call backend AI API
    const response = await fetch(`${BACKEND_AI_API_URL}/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Backend AI API error: ${response.status}`);
    }

    const data: RecommendResponse = await response.json();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Failed to fetch AI recommendations:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch AI recommendations',
      },
      { status: 500 }
    );
  }
}

