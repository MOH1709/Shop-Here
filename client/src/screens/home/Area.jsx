import { makeStyles } from "@material-ui/core";

export default function Area() {
  const styles = useStyles();

  return <div className={styles.container}>Area</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
