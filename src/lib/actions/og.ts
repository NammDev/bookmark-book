'use server'

import { parse } from 'node-html-parser'
import { MetaTags } from '@/types/data'
import { setImagePath } from '../utils'

export async function getOg(url: string) {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'bmrk.cc Bot' },
    })
    const html = await response.text()
    let metatags: MetaTags
    if (!html) {
      metatags = { title: url, description: '', image: '' }
    } else {
      metatags = extractMetaTags(html, url)
    }
    return metatags
  } catch (error) {
    console.error(error)
  }
}

const allowedTags = [
  'title',
  'og:title',
  'twitter:title',
  'description',
  'og:description',
  'twitter:description',
  'og:image',
  'twitter:image',
  'icon',
  'apple-touch-icon',
  'shortcut icon',
]

function extractMetaTags(html: string, url: string) {
  const root = parse(html)
  const objectMap: { [key: string]: string } = {}

  // Extract all meta tags
  root.querySelectorAll('meta').forEach(({ attributes }) => {
    const property = attributes.property || attributes.name || attributes.href
    if (!objectMap[property] && allowedTags.includes(property)) {
      objectMap[property] = attributes.content
    }
  })

  // Extract all link tags
  root.querySelectorAll('link').forEach(({ attributes }) => {
    const { rel, href } = attributes
    if (rel && href && allowedTags.includes(rel)) {
      objectMap[rel] = href
    }
  })

  const title =
    objectMap['og:title'] ||
    objectMap['twitter:title'] ||
    root.querySelector('title')?.innerText ||
    url

  const description = objectMap['og:description'] || objectMap['description'] || ''

  const imageSrc =
    objectMap['og:image'] ||
    objectMap['twitter:image'] ||
    objectMap['apple-touch-icon'] ||
    objectMap['icon'] ||
    objectMap['shortcut icon']

  const favIconImage =
    objectMap['apple-touch-icon'] || objectMap['icon'] || objectMap['shortcut icon']

  const image = setImagePath(url, imageSrc)

  return {
    title,
    description,
    image,
    ...(image && { is_fallback: imageSrc === favIconImage }),
  } as MetaTags
}
