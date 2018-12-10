import App, { Container } from 'next/app'
import React from 'react'
import jsCookie from 'js-cookie'
import { FeatureToggles } from '@paralleldrive/react-feature-toggles'

export default class SWApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    const requestFeatures = (ctx.req && ctx.req.query) ? ctx.req.query.feat : ''
    const cookieFeatures = ctx.cookie ? ctx.cookie.feat : jsCookie.get('feat') || ''
    const features = requestFeatures.split(',').concat(cookieFeatures.split(','))

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
          <h1>Features: {features}</h1>
          <Component {...pageProps} />
        </Container>
      </FeatureToggles>
    )
  }
}
