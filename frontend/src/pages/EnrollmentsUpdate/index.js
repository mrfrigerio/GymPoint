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

export default function EnrollmentsUpdate({ location }) {
  const { enrollment } = location.state

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
    console.tron.log(enrollment)
    async function loadPlans() {
      const response = await api.get('/plans')
      setPlans(response.data)
    }
    async function loadStudents() {
      const response = await api.get('/students')
      setStudents(response.data)
    }
    function loadValues() {
      const studentEl = document.getElementById('student')
      const planEl = document.getElementById('plan')
      const endDateEl = document.getElementById('end_date')
      const totalEl = document.getElementById('total')
      studentEl.value = enrollment.student.name
      studentEl.dataset.item_id = enrollment.student_id
      planEl.dataset.item_id = enrollment.plan_id
      planEl.value = enrollment.plan.title
      endDateEl.value = format(parseISO(enrollment.end_date), 'dd/MM/yyyy')
      totalEl.value = currencyFormatter.format(enrollment.price)
    }
    loadPlans()
    loadStudents()
    loadValues()
  }, [enrollment])

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
      const response = await api.put(`/enrollments/${enrollment.id}`, data)
      const end_date = document.getElementById('end_date')
      const total = document.getElementById('total')

      end_date.value = format(parseISO(response.data.end_date), 'dd/MM/yyyy')
      total.value = currencyFormatter.format(response.data.price)
      toast.success('Matrícula alterada com sucesso!')
    } catch (err) {
      toast.error('Falha na atualização da matrícula, verifique os dados!')
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema}>
        <TopBar>
          <h1>Edição de matrícula</h1>
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
            id="student"
            placeholder="Buscar aluno"
            options={studentsOptions}
          />
          <div>
            <DataList
              label="PLANO"
              name="plan_id"
              id="plan"
              placeholder="Selecione o plano"
              options={plansOptions}
            />
            <label htmlFor="start_date">
              DATA DE INÍCIO
              <DatePicker
                id="start_date"
                name="start_date"
                placeholder="dd/mm/yyyy"
                defaultValue={format(
                  parseISO(enrollment.start_date),
                  'yyyy-MM-dd'
                )}
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
