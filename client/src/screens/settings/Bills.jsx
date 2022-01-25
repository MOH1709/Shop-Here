import { makeStyles } from "@material-ui/core";

export default function Bills() {
  const styles = useStyles();

  return <div className={styles.container}>Bills</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
