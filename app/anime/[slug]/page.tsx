import React from 'react';
import Link from 'next/link';

export default async function AnimeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    // Try Winbu detail endpoint first, fallback to anime detail
    let res;
    try {
      res = await fetch(new URL(`/api/anime/winbu/anime/${encodeURIComponent(slug)}`, process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'), { cache: 'no-store' });
    } catch (_) {
      res = null;
    }

    let json;
    if (!res || !res.ok) {
      try {
        const fb = await fetch(new URL(`/api/anime/detail/${encodeURIComponent(slug)}`, process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'), { cache: 'no-store' });
        json = await fb.json().catch(() => null);
      } catch (_) {
        json = null;
      }
    } else {
      json = await res.json().catch(() => null);
    }

    const data = json?.data ?? json;

    return (
      <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
        <Link href="/" style={{ display: 'inline-block', marginBottom: 12 }}>&larr; Back</Link>
        <h1>{data?.title ?? data?.name ?? slug}</h1>
        <section>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
        </section>
      </main>
    );
  } catch (error) {
    return (
      <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
        <Link href="/" style={{ display: 'inline-block', marginBottom: 12 }}>&larr; Back</Link>
        <h1>Error loading anime</h1>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{String(error)}</pre>
      </main>
    );
  }
}
