const JISHO_API_URL = 'https://jisho.org/api/v1/search/words'

export default defineEventHandler(async (event): Promise<any> => {
  const query = getQuery(event)

  try {
    return await $fetch(JISHO_API_URL, {
      query: {
        keyword: query.query,
        page: query.page,
      },
    })
  }
  catch (e: any) {
  }
})
