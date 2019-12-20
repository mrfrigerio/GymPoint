import React from 'react'
import { useDispatch } from 'react-redux'
import { MdEmail, MdLock } from 'react-icons/md'
import { IoMdCloseCircle } from 'react-icons/io'
import { Form, Input } from '@rocketseat/unform'
import * as Yup from 'yup'
import { InputGroup } from './styles'
import logo from '~/assets/gympoint_logo.svg'
import { signInRequest } from '~/store/modules/auth/actions'

export default function SignIn() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um email válido')
      .required('O email é obrigatório'),
    password: Yup.string()
      .min(6, 'Insira uma senha com o mínimo de 6 caracteres')
      .required('A senha é obrigatória')
  })
  const dispatch = useDispatch()
  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password))
  }

  function handleChange(e) {
    if (e.target.value) {
      e.target.classList.add('fill')
    } else {
      e.target.classList.remove('fill')
    }
  }

  function handleClean(element) {
    const input = document.getElementById(element)
    input.value = ''
    input.classList.remove('fill')
    input.focus()
  }

  return (
    <>
      <img src={logo} alt="GymPoint" />
      <Form onSubmit={handleSubmit} schema={schema}>
        <label htmlFor="email">SEU E-MAIL</label>
        <InputGroup>
          <Input
            id="email"
            name="email"
            placeholder="exemplo@email.com"
            onChange={handleChange}
          />
          <MdEmail className="icon" size={16} />
          <button
            tabIndex="-1"
            className="clean-button"
            type="button"
            onClick={() => handleClean('email')}>
            <IoMdCloseCircle className="clean" size={12} />
          </button>
        </InputGroup>
        <label htmlFor="password">SUA SENHA</label>
        <InputGroup>
          <Input
            id="password"
            tabIndex="0"
            type="password"
            name="password"
            placeholder="*********"
            onChange={handleChange}
          />
          <MdLock className="icon" size={16} />
          <button
            tabIndex="-1"
            className="clean-button"
            type="button"
            onClick={() => handleClean('password')}>
            <IoMdCloseCircle className="clean" size={12} />
          </button>
        </InputGroup>
        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  )
}
