export async function searchDictionary(query: string, page = 1) {
  const { data } = await useFetch(`https://jisho.org/api/v1/search/words?keyword=${query}&page=${page}`)
  return data
}
