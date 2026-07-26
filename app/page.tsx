import React from 'react';
import { proxyRequest } from '@/lib/api-client';

export default async function Home() {
  try {
    const data = await proxyRequest('/anime/animekuindo/home');
    const list =
      Array.isArray(data)
        ? data
        : Array.isArray(data?.data?.latest)
        ? data.data.latest
        : Array.isArray(data?.latest)
        ? data.latest
        : data?.results ?? [];

    return (
      <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
        <h1>SHIINIME — Browse</h1>
        <p>Simple frontend (reads from the same API endpoints).</p>

        {Array.isArray(list) && list.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {list.map((item: any, idx: number) => {
              const title = item.title ?? item.name ?? item.slug ?? `Item ${idx}`;
              const slug = item.slug ?? item.id ?? item.anime_slug ?? item.name ?? '';
              return (
                <li key={idx} style={{ marginBottom: 12 }}>
                  <a href={`/anime/${encodeURIComponent(slug)}`} style={{ color: '#0ea5a4' }}>
                    {title}
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
        )}
      </main>
    );
  } catch (error) {
    return (
      <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
        <h1>SHIINIME — Error</h1>
        <p>Unable to load list from upstream API.</p>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{String(error)}</pre>
      </main>
    );
  }
}
