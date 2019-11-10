import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DiaryCard from "components/common/DiaryCard/DiaryCard";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: "10px"
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const Main = () => {
  const classes = useStyles();

  const renderDiaryCards = () => {
    const result = [];
    for (let i = 1; i < 5; i++) {
      result.push(<DiaryCard key={i} image={i} />);
    }

    return result;
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        {renderDiaryCards()}
      </Grid>
    </div>
  );
};

export default Main;
