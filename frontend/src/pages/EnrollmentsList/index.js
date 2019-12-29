import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GoPlus } from 'react-icons/go'
import { parseISO, format } from 'date-fns'
import pt_BR from 'date-fns/locale/pt-BR'
import api from '~/services/api'
import history from '~/services/history'
import { Container, TableContainer, TopBar, ActiveIcon } from './styles'

export default function EnrollmentList() {
  const [enrollments, setEnrollments] = useState([])

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get(`/enrollments`)
      if (response.data) {
        setEnrollments(
          response.data.map(e => {
            e.start_date_formatted = format(
              parseISO(e.start_date),
              "dd' de 'MMMM' de 'yyyy",
              { locale: pt_BR }
            )
            e.end_date_formatted = format(
              parseISO(e.end_date),
              "dd' de 'MMMM' de 'yyyy",
              { locale: pt_BR }
            )
            return e
          })
        )
      }
    }
    loadStudents()
  }, [])

  async function handleDelete(id) {
    const enrollment = enrollments.find(e => e.id === id)

    if (!enrollment) {
      toast.error('Matrícula não encontrada')
      return
    }
    setEnrollments(enrollments.filter(e => e.id !== id))
    await api.delete(`/enrollments/${id}`)
    toast.success('Matrícula excluída com sucesso')
  }

  return (
    <Container>
      <TopBar>
        <h1>Gerenciando matrículas</h1>
        <div id="actions">
          <button
            type="button"
            onClick={() => history.push('/enrollments/register')}>
            <GoPlus />
            CADASTRAR
          </button>
        </div>
      </TopBar>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th align="left">ALUNO</th>
              <th align="center">PLANO</th>
              <th align="center">INÍCIO</th>
              <th align="center">TÉRMINO</th>
              <th align="center">ATIVA</th>
              <th align="center">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map(enrollment => (
              <tr key={enrollment.id}>
                <td>{enrollment.student.name}</td>
                <td align="center">{enrollment.plan.title}</td>
                <td align="center">{enrollment.start_date_formatted}</td>
                <td align="center">{enrollment.end_date_formatted}</td>
                <td align="center">
                  <ActiveIcon active={`${enrollment.active}`} />
                </td>
                <td align="right">
                  <Link
                    to={{
                      pathname: '/enrollments/update',
                      state: { enrollment }
                    }}>
                    editar
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(enrollment.id)}>
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
    </Container>
  )
}
