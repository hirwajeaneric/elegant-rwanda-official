export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/dashboard/'],
    },
    sitemap: 'https://elegantrwanda.com/sitemap.xml',
  };
}
