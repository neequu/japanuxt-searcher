import Stripe from 'stripe'

const config = useRuntimeConfig()
export const stripe = new Stripe(
  config.private.stripeSecretKey,
  {
    apiVersion: '2023-10-16',
    appInfo: { name: 'nequjp', version: '0.1.0' },

  },
)
