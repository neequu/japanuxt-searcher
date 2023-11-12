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
      return
      // throw new Error('no params')
    const decodedWord = decodeURIComponent(word)

    const { error } = await supabase.from('user_words').insert({
      user_id: user?.id,
      word: decodedWord,
    })
    if (error)
      throw new Error(error.message)
  }
  catch (e) {

  }
})