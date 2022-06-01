import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    outline: none;
  }

  body{
    font-size: 16px;
  }

  .ant-tooltip-inner a {
    color: white;
  }

  @keyframes drop {
    from {
      transform: translateY(-100vw);
    }

    to {
      transform: translateY(0px);
    }
  }
`;
