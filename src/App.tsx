import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from './theme'

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Main>Hello</Main>
      </ThemeProvider>
    )
  }
}

const Main = styled.main`
  background: ${props => props.theme.colors.main};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

export default App
