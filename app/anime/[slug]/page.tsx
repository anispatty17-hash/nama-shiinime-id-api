import React from 'react';
import { proxyRequest } from '@/lib/api-client';

export default async function AnimeDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    const data = await proxyRequest(`/anime/anime/${slug}`);

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
