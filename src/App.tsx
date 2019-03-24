import * as React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { AnimatedMapAndTitles } from './components/AnimatedMapAndTitles'

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Main>
          <AnimatedMapAndTitles duration={20000} />
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
  background: hsl(0, 0%, 95%);
`

export default App
