import Head from 'next/head'
import React from 'react'
import PropTypes from 'prop-types'
import styled, { createGlobalStyle } from 'styled-components'
import Container from '../components/Container'

const GlobalStyle = createGlobalStyle`
  html {
    font-family: Arial, sans;
  }
`

const Footer = styled.footer`
  margin-top: 30px;
  padding: 10px;
  background-color: #dedede;
`

const Layout = (props) => (
  <Container>
    <GlobalStyle />
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel='shortcut icon' type='image/x-icon' href='/assets/favicon.ico' />
    </Head>
    {props.children}
    <Footer>
      <strong>Credits</strong> Data: <a href="https://swapi.co" target="_new">swapi.co</a> - Images: <a href="https://starwars.wikia.com" target="_new">starwars.wikia.com</a>
    </Footer>
  </Container>
)

Layout.propTypes = {
  children: PropTypes.any
}
export default Layout
