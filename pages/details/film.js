import React from 'react'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import PropTypes from 'prop-types'
import Layout from '../../components/Layout'
import { Column, Row } from '../../components/Grid'
import WikiaLazyLoadImage from '../../components/WikiaLazyLoadImage'
import { Title } from '../../components/Typography'
import { DetailItem } from '../../components/DetailItems'

const { publicRuntimeConfig } = getConfig()

const Page = ({ film, id }) =>
  <Layout>
    <Row key="abc">
      <Column span="4">
        <WikiaLazyLoadImage src={
          `${publicRuntimeConfig.publicServerName}/api/item/${encodeURI(film.title)}/thumb/`
        } />
      </Column>
      <Column span="8">
        <Title key="1">{film.title}</Title>
        <DetailItem key="2"><strong>Director</strong>: {film.director}</DetailItem>
        <DetailItem key="3"><strong>Producer</strong>: {film.producer}</DetailItem>
      </Column>
    </Row>
    {film.characters
      ? film.characters.map(character =>
        <Row key={`ROW_${character}`}>
          <Column key={`COL_${character}`} span="12">
            {character}
          </Column>
        </Row>
      )
      : ''
    }
  </Layout>

Page.getInitialProps = async ({ query }) => {
  const filmReq = await fetch(
    `${publicRuntimeConfig.publicServerName}/api/films/${query.id}/`
  )
  const film = await filmReq.json()
  return { film, id: query.id }
}

Page.propTypes = {
  film: PropTypes.object,
  id: PropTypes.any
}

export default Page
