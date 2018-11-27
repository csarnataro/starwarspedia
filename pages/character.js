import React from 'react'
import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import { Column, Row } from '../components/Grid'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const Page = ({ character, id }) =>
  <Layout>
    <Row>
      <Column>
        Title: {character.title}
      </Column>
    </Row>
  </Layout>

Page.getInitialProps = async ({ query }) => {
  const filmReq = await fetch(
    `http://${publicRuntimeConfig.serverName}:${publicRuntimeConfig.portNumber}/api/people/${query.id}/`
  )
  const film = await filmReq.json()
  return { film, id: query.id }
}

Page.propTypes = {
  character: PropTypes.object,
  id: PropTypes.any
}

export default Page
