import React from 'react'
import PropTypes from 'prop-types'
import getConfig from 'next/config'
import { Title } from '../components/Typography'
import WikiaLazyLoadImage from '../components/WikiaLazyLoadImage'

const { publicRuntimeConfig } = getConfig()

const ContentPreview = ({ title }) =>
  <React.Fragment>
    <WikiaLazyLoadImage
      className='content-thumb'
      src={
        `${publicRuntimeConfig.publicServerName}/api/pics/item/${encodeURIComponent(title)}/thumb/`
      } />
    <Title>
      {title}
    </Title>
  </React.Fragment>

ContentPreview.propTypes = {
  title: PropTypes.string.isRequired
}

export default ContentPreview
