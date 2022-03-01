import { makeStyles } from "@material-ui/core";
import { FLEX_CENTER } from "../constants";

export default function LoadingDisplay({ isLoading }) {
  const styles = useStyles();

  return (
    <div
      style={{ display: isLoading ? "flex" : "none" }}
      className={styles.container}
    >
      <h2>Loading...</h2>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    ...FLEX_CENTER,
    position: "fixed",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
    zIndex: 99,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
});
