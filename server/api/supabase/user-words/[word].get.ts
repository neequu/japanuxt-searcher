import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/supabase'

export default eventHandler(async (event) => {
  try {
    const user = await serverSupabaseUser(event)

    if (!user)
      throw new Error('not auth')

    const supabase = await serverSupabaseClient<Database>(event)
    const word = getRouterParam(event, 'word')
    if (!word)
      throw new Error('no params')
    const decodedWord = decodeURIComponent(word)

    const { data: wordData, error } = await supabase.from('user_words')
      .select()
      .eq('word', decodedWord)
      .eq('user_id', user.id)
      .maybeSingle()

    if (error)
      throw new Error(error.message)

    return wordData || null
  }
  catch (e) {
    // throw createError({
    // statusCode:
    // })
  }
})
