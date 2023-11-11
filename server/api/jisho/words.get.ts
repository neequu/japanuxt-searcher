import type { JapaneseWord } from '~/types'

const JISHO_API_URL = 'https://jisho.org/api/v1/search/words'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    const { data }: { data: JapaneseWord[] } = await $fetch(JISHO_API_URL, {
      query: {
        keyword: query.query,
        page: query.page,
      },
    })
    return data
  }
  catch (e: any) {
  }
})
