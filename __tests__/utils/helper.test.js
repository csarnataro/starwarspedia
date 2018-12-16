const { id } = require('../../utils/helper')

describe('id', () => {
  it('should return a valid id with trailing slash', () => {
    const url = 'https://server/api/films/4/'
    expect(id(url)).toBe('4')
  })
  it('should return a valid id without trailing slash', () => {
    const url = 'https://server/api/films/5'
    expect(id(url)).toBe('5')
  })

  it('should return a valid id (multiple digits) with trailing slash', () => {
    const url = 'https://server/api/films/456/'
    expect(id(url)).toBe('456')
  })
  it('should return a valid id (multiple digits) without trailing slash', () => {
    const url = 'https://server/api/films/567'
    expect(id(url)).toBe('567')
  })
})
