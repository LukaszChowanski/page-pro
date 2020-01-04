import React from 'react'
import { ThemeProvider } from 'styled-components'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import GlobalStyle from './GlobalStyle'
import theme from './mainTheme'
import NowyLoader from './Loader/NowyLoader'
import Error from './Error/Error'

const MainTemplate = ({ error, children, isLoaded }) => (
  <div>
    <GlobalStyle />
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
    {error !== '' ? null : <Error error={error} />}
    <CSSTransition in={!isLoaded} timeout={400} classNames="fade" unmountOnExit>
      <NowyLoader />
    </CSSTransition>
  </div>
)
MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
}
const mapStateToProps = state => ({
  isLoaded: state.data.isLoaded,
  error: state.data.error
})
export default connect(mapStateToProps)(MainTemplate)
