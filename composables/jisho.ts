import { LRUCache } from 'lru-cache'
import { hash as ohash } from 'ohash'
import type { JapaneseWord } from '~/types'

const cache = new LRUCache<string, any>({
  max: 500,
  ttl: 2000 * 60 * 60, // 2 hour
})

async function _fetchData(url: string, params: Record<string, string | number | undefined> = {}) {
  // todo: type this
  const { data } = await $fetch(url, {
    params,
  })
  return data
}

export function fetchData(url: string, params: Record<string, string | number | undefined> = {}): Promise<JapaneseWord[]> | [] {
  const temp = Object.values(params)
  const hash = ohash([...temp])
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

export function searchDictionary(query: string, page: number): Promise<JapaneseWord[]> | [] {
  return fetchData('/api/jisho/jisho', { query, page })
}
