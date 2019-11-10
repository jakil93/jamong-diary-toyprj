import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
      fontFamily: "Nanum MyeongJo"
    }
  },

  container: {
    padding: theme.spacing(2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  title: {
    fontSize: "1.7rem",
    lineHeight: "1.7rem",
    marginBottom: theme.spacing(1)
  },
  button: {
    fontFamily: "Nanum MyeongJo",
    margin: theme.spacing(1),
    minWidth: 120
  }
}));
