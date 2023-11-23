import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/supabase'

export default eventHandler(async (event) => {
  try {
    const user = await serverSupabaseUser(event)

    if (!user)
      throw new Error('not auth')

    const supabase = await serverSupabaseClient<Database>(event)

    const { data: wordData, error } = await supabase.from('user_words')
      .select()
      .eq('user_id', user.id)

    if (error)
      throw new Error(error.message)

    return wordData
  }
  catch (e) {
    // throw createError({
    // statusCode:
    // })
  }
})
