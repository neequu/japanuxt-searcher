import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase'

export default eventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient<Database>(event)
    const { data: { session } } = await supabase.auth.getSession()
    // const user = await serverSupabaseUser(event)
    if (!session?.user)
      throw new Error('You need to login first!')

    const { id } = await readBody(event)

    const { error } = await supabase
      .from('user_words')
      .delete()
      .eq('user_id', session.user.id)
      .eq('id', id)

    if (error)
      throw new Error(error.message)

    return { success: true }
  }
  catch (e: any) {
    return { error: e.message || `Coulnd't delete word` }
  }
})
