import { makeStyles } from "@material-ui/core";

export default function AreaSelection() {
  const styles = useStyles();

  return <div className={styles.container}>AreaSelection</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
