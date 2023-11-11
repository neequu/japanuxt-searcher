import type { JapaneseWord } from '~/types'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    const data: JapaneseWord[] = await $fetch(`/api/jisho/words`, {
      query: {
        query: query.query,
        page: 1,
      },
    })

    return data[0] ?? []
  }
  catch (e: any) {
  }
})
