import { useContext } from "react";
import styled from "styled-components";

import Menu from "./Menu";
import { ThemeContext } from "../../ThemeContext";

const StyledHeader = styled.header`
  h1 {
    font-size: 4rem;
    text-align: center;
  }

  .themeSwitch {
    padding: 5px 10px;
    border: none;
    font-weight: 600;
    font-size: 15px;
    display: block;
    margin: 10px auto;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;

    &:hover {
      padding: 5px 20px;
      cursor: pointer;
    }
  }

  &.light {
    h1 {
      color: #2d2d2d;
    }

    .themeSwitch {
      background: #2d2d2d;
      color: #e3e3e3;
    }
  }

  &.dark {
    h1 {
      color: white;
    }

    .themeSwitch {
      background: #e3e3e3;
      color: #2d2d2d;
    }
  }
`;

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const changeTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <StyledHeader className={theme}>
      <Menu theme={theme} />
      <h1>Leave the code cleaner than you found it.</h1>
      <button
        className="themeSwitch"
        onClick={() => {
          changeTheme();
        }}
      >
        Switch Theme
      </button>
    </StyledHeader>
  );
};

export default Header;
