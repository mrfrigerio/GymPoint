import { Link } from 'react-router-dom'

import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #ddd;
  width: 100%;
  max-width: 1400px;
  height: 64px;
  padding: 15px 30px;
`
export const Logo = styled.div`
  box-sizing: content-box;
  display: flex;
  min-width: 135px;
  justify-content: space-between;
  align-items: center;
  border-right: 1px solid #ddd;
  padding-right: 30px;
  margin-right: 20px;

  img {
    width: 45px;
  }

  h1 {
    font-size: 15px;
    font-weight: bold;
    line-height: 18px;
    color: #ee4d64;
  }
`
export const Nav = styled.nav`
  flex: 1;
  min-width: 482px;
  ul {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: flex-start;

    li {
      margin: 0 10px;
    }
  }
`
export const CustomLink = styled(Link)`
  color: ${props => (props.selected ? '#444' : '#999')};
  font-weight: bold;
`

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 120px;

  strong {
    font-size: 14px;
    line-height: 16px;
    color: #666;
  }
`
export const LogOut = styled.button`
  background: none;
  border: none;
  text-align: right;
  color: #de3b3b;
  padding-top: 3px;

  &:hover {
    color: red;
  }
`
