import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../../ThemeContext";
import Loader from "../Loader";

const StyledForm = styled.form`
  padding: 2rem;
  margin: 3rem;

  label {
    font-size: 18px;

    .required {
      color: red;
    }
  }

  .error {
    color: red;
    font-size: 18px;
  }

  div > *,
  input[type="submit"] {
    display: block;
    width: 30%;
    margin: 2rem auto;
  }

  input[type="text"],
  textarea {
    font-size: 2rem;
    padding: 5px 10px;
    font-weight: 500;
    resize: none;
  }

  input[type="submit"] {
    width: max-content;
    padding: 10px 20px;
    border: none;
    font-weight: 600;
    font-size: 2rem;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;

    &:hover {
      padding: 10px 30px;
      cursor: pointer;
    }
  }

  &.light {
    label {
      color: #2d2d2d;
    }
  }

  &.dark {
    label {
      color: #e3e3e3;
    }
  }
`;

const RuleForm = ({ rules, setRules }) => {
  const { id } = useParams();
  const [ruleDatas, setRuleDatas] = useState({ title: "", description: "" });
  const [titleErrors, setTitleErrors] = useState([]);
  const [descriptionErrors, setDescriptionErrors] = useState([]);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (id) {
      if (rules.length !== 0) {
        const currentRule = rules.filter(rule => rule['_id'] === id)[0];

        setRuleDatas({
          title: currentRule.title,
          description: currentRule.description || "",
        });
      }
    }

    return () => {
      setRuleDatas({ title: "", description: "" });
    };
  }, [id, rules]);

  const validateTitle = (title) => {
    let errors = [];
    if (title.length > 0) {
      if (title.length <= 200) {
        errors = [];
        return true;
      } else {
        errors.push("50 Characters maximum");
      }
    } else {
      errors.push("Required");
    }

    return errors;
  };

  const validateDescription = (desc) => {
    let errors = [];

    if (desc === "") {
      errors = [];
      return true;
    } else if (desc.length >= 5 && desc.length <= 500) {
      errors = [];
      return true;
    } else {
      errors.push("5 Characters minimum - 100 Caracters maximum");
    }

    return errors;
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setRuleDatas((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const titleValidation = validateTitle(ruleDatas.title);
    const descriptionValidation = validateDescription(ruleDatas.description);

    if (titleValidation !== true) {
      setTitleErrors([...titleValidation]);
    } else {
      setTitleErrors([]);
    }

    if (descriptionValidation !== true) {
      setDescriptionErrors([...descriptionValidation]);
    } else {
      setDescriptionErrors([]);
    }

    if (titleValidation === true && descriptionValidation === true) {
      if (id) {
        if (window.confirm(`You will Update the Rule : ${ruleDatas.title}`)) {
          const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: ruleDatas.title,
              description: ruleDatas.description,
            }),
          };
          fetch(
            `/api/rules/${id}`,
            requestOptions
          )
            .then((resp) => resp.json())
            .then((res) => {
              const updatedRuleId = rules.findIndex((rule) => rule['_id'] === res['_id'])
              const updatedRules = [...rules]
              updatedRules[updatedRuleId] = res
              setRules({loaded: true, data: updatedRules})
            })
            .then(() => navigate(`/`));
        }
      } else {
        if (window.confirm(`You will create a new Rule : ${ruleDatas.title}`)) {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: ruleDatas.title,
              description: ruleDatas.description,
            }),
          };
          fetch(
            "/api/rules/new-rule",
            requestOptions
          )
            .then((resp) => resp.json())
            .then((res) => setRules({loaded: true, data: [...rules, res]}))
            .then(() => navigate(`/`));
        }
      }
    }
  };

  return (
    <StyledForm
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className={theme}
    >
      <div>
        <label htmlFor="title">
          Title<span className="required">*</span> :
        </label>
        {titleErrors &&
          titleErrors.map((error, index) => {
            return (
              <p key={index} className="error">
                /!\ {error}
              </p>
            );
          })}
        <input
          type="text"
          name="title"
          placeholder="Type the title here..."
          value={ruleDatas.title}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </div>

      <div>
        <label htmlFor="description">Description :</label>
        {descriptionErrors &&
          descriptionErrors.map((error, index) => {
            return (
              <p key={index} className="error">
                /!\ {error}
              </p>
            );
          })}
        <textarea
          cols="30"
          rows="10"
          placeholder="Description"
          name="description"
          value={ruleDatas.description}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </div>
      <input type="submit" />
    </StyledForm>
  );
};

export default RuleForm;
