import { LRUCache } from 'lru-cache'
import { hash as ohash } from 'ohash'
import type { JapaneseWord } from '~/types'

const cache = new LRUCache<string, any>({
  max: 500,
  ttl: 8000 * 60 * 60, // 8 hours
})

function _fetchData(url: string, params: Record<string, string | number | boolean> = {}) {
  return $fetch(url, { params })
}

export function fetchData(url: string, params: Record<string, string | number | boolean> = {}): Promise<any> {
  const hash = ohash([params.query, params.page])
  const noCache = !cache.has(hash)
  if (noCache) {
    cache.set(
      hash,
      _fetchData(url, params)
        .catch((e) => {
          cache.delete(hash)
          throw e
        }),
    )
  }
  return cache.get(hash)!
}

export function searchDictionary(query: string, page = 1): Promise<JapaneseWord[]> {
  return fetchData('/api/jisho/words', { query, page })
}

export function searchDictionarySingle(query: string, page = 1): Promise<JapaneseWord> {
  return fetchData('/api/jisho/word', { query, page })
}
