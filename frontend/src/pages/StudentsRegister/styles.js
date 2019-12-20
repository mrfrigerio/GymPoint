import { darken } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  width: 90%;
  max-width: 900px;
  display: flex;
  flex-direction: column;

  form {
  }
`

export const InputsContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: stretch;
  background: #fff;
  padding: 30px;
  border-radius: 4px;

  input {
    height: 44px;
    color: #666;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 15px;
    font-size: 16px;
    margin: 10px 0 20px;
  }

  span {
    position: absolute;
    margin: 0;
    font-size: 12px;
    /* top: calc(100% - 15px); */
    top: 15px;
    align-self: flex-end;
    color: #ee4d64;
  }

  label {
    font-weight: bold;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  div {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
    input {
      margin: 10px 0 0;
    }
  }
`

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f2f2f2;

  h1 {
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    padding: 25px 0;
  }

  #actions {
    display: flex;
    align-items: stretch;
  }

  button {
    display: flex;
    margin-right: 16px;
    padding: 10px 15px;
    align-items: center;
    color: #fff;
    background: #ccc;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    svg {
      margin-right: 6px;
    }

    &:hover,
    &:focus {
      background: ${darken(0.05, '#ccc')};
    }
  }

  button + button {
    background: #ee4d64;
    &:hover,
    &:focus {
      background: ${darken(0.05, '#ee4d64')};
    }
  }
`
