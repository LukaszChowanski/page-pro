import React from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../GlobalStyle'
import theme from '../mainTheme'

type Props = {
  children: React.ReactNode
}
const MainTemplate = ({ children }: Props): React.ReactElement => (
  <div>
    <GlobalStyle />
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </div>
)
export default MainTemplate
