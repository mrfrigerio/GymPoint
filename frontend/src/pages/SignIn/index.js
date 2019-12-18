import React from 'react'
import { Form, Input } from '@rocketseat/unform'
import logo from '~/assets/gympoint_logo.svg'

export default function EnrollmentEdit() {
  function handleSubmit(data) {
    console.log(data)
  }
  return (
    <>
      <img src={logo} alt="GymPoint" />
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">SEU E-MAIL</label>
        <Input name="email" id="email" placeholder="exemplo@email.com" />
        <label htmlFor="password">SUA SENHA</label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="*********"
        />
        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  )
}
