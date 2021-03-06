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

export default function PlansRegister() {
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
  async function handleSubmit(data, { resetForm }) {
    try {
      await api.post(`/plans`, data)
      toast.success('Plano cadastrado com sucesso!')
      setInterval(resetForm, 3500)
    } catch (err) {
      toast.error('Falha no cadastro do plano, verifique os dados!')
    }
  }

  function handleChange() {
    const duration = document.getElementById('duration').value
    const price = document.getElementById('price').value
    const total = duration && price ? duration * price : ''
    const elTotal = document.getElementById('total')
    elTotal.value = currencyFormatter.format(total)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema}>
        <TopBar>
          <h1>Cadastro de plano</h1>
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
              <Input id="duration" name="duration" onChange={handleChange} />
            </label>
            <label>
              PREÇO MENSAL
              <Input id="price" name="price" onChange={handleChange} />
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

PlansRegister.propTypes = {
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
