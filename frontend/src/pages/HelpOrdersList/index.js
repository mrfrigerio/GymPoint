import React, { useEffect, useState } from 'react'
import api from '~/services/api'
import { Container, TableContainer, TopBar } from './styles'
import HelpOrdersAnswer from '~/pages/HelpOrdersList/components/HelpOrdersAnswer'

export default function HelpOrdersList() {
  const [helpOrders, setHelpOrders] = useState([])
  const [answering, setAnswering] = useState(false)
  const [helpOrder, setHelpOrder] = useState(null)

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get('/help-orders')
      if (response.data) {
        setHelpOrders(response.data)
      }
    }
    loadHelpOrders()
  }, [])

  function handleAnswer(help_order) {
    setAnswering(true)
    setHelpOrder(help_order)
  }

  function handleDismiss(id) {
    setAnswering(false)
    setHelpOrder(null)
    if (id) {
      setHelpOrders(helpOrders.filter(ho => ho.id !== id))
    }
  }

  return (
    <Container id="container">
      <TopBar>
        <h1>Pedidos de auxílio</h1>
      </TopBar>

      <TableContainer>
        <table id="table">
          <thead>
            <tr>
              <th align="left">ALUNO</th>
              <th align="center">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {helpOrders.map(ho => (
              <tr key={ho.id}>
                <td>{ho.student.name}</td>
                <td align="right">
                  <button type="button" onClick={() => handleAnswer(ho)}>
                    responder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
      {answering ? (
        <HelpOrdersAnswer help_order={helpOrder} dismiss={handleDismiss} />
      ) : null}
    </Container>
  )
}
