import { makeStyles } from "@material-ui/core";

export default function Business() {
  const styles = useStyles();

  return <div className={styles.container}>Facility</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
