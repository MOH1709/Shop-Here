import { makeStyles } from "@material-ui/core";

export default function Home() {
  const styles = useStyles();

  return <div className={styles.container}>Home</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    flex: 1,
  },
});
