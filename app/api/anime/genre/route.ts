import { NextResponse } from 'next/server';
import { buildApiError, buildApiResponse, proxyRequest } from '@/lib/api-client';

export async function GET() {
  try {
    const data = await proxyRequest('/anime/genre');
    return NextResponse.json(buildApiResponse(data, 'Success'));
  } catch (error) {
    return NextResponse.json(buildApiError('Failed to fetch anime genres', error), { status: 502 });
  }
}
