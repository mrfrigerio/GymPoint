import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

// import { Container } from './styles';
import AuthLayout from '~/pages/_layouts/auth'
import DefaultLayout from '~/pages/_layouts/default'

export default function TweakedRouter({
  component: Component,
  isPrivate,
  ...rest
}) {
  const signed = useSelector(state => state.auth.signed)

  if (!signed && isPrivate) {
    return <Redirect to="/" />
  }

  if (signed && !isPrivate) {
    return <Redirect to="/students/list" />
  }

  const LayOut = signed ? DefaultLayout : AuthLayout
  return (
    <Route
      {...rest}
      render={props => (
        <LayOut>
          <Component {...props} />
        </LayOut>
      )}
    />
  )
}

TweakedRouter.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isPrivate: PropTypes.bool
}

TweakedRouter.defaultProps = {
  isPrivate: false
}
