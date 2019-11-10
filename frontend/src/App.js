import React from "react";
import Container from "@material-ui/core/Container";
import Header from "./components/common/Header";
import { Switch, Route } from "react-router-dom";
import Main from "components/main/Main/Main";
import Login from "components/auth/Login";
import Register from "components/auth/Register";
import DairyDetail from "components/diary/DiaryDetail";
import DiaryForm from "components/diary/DiaryForm";

const App = () => {
  return (
    <Container maxWidth="xl">
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/auth/log-in">
          <Login />
        </Route>
        <Route path="/auth/register">
          <Register />
        </Route>
        <Route exact path="/diary/form">
          <DiaryForm />
        </Route>
        <Route path="/diary/:id">
          <DairyDetail />
        </Route>

        <div>존재하지 않는 페이지입니다.</div>
      </Switch>
    </Container>
  );
};

export default App;
