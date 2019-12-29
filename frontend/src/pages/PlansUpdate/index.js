import React from 'react'
import { Form, Input } from '@rocketseat/unform'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { MdCheck } from 'react-icons/md'
import { IoIosArrowBack } from 'react-icons/io'
import PropTypes from 'prop-types'
import api from '~/services/api'
import history from '~/services/history'
import currencyFormatter from '~/utils/currencyFormatter'
import { Container, TopBar, InputsContainer } from './styles'

// import { Container } from './styles';

export default function PlansUpdate({ location }) {
  const { plan } = location.state
  plan.total = currencyFormatter.format(plan.price * plan.duration)

  const schema = Yup.object().shape({
    title: Yup.string().required(
      'O título do plano é de preenchimento obrigatório'
    ),
    duration: Yup.mixed()
      .test(
        'isnumber',
        'Insira uma duração válida',
        v => !Number.isNaN(v) || v === null
      )
      .nullable(true),
    price: Yup.mixed()
      .test(
        'isnumber',
        'Insira um preço válido',
        v => !Number.isNaN(v) || v === null
      )
      .nullable(true)
  })
  async function handleSubmit(data) {
    try {
      await api.put(`/plans/${plan.id}`, data)
      toast.success('Plano atualizado com sucesso!')
    } catch (err) {
      toast.error('Falha na atualização, verifique os dados!')
    }
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema} initialData={plan}>
        <TopBar>
          <h1>Cadastro de aluno</h1>
          <div id="actions">
            <button type="button" onClick={() => history.push('/plans/list')}>
              <IoIosArrowBack />
              VOLTAR
            </button>
            <button type="submit">
              <MdCheck />
              SALVAR
            </button>
          </div>
        </TopBar>
        <InputsContainer>
          <label>
            TÍTULO DO PLANO
            <Input id="title" name="title" />
          </label>
          <div>
            <label>
              DURAÇÃO (em meses)
              <Input id="duration" name="duration" />
            </label>
            <label>
              PREÇO MENSAL
              <Input id="price" name="price" />
            </label>
            <label>
              PREÇO TOTAL
              <Input id="total" name="total" disabled />
            </label>
          </div>
        </InputsContainer>
      </Form>
    </Container>
  )
}

PlansUpdate.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      plan: PropTypes.shape({
        id: PropTypes.number,
        price: PropTypes.number,
        duration: PropTypes.number,
        total: PropTypes.number
      })
    })
  }).isRequired
}
