import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
      fontFamily: "Nanum MyeongJo"
    }
  },
  container: {
    padding: theme.spacing(2)
  },
  title: {
    fontSize: "1.7rem",
    lineHeight: "1.7rem",
    marginBottom: theme.spacing(1)
  },
  content: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  info: {
    textAlign: "right",
    marginBottom: theme.spacing(1)
  }
}));

const DairyDetail = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container} component="main" maxWidth="sm">
      <div className={classes.title}>따뜻한 하늘에 기대어 쉬는 오늘</div>
      <Divider />
      <div className={classes.content}>
        <div className={classes.info}>
          <div>2019년 11월 10일 일요일 오후 12시 1분</div>
          <div>i_love_jamong</div>
        </div>
        하늘이 맑다.
        <br />
        아니, 푸르다.
        <br />
        안개 낀 것 같은 나의 마음에 한줄기의 따스한 빛을 내려준 하늘이 푸른 오늘
        나는 지금 작은 나무에 기대어 부는 바람에 모든 신경을 곤두세우고 있다.
        <br />
        간만에 자유다.
      </div>
    </Container>
  );
};

export default DairyDetail;
