import PropTypes from 'prop-types'
import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout'
import MainContentList from '../components/MainContentList'
import getConfig from 'next/config'
import { PageTitle } from '../components/Typography'

const { publicRuntimeConfig } = getConfig()

class Page extends React.Component {
  static displayName = 'FilmsPage'

  static async getInitialProps (ctx) {
    // console.log('************ BEGIN: films 15 ************')
    // console.dir(ctx, { colors: true, depth: 16 })
    // console.log('************ END:   films 15 ************')
    const url = `${publicRuntimeConfig.publicServerName}/api/films/`
    const contentReq = await fetch(url)
    const content = await contentReq.json()
    return { content }
  }

  render () {
    const { content } = this.props
    return (<Layout>
      <PageTitle>Filmi</PageTitle>
      <MainContentList content={content} contentType={'films'} titleField={'title'} />
    </Layout>
    )
  }
}

Page.propTypes = {
  content: PropTypes.array.isRequired
}

export default Page
