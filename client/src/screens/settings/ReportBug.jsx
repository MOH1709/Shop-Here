import { makeStyles } from "@material-ui/core";

export default function ReportBug() {
  const styles = useStyles();

  return <div className={styles.container}>ReportBug</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
