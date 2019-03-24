import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string

    colors: {
      main: string
      secondary: string
    }

    fonts: {
      sans: {
        regular: string,
        medium: string
      }
      serif: string
    }
  }
}
