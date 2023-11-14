import type { Stripe } from '@stripe/stripe-js'
import { loadStripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>
const config = useRuntimeConfig()

export function getStripe() {
  if (!stripePromise)
    stripePromise = loadStripe(config.public.stripePubKey)

  return stripePromise
}
