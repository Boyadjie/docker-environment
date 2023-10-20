import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNav = styled.nav`
  padding: 5rem;

  ul {
    display: flex;
    gap: 5rem;
    align-items: center;
    justify-content: flex-end;

    li {
      list-style: none;
      position: relative;

      a {
        text-decoration: none;
        font-size: 2.5rem;

        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 3px;
          bottom: -0.5rem;
          left: 0;
          border-radius: 5px;
          transform-origin: center;
          transform: scaleX(0);
          transition: all 0.3s ease-in-out;
        }
      }

      &:hover {
        a {
          &::after {
            transform: scaleX(1);
          }
        }
      }
    }
  }

  &.light {
    ul {
      li {
        a {
          color: #2d2d2d;

          &::after {
            background-color: #2d2d2d;
          }
        }
      }
    }
  }

  &.dark {
    ul {
      li {
        a {
          color: #e3e3e3;

          &::after {
            background-color: #e3e3e3;
          }
        }
      }
    }
  }
`;

const Menu = ({ theme }) => {
  return (
    <StyledNav className={theme}>
      <ul>
        <li>
          <NavLink exact="true" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact="true" to="/new">
            New
          </NavLink>
        </li>
      </ul>
    </StyledNav>
  );
};

export default Menu;
