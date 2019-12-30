import { darken } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;

  form {
    display: flex;
    position: absolute;
    z-index: 2;
    flex-direction: column;
    width: 450px;
    padding: 30px;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.8);
    border-radius: 4px;
    background: #f2f2f2;

    label {
      color: #444;
      font-size: 14px;
      line-height: 16px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    textarea {
      color: #666;
      font-size: 16px;
      line-height: 26px;
      margin-bottom: 10px;
      resize: none;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    textarea[disabled] {
      border: none;
      background: none;
    }

    button {
      padding: 10px 15px;
      color: #fff;
      background: #ee4d64;
      border: none;
      border-radius: 4px;
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      text-align: center;

      &:hover,
      &:focus {
        background: ${darken(0.05, '#ee4d64')};
      }
    }
  }
`
