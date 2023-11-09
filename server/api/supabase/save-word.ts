import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default eventHandler(async (event) => {
  const supabase: any = await serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)

  const data = await supabase.from('user_words').insert({
    user_id: user?.id,
    word: 'hellzo',
    last_reviewed: null,
    strength: 'easy',
    reviews: [],
  })
  console.log(data)
})
