import * as React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { AnimatedMap } from './AnimatedMap'

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Main>
          <AnimatedMap duration={15000} />
        </Main>
      </ThemeProvider>
    )
  }
}

const Main = styled.main`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

export default App
