import { MetadataRoute } from 'next'
import { SITE_URL } from '@/constants/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString()

  return [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
