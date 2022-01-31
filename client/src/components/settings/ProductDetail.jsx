import { makeStyles } from "@material-ui/core";

export default function ProductDetail() {
  const styles = useStyles();

  return <div className={styles.container}>ProductDetail</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
