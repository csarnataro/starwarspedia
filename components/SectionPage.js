import PropTypes from 'prop-types'
import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout'
import MainContentList from '../components/MainContentList'
import SectionList from '../components/SectionList'
import getConfig from 'next/config'
import { PageTitle } from '../components/Typography'

const { publicRuntimeConfig } = getConfig()

const page = (sectionName, titleField) => {
  const Page = ({ content }) =>
    <Layout>
      <PageTitle>{sectionName}</PageTitle>
      <MainContentList content={content} contentType={sectionName} titleField={titleField} />
      <SectionList current={sectionName} />
    </Layout>

  Page.getInitialProps = async ({ req, query }) => {
    const url = `http://${publicRuntimeConfig.serverName}:${publicRuntimeConfig.portNumber}/api/${sectionName}/`
    console.log('************ BEGIN: Page 22 ************')
    console.dir(url, { colors: true, depth: 16 })
    console.log('************ END:   Page 22 ************')
    const contentReq = await fetch(url)
    const content = await contentReq.json()
    return { content }
  }

  Page.propTypes = {
    content: PropTypes.array.isRequired,
    titleField: PropTypes.string.isRequired
  }

  return Page
}

export default page
