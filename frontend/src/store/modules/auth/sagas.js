import { all, call, put, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import history from '~/services/history'
import { signInSuccess } from './actions'
import api from '~/services/api'

export function* signIn({ payload }) {
  try {
    const { email, password } = payload
    const response = yield call(api.post, '/sessions', { email, password })
    const { user, token } = response.data

    api.defaults.headers.Authorization = `Bearer ${token}`

    yield put(signInSuccess(user, token))

    history.push('/students/list')
  } catch (err) {
    toast.error('Erro na autenticação, verifique seus dados!')
  }
}

export function setToken({ payload }) {
  if (!payload) return

  const { token } = payload.auth
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`
  }
}

export function logOut() {
  history.push('/')
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', logOut),
  takeLatest('persist/REHYDRATE', setToken)
])
