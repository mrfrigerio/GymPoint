import styled from 'styled-components'

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;

  input {
    padding-left: 45px !important;
    padding-right: 35px !important;
  }

  span {
    display: block;
    position: absolute;
    font-size: 10px;
    bottom: -5px;
    align-self: center;
    color: #ee4d64;
  }

  svg.icon {
    position: absolute;
    left: 15px;
  }

  button.clean-button {
    display: none;
    position: absolute;
    padding: 5px;
    margin: 0;
    right: 10px;
    background: none;
    color: #999;
    opacity: 0.5;
    &:hover,
    &:focus {
      background: none;
      color: #999;
    }
    svg.close {
    }
  }

  input:focus {
    border: 1px solid #ee4d64;
  }

  input:focus + svg.icon {
    color: #ee4d64;
  }

  input.fill ~ button.clean-button {
    display: block;
  }
`
