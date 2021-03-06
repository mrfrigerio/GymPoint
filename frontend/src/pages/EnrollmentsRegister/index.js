import React, { useEffect, useState, useMemo } from 'react'
import { Form, Select } from '@rocketseat/unform'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { MdCheck } from 'react-icons/md'
import { IoIosArrowBack } from 'react-icons/io'
import { format, parseISO } from 'date-fns'
import DatePicker from '~/components/DatePicker'
import DataList from '~/components/DataList'
import api from '~/services/api'
import history from '~/services/history'
import currencyFormatter from '~/utils/currencyFormatter'
import { Container, TopBar, InputsContainer } from './styles'

export default function EnrollmentsRegister() {
  const schema = Yup.object().shape({
    student_id: Yup.string().required('Selecione um aluno da lista'),
    plan_id: Yup.number()
      .required()
      .typeError('Selecione um plano da lista'),
    start_date: Yup.date().required('Selecione a data de início do plano')
  })

  const today = format(new Date(), 'yyyy-MM-dd')
  const [plans, setPlans] = useState([])
  const [students, setStudents] = useState([])

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans')
      setPlans(response.data)
    }
    async function loadStudents() {
      const response = await api.get('/students')
      setStudents(response.data)
    }
    loadPlans()
    loadStudents()
  }, [])

  const plansOptions = useMemo(
    () => plans.map(p => ({ id: p.id, title: p.title })),
    [plans]
  )
  const studentsOptions = useMemo(
    () => students.map(s => ({ id: s.id, title: s.name })),
    [students]
  )

  async function handleSubmit(data) {
    console.tron.log(data)
    try {
      const response = await api.post(
        `/students/${data.student_id}/enrollments`,
        data
      )
      const end_date = document.getElementById('end_date')
      const total = document.getElementById('total')

      end_date.value = format(parseISO(response.data.end_date), 'dd/MM/yyyy')
      total.value = currencyFormatter.format(response.data.price)
      toast.success('Matrícula cadastrada com sucesso!')
    } catch (err) {
      toast.error('Falha no cadastro da matrícula, verifique os dados!')
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema}>
        <TopBar>
          <h1>Cadastro de matrícula</h1>
          <div id="actions">
            <button
              type="button"
              onClick={() => history.push('/enrollments/list')}>
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
          <DataList
            label="ALUNOS"
            name="student_id"
            placeholder="Buscar aluno"
            options={studentsOptions}
          />
          <div>
            <label htmlFor="plan">
              PLANO
              <Select
                id="plan"
                name="plan_id"
                placeholder="Selecione o plano"
                options={plansOptions}
              />
            </label>
            <label htmlFor="start_date">
              DATA DE INÍCIO
              <DatePicker
                id="start_date"
                name="start_date"
                placeholder="dd/mm/yyyy"
                defaultValue={today}
                min={today}
              />
            </label>
            <label>
              DATA DE TÉRMINO
              <input id="end_date" disabled />
            </label>
            <label>
              VALOR FINAL
              <input id="total" disabled />
            </label>
          </div>
        </InputsContainer>
      </Form>
    </Container>
  )
}
