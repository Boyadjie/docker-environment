import { useContext } from "react";
import styled from "styled-components";

import Rule from "./Rule";
import Loader from "../Loader";
import { ThemeContext } from "../../ThemeContext";

const StyledRuleList = styled.div`
  &.light {
    > div {
      margin: 0 auto;

      section {
        background-color: #e3e3e3;
        border-radius: 5px;
        padding: 1rem 2rem;
        margin: 3rem;
      }
    }
  }

  &.dark {
    > div {
      margin: 0 auto;

      section {
        background-color: #cdcdcd;
        border-radius: 5px;
        padding: 1rem 2rem;
        margin: 3rem;
      }
    }
  }
`;

const RuleList = ({ rules, setRules }) => {
  const { theme } = useContext(ThemeContext);

  const deleteRule = (ruleId) => {
    const currentRule = rules.filter(rule => rule['_id'] === ruleId)[0];

    if (
      window.confirm(
        `The Rule Nº${ruleId}: "${currentRule.title}" will be delete!`
      )
    ) {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };

      fetch(
        `/api/rules/${ruleId}`,
        requestOptions
      )
        .then((resp) => resp.json())
        .then((res) => setRules({ loaded: true, data: res }));
    }
  };

  return rules.length !== 0 ? (
    <StyledRuleList className={theme}>
      <div>
        {rules.map((rule, id) => (
          <section key={id}>
            <Rule id={rule['_id']} deleteRuleFunc={deleteRule} {...rule} />
          </section>
        ))}
      </div>
    </StyledRuleList>
  ) : (
      <>
        <Loader />
      </>
  );
};

export default RuleList;
