import styled from 'styled-components'

export const Container = styled.div`
  width: 70%;
  max-width: calc(1400px * 0.7);
  display: flex;
  flex-direction: column;
`
export const TopBar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  h1 {
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    padding: 25px 0;
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
      margin-left: 23px;
      color: #4d85ee;
    }
  }
`
