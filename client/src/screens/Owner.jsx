import { makeStyles } from "@material-ui/core";

export default function Owner() {
  const styles = useStyles();

  return <div className={styles.container}>Owner</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
