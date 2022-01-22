import { useContext } from "react";
import { makeStyles } from "@material-ui/core";

import Router from "./Router";
import { Shop } from "./screens";
import { Context } from "./contexts/WidthProvider";

export default function App() {
  const styles = useStyles();
  const { width } = useContext(Context);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Shop />
      </div>
      <div
        className={styles.right}
        style={{ display: width > 600 ? "block" : "none" }}
      >
        <Router />
      </div>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
    display: "flex",
    width: "100%",
    maxWidth: 1300,
    height: "100vh",
    marginInline: "auto",
    backgroundColor: "white",
    boxShadow: "0px 0px 20px rgba(0,0,0,0.6)",
    overflow: "hidden",
  },
  left: {
    flex: 1,
    minWidth: 280,
    overflowY: "auto",
  },
  right: {
    flex: 2,
    overflowY: "auto",
  },
});
