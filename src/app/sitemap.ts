import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `https://bookmarkx-c53b200cd6d8.herokuapp.com`,
      lastModified: new Date(),
    },
    {
      url: `https://bookmarkx-c53b200cd6d8.herokuapp.com/account`,
      lastModified: new Date(),
    },
    {
      url: `https://bookmarkx-c53b200cd6d8.herokuapp.com/terms`,
      lastModified: new Date(),
    },
    {
      url: `https://bookmarkx-c53b200cd6d8.herokuapp.com/privacy`,
      lastModified: new Date(),
    },
  ]
}
