import { Feature } from '@paralleldrive/react-feature-toggles'
import Head from 'next/head'
import React from 'react'
import PropTypes from 'prop-types'
import styled, { createGlobalStyle } from 'styled-components'
import Container from '../components/Container'

const GlobalStyle = createGlobalStyle`
  html {
    font-family: Arial, sans;
  }
  body {
    margin: 0;
  }
`

const Footer = styled.footer`
  margin-top: 30px;
  padding: 10px;
  background-color: #dedede;
`

const Layout = (props) => (
  <React.Fragment>
    <Container>
      <GlobalStyle />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
      </Head>
      {props.children}
    </Container>
    <Footer>
      <strong> Credits</strong>
      {' '} Data: <a href="https://swapi.co" target="_new">swapi.co</a>
      {' '} Images: <a href="https://starwars.wikia.com" target="_new">starwars.wikia.com</a>
      {' '}<Feature>
        {({ features }) =>
          <small>{features}</small>
        }
      </Feature>
    </Footer>
  </React.Fragment>
)

Layout.propTypes = {
  children: PropTypes.any,
  features: PropTypes.string
}
export default Layout
