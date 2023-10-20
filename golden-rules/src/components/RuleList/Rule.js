import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import BtnLike from "../Buttons/BtnLike";
import BtnDelete from "../Buttons/BtnDelete";
import { useNavigate } from "react-router-dom";
import BtnEdit from "../Buttons/BtnEdit";

const RuleTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const FlexInline = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  justify-content: space-between;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
`;

const RuleDescription = styled.p`
  font-size: 1.5rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Rule = ({ id, title, description, deleteRuleFunc }) => {
  const [folded, setFolded] = useState(false);
  const navigate = useNavigate();

  const handleClickFold = () => {
    folded ? setFolded(false) : setFolded(true);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <FlexInline
        onClick={() => {
          handleClickFold();
        }}
      >
        <RuleTitle>{title}</RuleTitle>
        <ArrowButton>
          {!folded && <FontAwesomeIcon icon={faCaretRight} />}
          {folded && <FontAwesomeIcon icon={faCaretDown} />}
        </ArrowButton>
      </FlexInline>
      {folded && (
        <div>
          {description && <RuleDescription>{description}</RuleDescription>}
          <ButtonsContainer>
            <BtnLike title="+1" iconName="like" />
            <BtnLike title="-1" iconName="disLike" />
            <BtnEdit editFunc={handleEdit} id={id} />
            <BtnDelete deleteRuleFunc={deleteRuleFunc} id={id} />
          </ButtonsContainer>
        </div>
      )}
    </>
  );
};

Rule.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  deleteRuleFunc: PropTypes.func,
};

export default Rule;
