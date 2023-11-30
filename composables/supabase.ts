import type { Database } from '~/supabase'

export async function findWord(word: string): Promise<any> {
  return useFetch(`/api/supabase/user-words/${word}`, { getCachedData(key) {
    return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key]
  } })
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
  return useFetch(`/api/supabase/user-words/${word}`, { method: 'post' })
}
export async function deleteWord(word: string) {
  return fetch(`/api/supabase/user-words/${word}`, { method: 'delete' })
}
