import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/supabase'

export default eventHandler(async (event) => {
  try {
    const user = await serverSupabaseUser(event)

    if (!user)
      throw new Error('not auth')

    const supabase = await serverSupabaseClient<Database>(event)
    const { lvl, word } = await readBody(event)
    if (!word)
      throw new Error('no params')
    const decodedWord = decodeURIComponent(word)

    const { error } = await supabase.from('user_words')
      .update({ strength: lvl })
      .eq('word', decodedWord)
      .eq('user_id', user.id)

    if (error)
      throw new Error(error.message)
  }
  catch (e) {
    // throw createError({
    // statusCode:
    // })
  }
})
