import React from 'react'
import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types'
import getConfig from 'next/config'
import Layout from '../../components/Layout'
import { Column, Row } from '../../components/Grid'

const { publicRuntimeConfig } = getConfig()

const Page = ({ character, id }) =>
  <Layout>
    <Row>
      <Column span={12}>
        Name: {character.name}
      </Column>
    </Row>
  </Layout>

Page.getInitialProps = async ({ query }) => {
  const characterReq = await fetch(
    `${publicRuntimeConfig.publicServerName}/api/people/${query.id}/`
  )
  const character = await characterReq.json()
  return { character, id: query.id }
}

Page.propTypes = {
  character: PropTypes.object,
  id: PropTypes.any
}

export default Page
