import { darken } from 'polished'
import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 360px;
  min-width: 237px;
  height: 100%;
  max-height: 448px;
  background: #fff;
  border-radius: 4px;
  padding: 30px;
  margin: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  form {
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;

    label {
      display: block;
      font-weight: bold;
      line-height: 16px;
      padding-top: 10px;
    }

    input {
      height: 44px;
      font-size: 14px;
      border: 1px solid #ddd;
      width: 100%;
      display: block;
      padding: 0 15px;
      border-radius: 4px;
      margin: 10px 0;
    }

    button {
      height: 45px;
      background: #ee4d64;
      font-size: 16px;
      line-height: 19px;
      font-weight: bold;
      margin-top: 10px;
      color: #fff;
      border: none;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover,
      &:focus {
        background: ${darken(0.05, '#ee4d64')};
      }
    }
  }
`
