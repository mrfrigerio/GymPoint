import { createGlobalStyle } from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'
import '@trendmicro/react-datepicker/dist/react-datepicker.css'

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: none;
    font-family: Roboto, Arial, Helvetica, sans-serif;

    &:focus {
      outline: none;
    }
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  html, body, #root {
  height: 100vh;
}

`
