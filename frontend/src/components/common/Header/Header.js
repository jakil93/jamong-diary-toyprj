import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

const Header = ({ history, baseStore }) => {
  const classes = useStyles();

  const goLogin = () => {
    history.push("/auth/log-in");
  };

  const goHome = () => {
    history.push("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography onClick={goHome} variant="h6" className={classes.title}>
          Jamong Diary
        </Typography>
        {baseStore.logged ? (
          <Button color="inherit" onClick={goLogin}>
            logout
          </Button>
        ) : (
          <Button color="inherit" onClick={goLogin}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default inject("baseStore")(observer(withRouter(Header)));
