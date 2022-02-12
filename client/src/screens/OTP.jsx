import { makeStyles } from "@material-ui/core";

export default function OTP() {
  const styles = useStyles();

  return <div className={styles.container}>OTP</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
