import App, { Container } from 'next/app'
import React from 'react'
import jsCookie from 'js-cookie'
import { parseCookies } from 'nookies'
import { FeatureToggles } from '@paralleldrive/react-feature-toggles'

export default class SWApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    const requestFeatures = (ctx.req && ctx.req.query)
      ? (ctx.req.query.feat !== 'clear'
        ? ctx.req.query.feat
        : '')
      : ''

    const cookies = parseCookies(ctx)
    const cookieFeatures = cookies.feat ? cookies.feat : jsCookie.get('feat') || ''

    const requestFeaturesArray = requestFeatures
      ? requestFeatures.split(',')
      : []

    const cookieFeaturesArray = cookieFeatures
      ? cookieFeatures.split(',')
      : []

    const features = [...new Set([...requestFeaturesArray, ...cookieFeaturesArray])]
    return {
      pageProps,
      features
    }
  }

  render () {
    const { Component, pageProps, features } = this.props

    return (
      <FeatureToggles features={features}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </FeatureToggles>
    )
  }
}
