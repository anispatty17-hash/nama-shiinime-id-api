import React from 'react';
import { proxyRequest } from '@/lib/api-client';

export default async function AnimeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    // Use Winbu detail endpoint
    const res = await fetch(new URL(`/api/anime/winbu/anime/${encodeURIComponent(slug)}`, process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'), { cache: 'no-store' });
    const json = await res.json().catch(() => null);
    const data = json?.data ?? json;

    return (
      <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: 12 }}>&larr; Back</a>
        <h1>{data?.title ?? data?.name ?? slug}</h1>
        <section>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
        </section>
      </main>
    );
  } catch (error) {
    return (
      <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: 12 }}>&larr; Back</a>
        <h1>Error loading anime</h1>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{String(error)}</pre>
      </main>
    );
  }
}
