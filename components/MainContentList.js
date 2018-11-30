
import PropTypes from 'prop-types'
import React from 'react'

import { Column, Row } from '../components/Grid'
import { Link } from '../common/routes'

import { id } from '../utils/helper'
import ContentPreview from './ContentPreview'

class MainContentList extends React.Component {
  render () {
    const { content, contentType, titleField } = this.props
    return (
      <Row>
        {content.map(item =>
          <Column span="3" key={item.url} >
            <Link
              route={`${contentType}-detail`} params={{ id: id(item.url) }}
            >
              {/* eslint-disable jsx-a11y/anchor-is-valid */}
              <a>
                <ContentPreview title={item[titleField]} key={item[titleField]} />
              </a>
              {/* eslint-enable jsx-a11y/anchor-is-valid */}
            </Link>
          </Column>
        )}
      </Row>
    )
  }
}

MainContentList.propTypes = {
  content: PropTypes.array.isRequired,
  contentType: PropTypes.string.isRequired,
  titleField: PropTypes.string.isRequired
}

export default MainContentList
