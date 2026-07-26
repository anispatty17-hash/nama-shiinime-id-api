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
