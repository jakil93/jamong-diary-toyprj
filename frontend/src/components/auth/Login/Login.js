import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withRouter } from "react-router-dom";
import Copyright from "components/common/Copyright/Copyright";
import { useState } from "react";
import { request } from "graphql-request";
import { inject } from "mobx-react";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login = ({ history, baseStore }) => {
  const classes = useStyles();

  const goRegister = () => {
    history.push("/auth/register");
  };

  const [form, setValues] = useState({ username: "", password: "" });
  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          그대의 이야기도 함께하기.
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={form.username}
            onChange={updateField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            label="별명"
            type="text"
            id="username"
          />
          <TextField
            value={form.password}
            onChange={updateField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            className={classes.submit}
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              const endpoint = "/graphql";
              const { username, password } = form;
              const query = `{
                login(username : "${username}", password : "${password}"){
                    username
                }
              }`;

              request(endpoint, query).then(data => {
                if (data.login) {
                  const { username } = data.login;
                  alert(`${username}님 오늘도 자몽 다이어리와 함께해요.`);
                  baseStore.setLogged(true);
                  history.push("/");
                } else {
                  alert("별명 또는 비밀번호가 틀렸습니다.");
                }
              });
            }}
          >
            로그인
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link onClick={goRegister} variant="body2">
                {"계정이 없다면 만들어보세요."}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default inject("baseStore")(withRouter(Login));
