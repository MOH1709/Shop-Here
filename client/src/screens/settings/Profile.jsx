import { makeStyles } from "@material-ui/core";

export default function Profile() {
  const styles = useStyles();

  return <div className={styles.container}>Profile</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
