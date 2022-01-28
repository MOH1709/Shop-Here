import { makeStyles } from "@material-ui/core";

//-----------------------------------------------> custom components
import { COLOR } from "../../constants";

export default function SecondaryHeader({ shops }) {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <p className={styles.title}>Cart</p>
      <p className={styles.shops}>
        {shops ? shops.join(", ") : "Cart is Empty !!"}
      </p>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
    width: "100%",
    height: 100,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    paddingLeft: 30,
    zIndex: 10,
    color: "white",
    backgroundColor: COLOR.PRIMARY,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    letterSpacing: 1,
  },
  shops: {
    opacity: 0.5,
    width: "50%",
    height: "1.5em",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});
