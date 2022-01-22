import { makeStyles } from "@material-ui/core";

export default function AlertBox({ children }) {
  const styles = useStyles();
  console.log(children);

  return <div className={styles.container}>{children}</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
