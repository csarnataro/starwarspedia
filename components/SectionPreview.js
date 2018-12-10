import React from 'react'
import PropTypes from 'prop-types'
import getConfig from 'next/config'
import { Title } from '../components/Typography'
import WikiaLazyLoadImage from '../components/WikiaLazyLoadImage'

const { publicRuntimeConfig } = getConfig()

const SectionPreview = ({ sectionId }) => {
  return (
    <React.Fragment>
      <WikiaLazyLoadImage src={
        `${publicRuntimeConfig.publicServerName}/api/pics/section/${sectionId}/thumb/`
      } />
      <Title>
        See all: {sectionId}
      </Title>
    </React.Fragment>
  )
}

SectionPreview.propTypes = {
  sectionId: PropTypes.string.isRequired
}

export default SectionPreview
