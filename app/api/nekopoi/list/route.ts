import { NextResponse } from 'next/server';
import { buildApiError, buildApiResponse, proxyRequest } from '@/lib/api-client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') ?? '1';
    const data = await proxyRequest(`/nekopoi/list?page=${encodeURIComponent(page)}`);
    return NextResponse.json(buildApiResponse(data, 'Success'));
  } catch (error) {
    return NextResponse.json(buildApiError('Failed to fetch nekopoi list', error), { status: 502 });
  }
}
