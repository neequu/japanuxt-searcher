import { LRUCache } from 'lru-cache'
import { hash as ohash } from 'ohash'

// import type { Database } from '~/supabase'

const cache = new LRUCache<string, any>({
  max: 500,
  ttl: 8000 * 60 * 60, // 8 hours
})

// async function _fetchDB(url: string, params?: any) {
//   return useFetch(url, { params })
// }

// export function fetchDB(url: string, params?: any): Promise<any> {
//   const hash = ohash([url])
//   const noCache = !cache.has(hash)
//   if (noCache) {
//     cache.set(
//       hash,
//       _fetchDB(url, params)
//         .catch((e) => {
//           cache.delete(hash)
//           throw e
//         }),
//     )
//   }
//   return cache.get(hash)
// }

export async function findWord(word: string): Promise<any> {
  const hash = ohash([word])
  const noCache = !cache.has(hash)
  if (noCache) {
    cache.set(
      hash,
      useFetch(`/api/supabase/user-words/${word}`)
        .catch((e) => {
          cache.delete(hash)
          throw e
        }),
    )
  }
  return cache.get(hash)
}

export async function saveWord(word: string) {
  return $fetch(`/api/supabase/user-words/${word}`, { method: 'post' })
}

export async function deleteWord(word: string) {
  return $fetch(`/api/supabase/user-words/${word}`, { method: 'delete' })
}
