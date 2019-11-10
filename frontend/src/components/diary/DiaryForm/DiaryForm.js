import React from "react";
import Container from "@material-ui/core/Container";
import { Divider, TextField, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { useStyles } from "./Style";

const DiaryForm = ({ history, onClickSend, onClickDelete }) => {
  const classes = useStyles();

  const query = queryString.parse(history.location.search);
  const { mode } = query;
  const validModeList = ["write", "update"];
  if (!validModeList.includes(mode)) {
    return <div>잘못된 요청입니다.</div>;
  }

  return (
    <Container className={classes.container} component="main" maxWidth="sm">
      <div className={classes.title}>
        {mode === "write"
          ? "새로운 당신의 이야기를 써 내려가 볼까요?"
          : "당신의 이야기를 다듬어 봅니다."}
      </div>

      <Divider />
      <form noValidate autoComplete="off">
        <div>
          <TextField
            fullWidth
            className={classes.textField}
            label="Title"
            margin="normal"
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Content"
            multiline
            rows="4"
            defaultValue="안녕?"
            className={classes.textField}
            margin="normal"
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={onClickSend}
          >
            {mode === "write" ? "쓰기" : "고쳐 쓰기"}
          </Button>
          {mode === "update" && (
            <Button
              variant="outlined"
              className={classes.button}
              onClick={onClickDelete}
            >
              지우기
            </Button>
          )}
        </div>
      </form>
    </Container>
  );
};

export default withRouter(DiaryForm);
