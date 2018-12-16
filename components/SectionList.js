
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from '../common/routes'
import sections from '../common/sections'
import { Column, Row } from '../components/Grid'
import SectionPreview from './SectionPreview'
import { Title } from './Typography'

class SectionList extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Title>Sections</Title>
        <Row>
          {sections
            .filter(section => section !== this.props.current)
            .map(section =>
              <Column span={3} key={`COL_${section}`}>
                <Link
                  route={`/${section}/`}
                >
                  <a>
                    <SectionPreview sectionId={section} key={section} />
                  </a>
                </Link>
              </Column>
            )}
        </Row>
      </React.Fragment>
    )
  }
}

SectionList.propTypes = {
  current: PropTypes.string.isRequired
}

export default SectionList
