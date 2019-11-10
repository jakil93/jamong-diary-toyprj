import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DiaryCard from "components/common/DiaryCard/DiaryCard";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

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

const GET_GADGETS = gql`
  query {
    queryAllDiaries {
      title
      content
    }
  }
`;

const Main = () => {
  const classes = useStyles();

  const { loading, error, data, refetch } = useQuery(GET_GADGETS, {
    pollInterval: 10000
  });
  if (loading) return <div>불러오는 중..</div>;
  if (error) return <div onClick={() => refetch()}>에러가 발생했어요.</div>;

  const renderDiaryCards = queryAllDiaries => {
    const result = [];
    for (let i = 1; i < 5; i++) {
      result.push(
        <DiaryCard title={`${queryAllDiaries[i].title}`} key={i} image={i} />
      );
    }

    return result;
  };

  const { queryAllDiaries } = data;

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        {renderDiaryCards(queryAllDiaries)}
      </Grid>
    </div>
  );
};

export default Main;
