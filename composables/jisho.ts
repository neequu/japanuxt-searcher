import type { JapaneseWord } from '~/types'

export function searchDictionary(query: string, page = 1): Promise<any> {
  return useFetch('/api/jisho/words', { query: { query, page }, getCachedData(key) {
    return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key]
  } })
}

export function searchDictionarySingle(query: string, page = 1): Promise<any> {
  return useFetch('/api/jisho/word', { query: { query, page }, getCachedData(key) {
    return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key]
  } })
}
