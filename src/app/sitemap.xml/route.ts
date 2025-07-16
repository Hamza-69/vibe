import { NextResponse } from 'next/server'

export async function GET() {
  // TODO: Replace with real project IDs from your database
  const projectIds = ['example-project-1', 'example-project-2']

  const baseUrl = 'https://vibable.xyz'
  const staticRoutes = [
    '',
    '/pricing',
  ]
  const dynamicRoutes = projectIds.map(id => `/projects/${id}`)

  const urls = [...staticRoutes, ...dynamicRoutes]
    .map(route =>
      `<url><loc>${baseUrl}${route}</loc></url>`
    )
    .join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
} 