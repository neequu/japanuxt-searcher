import Stripe from 'stripe'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

const config = useRuntimeConfig()
const stripe = new Stripe(config.private.stripeSecretKey)
const baseURL = config.public.baseURL
const priceKey = 'price_1OC2EXIPqGxQGtrU8304lx5o'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user)
    throw new Error('not auth')

  const body = await readBody(event)
  const reqUrl = decodeURIComponent(body.reqUrl)
  const price = await stripe.prices.retrieve(priceKey)

  try {
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          quantity: 1,
          price: price.id,
        },
      ],
      mode: 'subscription',
      success_url: reqUrl,
      cancel_url: `${baseURL}/`,
      customer: user.id,
    })

    return { url: session.url, user }
  }
  catch (e: any) {
  }
})
