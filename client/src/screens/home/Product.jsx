import { makeStyles } from "@material-ui/core";

export default function Product() {
  const styles = useStyles();

  return <div className={styles.container}>Product</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
