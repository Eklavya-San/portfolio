import type { APIRoute } from 'astro';

const pages = [
  { url: '', changefreq: 'weekly', priority: '1.0' },
  { url: 'work/machinewise', changefreq: 'monthly', priority: '0.8' },
  { url: 'work/mqtt-go', changefreq: 'monthly', priority: '0.8' },
  { url: 'work/ctq-extraction', changefreq: 'monthly', priority: '0.8' },
  { url: 'resume', changefreq: 'monthly', priority: '0.7' },
];

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site ? site.origin : 'https://claudya.in';
  const lastmod = new Date().toISOString().split('T')[0];

  const urlsXml = pages
    .map(
      (page) => `  <url>
    <loc>${baseUrl}/${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
