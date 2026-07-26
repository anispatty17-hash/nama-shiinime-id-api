import React from 'react';

export default async function Home() {
  try {
    // Call internal API route so errors are normalized and logs are centralized
    // Use Winbu homepage endpoint with fallback to anime home if Winbu fails
    let res;
    try {
      res = await fetch(new URL('/api/anime/winbu/home', process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'), {
        cache: 'no-store',
      });
    } catch (_) {
      res = null;
    }

    let json;
    if (!res || !res.ok) {
      try {
        const fb = await fetch(new URL('/api/anime/home', process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'), { cache: 'no-store' });
        json = await fb.json().catch(() => null);
      } catch (_) {
        json = null;
      }
    } else {
      json = await res.json().catch(() => null);
    }
    const payload = json?.data ?? json;
    const list =
      Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data?.latest)
        ? payload.data.latest
        : Array.isArray(payload?.latest)
        ? payload.latest
        : payload?.results ?? [];

    return (
      <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
        <h1>SHIINIME — Browse</h1>
        <p>Simple frontend (reads from the same API endpoints).</p>

        {Array.isArray(list) && list.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {list.map((item: Record<string, unknown>, idx: number) => {
              const title = String(item['title'] ?? item['name'] ?? item['slug'] ?? `Item ${idx}`);
              const slug = String(item['slug'] ?? item['id'] ?? item['anime_slug'] ?? item['name'] ?? '');
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
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(payload, null, 2)}</pre>
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
