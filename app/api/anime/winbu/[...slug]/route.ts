import { NextResponse } from 'next/server';
import { buildApiError, buildApiResponse, proxyRequest } from '@/lib/api-client';

export async function GET(request: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  try {
    const { slug } = await params;
    const slugArr = slug ?? [];
    const path = `/anime/winbu/${slugArr.join('/')}`.replace(/\/+$/, '');

    const url = new URL(request.url);
    const search = url.search ? url.search : '';

    try {
      const data = await proxyRequest(`${path}${search}`);
      return NextResponse.json(buildApiResponse(data, 'Success'));
    } catch (innerError) {
      // attempt fallback to non-winbu path (best-effort)
      const fallbackPath = path.replace('/anime/winbu/', '/anime/');
      try {
        const fallbackData = await proxyRequest(`${fallbackPath}${search}`);
        return NextResponse.json(buildApiResponse(fallbackData, 'Success (fallback)'));
      } catch (_err) {
        throw innerError;
      }
    }
  } catch (error: unknown) {
    const status = (error as { status?: number })?.status ?? 502;
    return NextResponse.json(buildApiError('Failed to fetch winbu resource', error), { status });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  try {
    const { slug } = await params;
    const slugArr = slug ?? [];
    const path = `/anime/winbu/${slugArr.join('/')}`.replace(/\/+$/, '');
    const body = await request.text();
    try {
      const data = await proxyRequest(path, { method: 'POST', data: body, headers: { 'Content-Type': request.headers.get('content-type') ?? 'application/json' } });
      return NextResponse.json(buildApiResponse(data, 'Success'));
    } catch (innerError) {
      const fallbackPath = path.replace('/anime/winbu/', '/anime/');
      try {
        const fallback = await proxyRequest(fallbackPath, { method: 'POST', data: body, headers: { 'Content-Type': request.headers.get('content-type') ?? 'application/json' } });
        return NextResponse.json(buildApiResponse(fallback, 'Success (fallback)'));
      } catch (_err) {
        throw innerError;
      }
    }
  } catch (error: unknown) {
    const status = (error as { status?: number })?.status ?? 502;
    return NextResponse.json(buildApiError('Failed to post to winbu resource', error), { status });
  }
}
