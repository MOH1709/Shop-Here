import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core";

import { Cart } from "./screens/primary";
import { SecondaryHeader } from "./components";
import { Context } from "./contexts/WidthProvider";

export default function CC() {
  const styles = useStyles();
  const { width } = useContext(Context);

  return (
    <>
      <div
        className={styles.primaryScreen}
        style={{ display: width < 600 ? "none" : "block" }}
      ></div>
      <div
        className={styles.secondaryScreen}
        // style={{ display: width < 600 ? "none" : "block" }}
      >
        <SecondaryHeader />
        <Cart />
      </div>
    </>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  primaryScreen: {
    flex: 1,
    minWidth: 280,

    borderRight: "2px solid black",
  },
  secondaryScreen: {
    flex: 3,
    minWidth: 280,
  },
});
