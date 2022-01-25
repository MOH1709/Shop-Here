import { makeStyles } from "@material-ui/core";

export default function Updates() {
  const styles = useStyles();

  return <div className={styles.container}>Updates</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
