import { darken } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  width: 90%;
  max-width: calc(1400px * 0.9);
  display: flex;
  flex-direction: column;
`
export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

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
    background: #ee4d64;
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
      background: ${darken(0.05, '#ee4d64')};
    }
  }
`

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  input#search {
    padding-left: 45px !important;
    padding-right: 35px !important;
    position: relative;
    font-size: 14px;
    height: 100%;
    width: 237px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }

  svg.icon {
    color: #666;
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
  }

  svg.close {
  }

  input.fill ~ button.clean-button {
    display: block;
  }
`

export const TableContainer = styled.div`
  width: 100%;
  padding: 25px;
  background: #fff;
  border-radius: 4px;

  table {
    border-collapse: collapse;
    width: 100%;
    text-align: ${props => props.align};

    tr + tr {
      border-top: 1px solid #eee;
    }

    th {
      padding: 0 0 15px;
    }

    td {
      padding: 15px 0px;
      font-size: 16px;
      line-height: 20px;
      font-weight: normal;
      color: #666;
    }

    button {
      font-size: 15px;
      font-weight: normal;
      background: none;
      border: none;
      color: #4d85ee;
    }

    button + button {
      margin-left: 23px;
      color: #de3b3b;
    }
  }
`
