import { NextResponse } from 'next/server';
import { buildApiError, buildApiResponse, proxyRequest } from '@/lib/api-client';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ genre: string }> },
) {
  try {
    const { genre } = await params;
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') ?? '1';
    const data = await proxyRequest(`/anime/genre/${encodeURIComponent(genre)}?page=${encodeURIComponent(page)}`);
    return NextResponse.json(buildApiResponse(data, 'Success'));
  } catch (error) {
    return NextResponse.json(buildApiError('Failed to fetch genre anime', error), { status: 502 });
  }
}
