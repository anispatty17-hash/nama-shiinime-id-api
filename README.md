# Shiinime ID API

Lightweight Next.js (App Router) proxy for anime sites (Winbu fallback).

This repository is a Next.js 15 + TypeScript app that acts as a backend-only API proxy
and includes a minimal frontend. It proxies requests to an upstream site and
normalizes responses to `{ success, message, data }` on success and
`{ success:false, message:'Error', error:'...', data:null }` on error.

Quick start

1. Install dependencies

```bash
npm install
```

2. Local development (requires Node 18+)

```bash
cp .env.example .env.local
# edit .env.local and set UPSTREAM_BASE_URL
npm run dev
# open http://localhost:3000
```

3. Production build

```bash
npm run build
npm start
```

Environment variables

- `UPSTREAM_BASE_URL` — base URL of upstream site (default in repo: https://www.sankavollerei.web.id)
- `REQUEST_TIMEOUT` — request timeout in milliseconds (e.g. `12000`)
- `MAX_RETRIES` — number of retry attempts for upstream requests
- `NEXT_PUBLIC_BASE_URL` — optional frontend base URL used in edge cases

Example `.env.local`:

```
UPSTREAM_BASE_URL=https://www.sankavollerei.web.id
REQUEST_TIMEOUT=12000
MAX_RETRIES=2
```

Deploying to Vercel

1. Create a new Vercel project and connect this GitHub repository.
2. In Vercel Project Settings → Environment Variables, add the same env vars from above.
3. Trigger a deployment by pushing to `main` or via the Vercel dashboard.

Notes
- The app includes a catch-all Winbu proxy at `/api/anime/winbu/[...slug]` which will
  attempt a fallback to non-winbu paths if the Winbu upstream is unreachable.
- The server exposes internal proxy endpoints under `/api/anime/*` and `/api/nekopoi/*`.

Contact / Maintainers

You pushed this repo to: https://github.com/anispatty17-hash/nama-shiinime-id-api

If you want, I can add a GitHub Action to run `npm run build` on push and report failing builds.
# SHIINIME ID API

Production-ready REST API proxy built with Next.js 15, TypeScript, App Router, Axios, and Vercel support.

## Base URL

https://shiinime-id.vercel.app/api/

## Available Routes

### Anime
- GET /api/anime/home
- GET /api/anime/schedule
- GET /api/anime/detail/[slug]
- GET /api/anime/episode/[slug]
- GET /api/anime/search?q=keyword
- GET /api/anime/ongoing?page=1
- GET /api/anime/complete?page=1
- GET /api/anime/genre
- GET /api/anime/genre/[genre]?page=1
- GET /api/anime/batch/[slug]
- GET /api/anime/server/[id]
- GET /api/anime/unlimited

### Nekopoi
- GET /api/nekopoi/home
- GET /api/nekopoi/search?q=keyword
- GET /api/nekopoi/detail/[slug]
- GET /api/nekopoi/episode/[slug]
- GET /api/nekopoi/list?page=1
- GET /api/nekopoi/latest-jav?page=1

## Response Format

Success:
```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

Error:
```json
{
  "success": false,
  "message": "Error",
  "error": "...",
  "data": null
}
```

## Deployment

Deploy to Vercel with the default settings.
