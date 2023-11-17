import Stripe from 'stripe'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/supabase'

// import {getSubscribeUrl} from 'strip'
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
  const customer = await stripe.customers.create({ email: user.email })
  const supabase = await serverSupabaseClient<Database>(event)
  const { error } = await supabase.from('customers').upsert({ id: user.id, stripe_customer_id: customer.id })

  if (error)
    throw new Error(error.message)

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      line_items: [
        {
          quantity: 1,
          price: price.id,
        },
      ],
      mode: 'subscription',
      success_url: `${config.public.baseURL}/`,
      cancel_url: `${config.public.baseURL}/`,
      customer: customer.id,
    })

    if (!session.url)
      throw new Error('no session')

    return { url: session.url, session }
  }
  catch (e: any) {
    console.log(e.message)
  }
})
