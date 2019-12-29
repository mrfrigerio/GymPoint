import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GoPlus } from 'react-icons/go'
import api from '~/services/api'
import history from '~/services/history'
import currencyFormatter from '~/utils/currencyFormatter'
import { Container, TableContainer, TopBar } from './styles'

export default function PlansList() {
  const [plans, setPlans] = useState([])

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans')
      if (response.data) {
        setPlans(
          response.data.map(p => {
            p.priceFormatted = currencyFormatter.format(p.price)
            return p
          })
        )
      }
    }
    loadPlans()
  }, [])

  async function handleDelete(id) {
    const plan = plans.find(p => p.id === id)

    if (!plan) {
      toast.error('Plano não encontrado')
      return
    }
    setPlans(plans.filter(p => p.id !== id))
    await api.delete(`/plans/${id}`)
    toast.success('Plano excluído com sucesso')
  }

  return (
    <Container>
      <TopBar>
        <h1>Gerenciando planos</h1>
        <div id="actions">
          <button type="button" onClick={() => history.push('/plans/register')}>
            <GoPlus />
            CADASTRAR
          </button>
        </div>
      </TopBar>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th align="left">TÍTULO</th>
              <th align="center">DURAÇÃO</th>
              <th align="center">VALOR MENSAL</th>
              <th align="center">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td align="center">{`${plan.duration} ${
                  plan.duration > 1 ? 'meses' : 'mês'
                  // eslint-disable-next-line
                  }`}</td>
                <td align="center">{plan.priceFormatted}</td>
                <td align="right">
                  <Link
                    to={{
                      pathname: '/plans/update',
                      state: { plan }
                    }}>
                    editar
                  </Link>
                  <button type="button" onClick={() => handleDelete(plan.id)}>
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
