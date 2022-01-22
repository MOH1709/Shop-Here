import React from "react";
import { makeStyles } from "@material-ui/core";
import { COLOR } from "../constants";

export default function SecondaryHeader() {
  const styles = useStyles();

  return <div className={styles.container}></div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "fixed",
    backgroundColor: COLOR.PRIMARY,
    width: 1338,
    height: 100,
    top: 0,
    left: "auto",
    zIndex: 999,
  },
});
