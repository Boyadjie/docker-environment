import { useContext } from "react";
import styled from "styled-components";

import Rule from "./Rule";
import Loader from "../Loader";
import { ThemeContext } from "../../ThemeContext";

const StyledRuleList = styled.div`
  &.light {
    > p {
      color: #2d2d2d;
      text-align: center;
      margin-top: 10rem;
      font-size: 2rem;
      
      a {
        color: #2d2d2d;
      }
    }
    
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
    > p {
      color: white;
      text-align: center;
      margin-top: 10rem;
      font-size: 2rem;

      a {
        color: white;
      }
    }
    
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

  if(rules.length === 0) {
    return (
        <StyledRuleList className={theme}>
          <p>No rules found... <a href="/new">Create a new rule</a></p>
        </StyledRuleList>
    )
  }

  return rules.length > 0 ? (
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
