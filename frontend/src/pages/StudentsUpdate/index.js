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

export default function StudentsUpdate({ location }) {
  const { student } = location.state
  const schema = Yup.object().shape({
    name: Yup.string().required(
      'O nome do aluno é de preenchimento obrigatório'
    ),
    email: Yup.string()
      .email('Digite um endereço de email válido')
      .required('O email é de preenchimento obrigatório'),
    age: Yup.mixed()
      .test(
        'isnumber',
        'Insira uma idade válida',
        v => !Number.isNaN(v) || v === null
      )
      .nullable(true),
    weight: Yup.mixed()
      .test(
        'isnumber',
        'Insira um peso válido',
        v => !Number.isNaN(v) || v === null
      )
      .nullable(true),
    height: Yup.mixed()
      .test(
        'isnumber',
        'Insira uma altura válida',
        v => !Number.isNaN(v) || v === null
      )
      .nullable(true)
  })
  async function handleSubmit(data, { resetForm }) {
    try {
      if (student) {
        await api.put(`/students/${student.id}`, data)
      } else {
        toast.error('id do usuário para edição não fornecido.')
        return
      }
      toast.success('Aluno atualizado com sucesso!')
    } catch (err) {
      toast.error('Falha na atualização, verifique seus dados!')
    }
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema} initialData={student}>
        <TopBar>
          <h1>Edição de aluno</h1>
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
          <label>
            NOME COMPLETO
            <Input id="name" name="name" />
          </label>
          <label>
            ENDEREÇO DE E-MAIL
            <Input id="email" name="email" />
          </label>
          <div>
            <label>
              IDADE
              <Input id="age" name="age" />
            </label>
            <label>
              PESO (em kg)
              <Input id="weight" name="weight" />
            </label>
            <label>
              ALTURA
              <Input id="height" name="height" />
            </label>
          </div>
        </InputsContainer>
      </Form>
    </Container>
  )
}
