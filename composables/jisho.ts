import type { JapaneseWord } from '~/types'

export async function searchDictionary(query: string, page = 1): Promise<JapaneseWord[]> {
  const { data } = await $fetch('/api/jisho/jisho', {
    query: {
      q: query,
      page,
    },
  })
  return data
}
