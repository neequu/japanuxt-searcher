const JISHO_API_URL = 'https://jisho.org/api/v1/search/words'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const decodedWord = decodeURIComponent(query.query as string)
  try {
    const { data }: any = await $fetch(JISHO_API_URL, {
      query: {
        keyword: decodedWord,
        page: query.page,
      },
    })
    return data
  }
  catch (e: any) {
    return e
  }
})
