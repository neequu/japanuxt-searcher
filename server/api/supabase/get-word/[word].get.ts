import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/supabase'

export default eventHandler(async (event) => {
  try {
    const user = await serverSupabaseUser(event)
    if (!user)
      throw new Error('not auth')
    const supabase = await serverSupabaseClient<Database>(event)
    const body = await readBody(event)

    const { error } = await supabase.from('user_words').insert({
      user_id: user?.id,
      word: body.word,
    })
    if (error)
      throw new Error(error.message)
  }
  catch (e) {

  }
})
