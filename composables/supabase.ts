import { LRUCache } from 'lru-cache'
import { hash as ohash } from 'ohash'

const cache = new LRUCache<string, any>({
  max: 500,
  ttl: 8000 * 60 * 60, // 8 hours
})

function _fetchData(url: string, params?: any) {
  return $fetch(url, { params })
}

export function fetchData(url: string, params?: any): Promise<any> {
  const hash = ohash([url])
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
  return cache.get(hash)
}

export async function findWord(word: string) {
  return fetchData(`/api/supabase/user-words/${word}`)
}

export async function saveWord(word: string) {
  return $fetch(`/api/supabase/user-words/${word}`, { method: 'post' })
}
