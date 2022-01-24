import { makeStyles } from "@material-ui/core";

export default function SignIn() {
  const styles = useStyles();

  return <div className={styles.container}>SigIn</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
