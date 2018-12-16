
import { Feature } from '@paralleldrive/react-feature-toggles'
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
      <React.Fragment>
        <Row className='row'>
          {content.map(item =>
            <Column className='col' span="3" key={item.url} >
              <Link
                route={`${contentType}-detail`} params={{ id: id(item.url) }}
              >
                <a>
                  <ContentPreview title={item[titleField]} key={item[titleField]} />
                </a>
              </Link>
            </Column>
          )}
        </Row>
        <Feature
          name="faq"
          activeComponent={() => <Row><button>ACTIVE COMPONENT</button></Row>}
        />
      </React.Fragment>
    )
  }
}

MainContentList.propTypes = {
  content: PropTypes.array.isRequired,
  contentType: PropTypes.string.isRequired,
  titleField: PropTypes.string.isRequired
}

export default MainContentList
