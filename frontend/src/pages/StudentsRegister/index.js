import React from 'react'
import { Form, Input } from '@rocketseat/unform'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { MdCheck } from 'react-icons/md'
import { IoIosArrowBack } from 'react-icons/io'
import api from '~/services/api'
import history from '~/services/history'
import { Container, TopBar, InputsContainer } from './styles'

// import { Container } from './styles';

export default function StudentsRegister() {
  const schema = Yup.object().shape({
    name: Yup.string().required(
      'O nome do aluno é de preenchimento obrigatório'
    ),
    email: Yup.string()
      .email('Digite um endereço de email válido')
      .required('O email é de preenchimento obrigatório'),
    age: Yup.mixed()
      .transform(v => (v === '' ? null : v))
      .test(
        'isnumber',
        'Insira uma idade válida',
        v => Number.isInteger(v) || v === null
      )
      .nullable(true),
    weight: Yup.mixed()
      .transform(v => (v === '' ? null : v))
      .test(
        'isnumber',
        'Insira um peso válido',
        v => Number.isInteger(v) || v === null
      )
      .nullable(true),
    height: Yup.mixed()
      .transform(v => (v === '' ? null : v))
      .test(
        'isnumber',
        'Insira uma altura válida',
        v => Number.isInteger(v) || v === null
      )
      .nullable(true)
  })
  function handleSubmit(data) {
    console.tron.log(data)
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema}>
        <TopBar>
          <h1>Cadastro de aluno</h1>
          <div id="actions">
            <button
              type="button"
              onClick={() => history.push('/students/list')}>
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
          <label htmlFor="name">
            NOME COMPLETO
            <Input id="name" name="name" />
          </label>
          <label htmlFor="name">
            ENDEREÇO DE E-MAIL
            <Input id="email" name="email" />
          </label>
          <div>
            <label htmlFor="name">
              IDADE
              <Input id="age" name="age" />
            </label>
            <label htmlFor="name">
              PESO (em kg)
              <Input id="weight" name="weight" />
            </label>
            <label htmlFor="name">
              ALTURA
              <Input id="height" name="height" />
            </label>
          </div>
        </InputsContainer>
      </Form>
    </Container>
  )
}
