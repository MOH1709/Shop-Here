import { makeStyles } from "@material-ui/core";

export default function OwnerSignIn() {
  const styles = useStyles();

  return <div className={styles.container}>OwnerSignIn</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
