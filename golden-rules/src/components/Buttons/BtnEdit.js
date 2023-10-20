import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  margin: 0.5rem;
`;

const BtnEdit = ({ editFunc, id }) => {
  return (
    <StyledButton type="button" title="del" onClick={() => editFunc(id)}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </StyledButton>
  );
};

BtnEdit.propTypes = {
  id: PropTypes.number,
  editFunc: PropTypes.func,
};

export default BtnEdit;
