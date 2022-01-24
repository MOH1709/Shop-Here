import { makeStyles } from "@material-ui/core";

export default function LogIn() {
  const styles = useStyles();

  return <div className={styles.container}>LogIn</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
