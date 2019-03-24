import { createGlobalStyle } from 'styled-components'

import 'react-circular-progressbar/dist/styles.css'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    background: linear-gradient(90deg, rgba(0,255,171,1) 0%, rgba(91,233,90,0.8379726890756303) 51%, rgba(0,212,255,1) 100%);
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  html, body, #root {
    height: 100%;
  }

`