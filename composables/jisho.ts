import { LRUCache } from 'lru-cache'
import { hash as ohash } from 'ohash'
import type { JapaneseWord } from '~/types'

const cache = new LRUCache<string, any>({
  max: 500,
  ttl: 2000 * 60 * 60, // 2 hour
})

async function _makeRequest(query: string, page: number) {
  const { data } = await $fetch('/api/jisho/jisho', {
    query: {
      q: query,
      page,
    },
  })
  return data
}

export function searchDictionary(query: string, page = 1): Promise<JapaneseWord[]> | [] {
  if (!query)
    return []
  const hash = ohash([query, page])
  const noCache = !cache.has(hash)

  if (noCache) {
    cache.set(
      hash,
      _makeRequest(query, page)
        .catch((e) => {
          cache.delete(hash)
          throw e
        }),
    )
  }
  return cache.get(hash)!
}
