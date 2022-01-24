import { makeStyles } from "@material-ui/core";

export default function Messages() {
  const styles = useStyles();

  return <div className={styles.container}>Message</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    flex: 1,
    position: "relative",
  },
});
