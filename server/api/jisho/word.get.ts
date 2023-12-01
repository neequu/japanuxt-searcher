export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    const data: any = await $fetch(`/api/jisho/words`, {
      query: {
        query: query.query,
        page: 1,
      },
    })
    return data[0]
  }
  catch (e: any) {
    return { error: e.message || `Coulnd't get words` }
  }
})
