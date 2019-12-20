import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { Container, Logo, Nav, CustomLink, Profile, LogOut } from './styles'
import logo from '~/assets/header_logo.svg'
import { signOut } from '~/store/modules/auth/actions'

function Header({ location }) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.profile)

  return (
    <Container>
      <Logo>
        <img src={logo} alt="GymPoint" />
        <h1>GYMPOINT</h1>
      </Logo>
      <Nav>
        <ul>
          <li>
            <CustomLink
              selected={location.pathname === '/students/list'}
              to="/students/list">
              ALUNOS
            </CustomLink>
          </li>
          <li>
            <CustomLink
              selected={location.pathname === '/plans/list'}
              to="/plans/list">
              PLANOS
            </CustomLink>
          </li>
          <li>
            <CustomLink
              selected={location.pathname === '/enrollments/list'}
              to="/enrollments/list">
              MATRÍCULAS
            </CustomLink>
          </li>
          <li>
            <CustomLink
              selected={location.pathname === '/help-orders/list'}
              to="/help-orders/list">
              PEDIDOS DE AUXÍLIO
            </CustomLink>
          </li>
          <li />
        </ul>
      </Nav>
      <Profile>
        <strong>{user.name}</strong>
        <LogOut type="button" onClick={() => dispatch(signOut())}>
          sair do sistema
        </LogOut>
      </Profile>
    </Container>
  )
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default withRouter(Header)
