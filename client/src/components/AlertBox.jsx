import { makeStyles } from "@material-ui/core";

//-----------------------------------------------> custom components
import { FLEX_CENTER } from "../constants";

export default function AlertBox({ box, Style }) {
  const styles = useStyles();

  return (
    <div className={styles.container} style={Style}>
      {box}
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    ...FLEX_CENTER,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
