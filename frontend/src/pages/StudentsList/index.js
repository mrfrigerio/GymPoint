import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GoPlus } from 'react-icons/go'
import { MdSearch } from 'react-icons/md'
import { IoMdCloseCircle } from 'react-icons/io'
import api from '~/services/api'
import history from '~/services/history'
import { Container, TableContainer, TopBar, SearchBar } from './styles'

export default function StudentsList() {
  const [students, setStudents] = useState([])
  const [filter, setFilter] = useState([])

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get(`/students?name=${filter}`)
      if (response.data) {
        setStudents(response.data)
      }
    }
    loadStudents()
  }, [filter])

  function handleChange(e) {
    if (e.target.value) {
      e.target.classList.add('fill')
    } else {
      e.target.classList.remove('fill')
    }

    setFilter(e.target.value)
  }

  function handleClean(element) {
    const input = document.getElementById(element)
    input.value = ''
    setFilter(input.value)
    input.classList.remove('fill')
    input.focus()
  }

  async function handleDelete(id) {
    const student = students.find(s => s.id === id)

    if (!student) {
      toast.error('Aluno não encontrado')
      return
    }
    setStudents(students.filter(s => s.id !== id))
    await api.delete(`/students/${id}`)
    toast.success('Aluno excluído com sucesso')
  }

  return (
    <Container>
      <TopBar>
        <h1>Gerenciando alunos</h1>
        <div id="actions">
          <button
            type="button"
            onClick={() => history.push('/students/register')}>
            <GoPlus />
            CADASTRAR
          </button>
          <SearchBar>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Buscar aluno"
              value={filter}
              onChange={handleChange}
            />
            <MdSearch className="icon" size={16} />
            <button
              className="clean-button"
              type="button"
              onClick={() => handleClean('search')}>
              <IoMdCloseCircle size={12} />
            </button>
          </SearchBar>
        </div>
      </TopBar>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th align="left">NOME</th>
              <th align="left">EMAIL</th>
              <th align="center">IDADE</th>
              <th align="center">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td align="center">{student.age}</td>
                <td align="right">
                  <Link
                    to={{
                      pathname: '/students/update',
                      state: { student }
                    }}>
                    editar
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(student.id)}>
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
