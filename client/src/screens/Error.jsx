import { makeStyles } from "@material-ui/core";

export default function Error() {
  const styles = useStyles();

  return <div className={styles.container}>Error</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
