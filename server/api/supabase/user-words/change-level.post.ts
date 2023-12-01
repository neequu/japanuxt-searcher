import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase'
import { getNextReviewDate } from '~/composables/utils'

export default eventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient<Database>(event)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user)
      throw new Error('You need to login first!')

    const { lvl, word } = await readBody(event)
    if (!word)
      throw new Error('no params')
    const decodedWord = decodeURIComponent(word)

    const { error } = await supabase.from('user_words')
      .update({ strength: lvl, last_reviewed: new Date().toISOString(), next_review_date: getNextReviewDate(Date.now(), lvl) })
      .eq('word', decodedWord)
      .eq('user_id', session.user.id)

    if (error)
      throw new Error(error.message)
  }
  catch (e: any) {
    return { error: e.message || `Coulnd't update word level` }
  }
})
