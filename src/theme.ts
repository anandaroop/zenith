import { DefaultTheme, css } from 'styled-components'

export const theme: DefaultTheme = {
  borderRadius: '5px',

  colors: {
    main: 'cyan',
    secondary: 'magenta'
  },

  fonts: {
    serif: '"Adobe Garamond W08", serif',
    sans: {
      regular: '"Unica77LLWebRegular", sans-serif',
      medium: '"Unica77LLWebMedium", sans-serif'
    }
  }
}

export const fullScreen = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
