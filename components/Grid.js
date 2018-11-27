import styled from 'styled-components'

/**
 * @see https://medium.com/styled-components/how-to-create-responsive-ui-with-styled-components-c6b71a3ce172
 */
const Row = styled.div`
  &::after {
    content: '';
    clear: both;
    display: table;
  }
`

const Column = styled.div`
  float: left;
  width: 100%;

  @media only screen and (min-width: 768px) {
    width: ${props => (props.span ? props.span / 12 * 100 : 8.33)}%;
  }
`

export { Row, Column }
