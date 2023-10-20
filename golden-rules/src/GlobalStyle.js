import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

  html, body {
    background-color: ${(props) => {
      return props.theme === "light" ? "white" : "#2d2d2d";
    }};
  }
`;
