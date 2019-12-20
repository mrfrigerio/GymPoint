import { produce } from 'immer'

const INITIAL_STATE = {
  signed: false,
  token: null
}

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS': {
      return produce(state, draft => {
        draft.signed = true
        draft.token = action.payload.token
      })
    }
    case '@auth/SIGN_OUT':
      return INITIAL_STATE

    default:
      return state
  }
}
