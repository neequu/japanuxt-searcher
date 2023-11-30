import type { Database } from '~/supabase'

export async function findWord(word: string): Promise<any> {
  return useFetch(`/api/supabase/user-words/${word}`, {
    key: 'word',
    // getCachedData(key) {
    //   return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key]
    // },
  })
}

export async function getUserWords(): Promise<any> {
  return useFetch(`/api/supabase/user-words`, {
    key: 'userWords',
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
