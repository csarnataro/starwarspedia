import React from 'react'
import { render, wait } from 'react-testing-library'
import FilmsPage from '../../pages/sections/films'
import 'jest-dom/extend-expect' // for using `toHaveTextContent`

jest.mock('next/config', () => () => ({ publicRuntimeConfig: {
  portNumber: 80,
  publicServerName: `http://localhost`
} }))

jest.mock('isomorphic-unfetch', () => {
  return jest.fn(() => new Promise((resolve, reject) => {
    resolve({
      ok: true,
      status: 200,
      json: () => {
        return {}
      }
    })
  }))
})

const testContent = [
  {
    title: 'film1',
    url: 'https://swapi.co/films/1/'
  },
  {
    title: 'film2',
    url: 'https://swapi.co/films/2/'
  }
]

describe('FilmsPage', () => {
  it('should render', () => {
    const { container } = render(<FilmsPage content={testContent} titleField="title" />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render with 2 items', () => {
    const { container } = render(<FilmsPage content={testContent} titleField="title" />)
    expect(container.querySelectorAll('div.col').length).toBe(testContent.length) // HaveLength(10)
  })

  it('should render with 0 items', () => {
    const content = []
    const { container } = render(<FilmsPage content={content} titleField="title" />)
    expect(container.querySelectorAll('div.col').length).toBe(content.length) // HaveLength(10)
  })

  it('should display an H1 with text "films"', () => {
    const content = []
    const { container } = render(<FilmsPage content={content} titleField="title" />)
    expect(container.querySelectorAll('h1').length).toBe(1)
    expect(container.querySelectorAll('h1')[0]).toHaveTextContent('films')
  })

  it('should display an H2 with text "sections"', () => {
    const content = []
    const { container } = render(<FilmsPage content={content} titleField="title" />)
    expect(container.querySelectorAll('h2').length).toBeGreaterThan(0)
    expect(container.querySelectorAll('h2')[0].textContent.toLowerCase()).toEqual('sections')
  })

  it('should display 2 images', async () => {
    const { container } = render(<FilmsPage content={testContent} titleField="title" />)

    await wait(() => container.querySelectorAll('img.content-thumb'))
    const images = container.querySelectorAll('img.content-thumb')
    expect(images.length).toBe(2)
  })

  it('should display the movie titles', async () => {
    const { container } = render(<FilmsPage content={testContent} titleField="title" />)

    const movieTitles = container.querySelectorAll('.col h2')
    expect(movieTitles.length).toBe(2)
    expect(movieTitles[0].textContent).toBe('film1')
    expect(movieTitles[1].textContent).toBe('film2')
  })
})
