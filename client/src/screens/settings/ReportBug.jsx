import { makeStyles } from "@material-ui/core";

export default function ReportBug() {
  const styles = useStyles();

  return <div className={styles.container}>ReportBug</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    minHeight: 400,
    padding: 15,
    backgroundColor: "white",
  },
});
