import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase'

export default eventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient<Database>(event)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user)
      throw new Error('You need to login first!')

    const { data: wordData, error } = await supabase.from('user_words')
      .select()
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })

    if (error)
      throw new Error(error.message)

    return wordData
  }
  catch (e: any) {
    return { error: e.message || `Coulnd't get words` }
  }
})
