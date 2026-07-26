import { NextResponse } from 'next/server';
import { buildApiError, buildApiResponse, proxyRequest } from '@/lib/api-client';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const data = await proxyRequest(`/anime/server/${id}`);
    return NextResponse.json(buildApiResponse(data, 'Success'));
  } catch (error) {
    return NextResponse.json(buildApiError('Failed to fetch anime server', error), { status: 502 });
  }
}
