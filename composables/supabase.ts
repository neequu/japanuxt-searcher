import type { Database } from '~/supabase'

export async function findWord(word: string): Promise<{ data: Ref<Database['public']['Tables']['user_words']['Row']> }> {
  return useFetch(`/api/supabase/user-words/${word}`, {
    key: 'word',
    getCachedData(key) {
      return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key]
    },
  })
}

export async function getUserWords(): Promise<{ data: Ref<Database['public']['Tables']['user_words']['Row'][]> }> {
  return useFetch(`/api/supabase/user-words`, {
    key: 'userWords',
    getCachedData(key) {
      return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key]
    },
  })
}

export async function saveWord(word: string) {
  return $fetch(`/api/supabase/user-words/${word}`, { method: 'post' })
}
export async function deleteWord(word: string, id: number) {
  return $fetch(`/api/supabase/user-words/${word}`, {
  // @ts-expect-error nuxt's ts problem
    method: 'delete',
    body: { id },
  })
}
