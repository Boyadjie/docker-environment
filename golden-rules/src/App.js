import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RuleList from "./components/RuleList/RuleList";
import { ThemeContext } from "./ThemeContext";
import GlobalStyle from "./GlobalStyle";
import Layout from "./components/Layout";
import RuleForm from "./components/RuleList/RuleForm";

const App = () => {
  const [rulesData, setRulesData] = useState({ loaded: false, data: [] });
  const [theme, setTheme] = useState("light");
  // Create a memoized value for context, keeping reference across renders
  const themeContextValue = useMemo(
    () => ({ theme, setTheme }),
    [theme, setTheme]
  );

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`/api/rules/`, requestOptions)
      .then((resp) => resp.json())
      .then((res) => setRulesData({ loaded: true, data: res }));
  }, []);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <GlobalStyle theme={theme}></GlobalStyle>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route
              exact
              path="/"
              element={
                <RuleList rules={rulesData.data} setRules={setRulesData} />
              }
            />
            <Route
              exact
              path="/new"
              element={
                <RuleForm rules={rulesData.data} setRules={setRulesData} />
              }
            />
            <Route
              exact
              path="/edit/:id"
              element={
                <RuleForm rules={rulesData.data} setRules={setRulesData} />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
};

export default App;
