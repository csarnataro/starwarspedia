import styled from 'styled-components'

const Container = styled.div`
  width:100%;
  max-width:768px;
  padding-left:32px;
  padding-right:32px;
  -webkit-box-sizing:border-box;
  -moz-box-sizing:border-box;
  box-sizing:border-box;
  margin-left:auto;
  margin-right:auto;

  @media (max-width: 767px){
    padding-left:20px;
    padding-right:20px
  }
`
export default Container
