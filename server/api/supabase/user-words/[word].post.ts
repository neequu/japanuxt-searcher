import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase'

export default eventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient<Database>(event)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user)
      throw new Error('You need to login first!')

    const word = getRouterParam(event, 'word')
    if (!word)
      throw new Error('No word has been passed')

    const decodedWord = decodeURIComponent(word)
    const { error } = await supabase.from('user_words').insert({
      user_id: session.user.id,
      word: decodedWord,
    })

    if (error)
      throw new Error(error.message)

    return { success: true }
  }
  catch (e: any) {
    return { error: e.message || `Coulnd't save word` }
  }
})
