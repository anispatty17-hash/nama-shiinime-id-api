import { NextResponse } from 'next/server';
import { buildApiError, buildApiResponse, proxyRequest } from '@/lib/api-client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('q') ?? '';
    const data = await proxyRequest(`/anime/search/${encodeURIComponent(keyword)}`);
    return NextResponse.json(buildApiResponse(data, 'Success'));
  } catch (error) {
    return NextResponse.json(buildApiError('Failed to search anime', error), { status: 502 });
  }
}
