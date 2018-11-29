
import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'
import sections from '../common/sections'
import { Column, Row } from '../components/Grid'
import SectionPreview from './SectionPreview'
import { Title } from './Typography';

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
                  href={`/${section}/`}
                >
                  {/* eslint-disable jsx-a11y/anchor-is-valid */}
                  <a>
                    <SectionPreview sectionId={section} key={section} />
                  </a>
                  {/* eslint-enable jsx-a11y/anchor-is-valid */}
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
