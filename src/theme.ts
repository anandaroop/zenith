import { DefaultTheme, css } from 'styled-components'

export const theme: DefaultTheme = {
  borderRadius: '5px',

  colors: {
    main: 'cyan',
    secondary: 'magenta'
  }
}

export const fullScreen = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
