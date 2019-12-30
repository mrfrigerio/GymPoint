import React, { useEffect } from 'react'
import { Form, Input } from '@rocketseat/unform'
import { toast } from 'react-toastify'
import api from '~/services/api'

import { Container } from './styles'

export default function HelpOrdersAnswer({ help_order, dismiss }) {
  useEffect(() => {
    window.addEventListener('click', e => {
      if (e.target.tagName === 'DIV') {
        dismiss()
      }
    })
  }, [dismiss])

  async function handleSubmit(data) {
    await api.put(`/help-orders/${help_order.id}/answer`, data)
    toast.success('Pedido de auxílio respondido com sucesso!')
    setTimeout(() => dismiss(help_order.id), 3500)
  }

  return (
    <Container>
      <Form initialData={help_order} onSubmit={handleSubmit}>
        <label htmlFor="question">PERGUNTA DO ALUNO</label>
        <Input multiline name="question" cols="30" disabled />

        <label htmlFor="answer">SUA RESPOSTA </label>
        <Input multiline name="answer" rows="4" />

        <button type="submit">Responder aluno</button>
      </Form>
    </Container>
  )
}
