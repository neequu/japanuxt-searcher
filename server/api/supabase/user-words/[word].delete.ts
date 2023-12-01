import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/supabase'

export default eventHandler(async (event) => {
  try {
    const user = await serverSupabaseUser(event)
    if (!user)
      throw new Error('not auth')

    const supabase = await serverSupabaseClient<Database>(event)
    const { id } = await readBody(event)
    throw new Error('yo')
    const { error } = await supabase
      .from('user_words')
      .delete()
      .eq('user_id', user.id)
      .eq('id', id)

    if (error)
      throw new Error(error.message)

    return { success: true }
  }
  catch (e: any) {
    return { error: 'couldnt delete word' }
  }
})
