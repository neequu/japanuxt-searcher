import { LRUCache } from 'lru-cache'
import { hash as ohash } from 'ohash'
import type { Database } from '~/supabase'

const cache = new LRUCache<string, any>({
  max: 500,
  ttl: 1000 * 60, // 8 mins
})

async function _fetchDB(url: string, params?: any) {
  return $fetch(url, { params })
}

export function fetchDB(url: string, params?: any): Promise<any> {
  const hash = ohash([url])
  const noCache = !cache.has(hash)
  if (noCache) {
    cache.set(
      hash,
      _fetchDB(url, params)
        .catch((e) => {
          cache.delete(hash)
          throw e
        }),
    )
  }
  return cache.get(hash)
}

export async function findWord(word: string): Promise<any> {
  return fetchDB(`/api/supabase/user-words/${word}`)
}

export async function getUserWords(): Promise<any> {
  // return fetchDB(`/api/supabase/user-words`)
  // return useFetch(`/api/supabase/user-words`)
  // return useAsyncData('users', () => fetchDB(`/api/supabase/user-words`))
  return useFetch(`/api/supabase/user-words`, {
    getCachedData(key) {
      return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key]
    },
  })
}

export async function saveWord(word: string) {
  return $fetch(`/api/supabase/user-words/${word}`, { method: 'post' })
}
export async function deleteWord(word: string) {
  // @ts-expect-error check docs
  return $fetch(`/api/supabase/user-words/${word}`, { method: 'delete' })
}
