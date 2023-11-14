import Stripe from 'stripe'
import { serverSupabaseUser } from '#supabase/server'

// import type { Database } from '~/supabase'

const priceKey = 'price_1OC2EXIPqGxQGtrU8304lx5o'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user)
    throw new Error('not auth')

  const config = useRuntimeConfig()
  if (!config.private.stripeSecretKey)
    throw new Error('stripe key not set')

  const stripe = new Stripe(config.private.stripeSecretKey)

  const price = await stripe.prices.retrieve(priceKey)
  // const supabase = await serverSupabaseClient<Database>(event)

  // await sendRedirect(event, url)

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price: price.id,
        },
      ],
      mode: 'subscription',
      success_url: `${config.public.baseURL}`,
      cancel_url: `${config.public.baseURL}/learn`,
    })

    if (!session)
      throw new Error('error subs')

    return { url: session.url, sessionId: session.id }
  }
  catch (e: any) {
    // console.log(e.message)
  }
})
